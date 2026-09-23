import React, { useState, useRef } from 'react';
import { X, UploadCloud, FileSpreadsheet, CheckCircle2, AlertCircle, RefreshCw, Download } from 'lucide-react';
import { Button } from '../common/Button';
import { customerService } from '../../services/customerService';
import type { CustomerFormData } from '../../types/crm';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: () => void;
}

interface ImportSummary {
  imported: number;
  duplicates: number;
  invalid: number;
  totalParsed: number;
}

export const CsvImportModal: React.FC<CsvImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleReset = () => {
    setFile(null);
    setSummary(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const parseCsvLine = (text: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        if (inQuotes && text[i + 1] === '"') {
          current += '"';
          i++; // Skip escaped quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSummary(null);
    const selected = e.target.files?.[0];
    if (selected) {
      if (!selected.name.toLowerCase().endsWith('.csv')) {
        setError('Please select a valid .csv spreadsheet file.');
        return;
      }
      setFile(selected);
    }
  };

  const handleProcessImport = async () => {
    if (!file) {
      setError('Please select a CSV file to import.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const content = await file.text();
      const rawLines = content
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (rawLines.length < 2) {
        throw new Error('The CSV file appears to be empty or missing header rows.');
      }

      // Parse headers
      const headers = parseCsvLine(rawLines[0]).map((h) =>
        h.toLowerCase().replace(/[^a-z0-9_]/g, '')
      );

      const nameIdx = headers.findIndex(
        (h) => h === 'name' || h === 'fullname' || h === 'client' || h === 'clientname'
      );
      const phoneIdx = headers.findIndex(
        (h) => h === 'phone' || h === 'phonenumber' || h === 'mobile' || h === 'whatsapp'
      );
      const emailIdx = headers.findIndex((h) => h === 'email' || h === 'emailaddress');
      const genderIdx = headers.findIndex((h) => h === 'gender' || h === 'sex');
      const tagsIdx = headers.findIndex((h) => h === 'tags' || h === 'tag' || h === 'services');
      const lastVisitIdx = headers.findIndex(
        (h) => h === 'lastvisit' || h === 'lastvisitdate' || h === 'visit'
      );
      const consentIdx = headers.findIndex(
        (h) => h === 'marketingconsent' || h === 'consent' || h === 'marketing'
      );

      if (nameIdx === -1 || phoneIdx === -1) {
        throw new Error(
          'Missing required headers. CSV must contain at least "name" and "phone" columns.'
        );
      }

      const candidateRows: CustomerFormData[] = [];
      const seenPhonesInCsv = new Set<string>();
      let invalidCount = 0;
      let internalDuplicatesCount = 0;

      for (let i = 1; i < rawLines.length; i++) {
        const columns = parseCsvLine(rawLines[i]);
        const rawName = columns[nameIdx] || '';
        const rawPhone = columns[phoneIdx] || '';

        const name = rawName.trim();
        const phone = rawPhone.trim();

        // Reject rows missing name or phone
        if (!name || !phone) {
          invalidCount++;
          continue;
        }

        // Duplicate phone check within CSV
        if (seenPhonesInCsv.has(phone)) {
          internalDuplicatesCount++;
          continue;
        }
        seenPhonesInCsv.add(phone);

        // Optional fields
        const email = emailIdx !== -1 && columns[emailIdx] ? columns[emailIdx].trim() : undefined;
        const gender = genderIdx !== -1 && columns[genderIdx] ? columns[genderIdx].trim() : undefined;
        const rawTags = tagsIdx !== -1 && columns[tagsIdx] ? columns[tagsIdx] : '';
        const tags = rawTags
          ? rawTags
              .split(/[,;|]/)
              .map((t) => t.trim())
              .filter((t) => t.length > 0)
          : [];
        const last_visit =
          lastVisitIdx !== -1 && columns[lastVisitIdx] ? columns[lastVisitIdx].trim() : undefined;

        let marketing_consent = false;
        if (consentIdx !== -1 && columns[consentIdx]) {
          const val = columns[consentIdx].trim().toLowerCase();
          marketing_consent = val === 'true' || val === '1' || val === 'yes' || val === 'y';
        }

        candidateRows.push({
          name,
          phone,
          email,
          gender: ['Female', 'Male', 'Non-binary', 'Other', 'Prefer not to say'].includes(gender || '')
            ? gender
            : undefined,
          tags,
          status: 'active',
          marketing_consent,
          consent_date: marketing_consent ? new Date().toISOString() : null,
          last_visit: last_visit || null,
        });
      }

      // Check existing phone numbers in Supabase
      const allCandidatePhones = candidateRows.map((r) => r.phone);
      const existingPhonesInDb = await customerService.fetchExistingPhones(allCandidatePhones);

      const toInsert: CustomerFormData[] = [];
      let dbDuplicatesCount = 0;

      for (const row of candidateRows) {
        if (existingPhonesInDb.has(row.phone)) {
          dbDuplicatesCount++;
        } else {
          toInsert.push(row);
        }
      }

      let insertedCount = 0;
      if (toInsert.length > 0) {
        insertedCount = await customerService.batchInsertCustomers(toInsert);
      }

      const totalDuplicates = internalDuplicatesCount + dbDuplicatesCount;

      setSummary({
        imported: insertedCount,
        duplicates: totalDuplicates,
        invalid: invalidCount,
        totalParsed: rawLines.length - 1,
      });

      onImportSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred processing the CSV file.';
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadSample = () => {
    const csvContent =
      'name,phone,email,gender,tags,last_visit,marketing_consent\n' +
      'Charlotte Dubois,+1 (555) 234-8901,charlotte@example.com,Female,"VIP, Balayage",2026-03-10,true\n' +
      'Amara Vance,+1 (555) 890-1234,amara@example.com,Female,"Glossing, Treatment",2026-03-15,true\n' +
      'Julian Croft,+1 (555) 456-7890,julian@example.com,Male,"Precision Cut",2026-02-28,false';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'salon_clients_sample.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-100 p-6 z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-salon-50 text-salon-600 flex items-center justify-center">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900">
                Import Clients via CSV
              </h2>
              <p className="text-xs text-slate-500">
                Batch upload contacts directly to your salon CRM.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Import Summary Result */}
        {summary ? (
          <div className="my-6 space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold">CSV Processing Complete</h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Processed {summary.totalParsed} contact rows safely without overwriting existing clients.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <p className="text-xs text-slate-500 font-medium">Imported</p>
                <p className="text-xl font-bold text-emerald-600 mt-0.5">{summary.imported}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <p className="text-xs text-slate-500 font-medium">Duplicates</p>
                <p className="text-xl font-bold text-amber-600 mt-0.5">{summary.duplicates}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <p className="text-xs text-slate-500 font-medium">Invalid</p>
                <p className="text-xl font-bold text-rose-600 mt-0.5">{summary.invalid}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={handleReset} leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>
                Import Another File
              </Button>
              <Button variant="primary" size="sm" onClick={onClose}>
                Done & View Clients
              </Button>
            </div>
          </div>
        ) : (
          <div className="my-6 space-y-5">
            {/* Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 hover:border-salon-400 p-8 text-center transition-all bg-slate-50/50 hover:bg-salon-50/20"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center text-salon-500 mb-3 group-hover:scale-105 transition-transform">
                  <UploadCloud className="h-6 w-6" />
                </div>
                {file ? (
                  <div>
                    <p className="text-sm font-bold text-slate-800">{file.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {(file.size / 1024).toFixed(1)} KB • Click to choose different file
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Click to browse or drop CSV file here
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Required columns: <code className="text-slate-700 font-semibold">name</code>, <code className="text-slate-700 font-semibold">phone</code>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Template Download Help */}
            <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/60">
              <span>Need the required format?</span>
              <button
                type="button"
                onClick={handleDownloadSample}
                className="inline-flex items-center gap-1 font-semibold text-salon-600 hover:text-salon-700"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Sample CSV Template</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" size="md" onClick={onClose} disabled={isProcessing}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleProcessImport}
                disabled={!file || isProcessing}
                leftIcon={
                  isProcessing ? (
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <UploadCloud className="h-4 w-4" />
                  )
                }
              >
                {isProcessing ? 'Validating & Importing...' : 'Validate & Import'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

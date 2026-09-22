import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { mockRecentReplies } from '../../lib/mockData';
import { Send, CheckCheck, Paperclip } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const InboxPage: React.FC = () => {
  const [selectedReply, setSelectedReply] = useState(mockRecentReplies[0]);
  const [replyText, setReplyText] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
          Unified WhatsApp Inbox
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Direct two-way salon messaging with your clients (47 active conversation threads).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
        {/* Left: Conversations List */}
        <Card padding="none" className="lg:col-span-5 flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Recent Client Chats</h3>
            <span className="text-xs bg-salon-100 text-salon-700 px-2 py-0.5 rounded-full font-semibold">
              2 Unread
            </span>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {mockRecentReplies.map((reply) => {
              const isSelected = selectedReply.id === reply.id;
              return (
                <button
                  key={reply.id}
                  onClick={() => setSelectedReply(reply)}
                  className={`w-full text-left p-4 flex items-start gap-3 transition-colors ${
                    isSelected ? 'bg-salon-50/70 border-l-4 border-salon-500' : 'hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={reply.avatar}
                    alt={reply.customerName}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900 truncate">
                        {reply.customerName}
                      </span>
                      <span className="text-[11px] text-slate-400">{reply.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 truncate mt-1">
                      {reply.messagePreview}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Right: Active Chat View */}
        <Card padding="none" className="lg:col-span-7 flex flex-col justify-between">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <img
                src={selectedReply.avatar}
                alt={selectedReply.customerName}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-salon-200"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{selectedReply.customerName}</h4>
                <p className="text-xs text-slate-400 font-mono">{selectedReply.customerPhone}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>WhatsApp Active</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-6 space-y-4 flex-1 bg-[#FAF9F8]">
            {/* Outgoing campaign bubble */}
            <div className="flex justify-end">
              <div className="max-w-md bg-salon-500 text-white p-3.5 rounded-2xl rounded-tr-none text-xs space-y-1 shadow-sm">
                <p>
                  Hi {selectedReply.customerName.split(' ')[0]}! Refresh your look this weekend at LUMIÈRE Studio! Enjoy a complimentary deep conditioning treatment with any hair color service.
                </p>
                <div className="flex items-center justify-end gap-1 text-[10px] text-salon-100 pt-1">
                  <span>09:30 AM</span>
                  <CheckCheck className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>

            {/* Incoming Client Reply bubble */}
            <div className="flex justify-start">
              <div className="max-w-md bg-white border border-slate-200/80 p-3.5 rounded-2xl rounded-tl-none text-xs space-y-1 shadow-soft">
                <p className="text-slate-800">{selectedReply.messagePreview}</p>
                <span className="text-[10px] text-slate-400 block pt-1">
                  {selectedReply.timestamp}
                </span>
              </div>
            </div>
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100">
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                type="text"
                placeholder="Type your WhatsApp reply to client..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-salon-100"
              />
              <Button size="sm" variant="primary" rightIcon={<Send className="h-3.5 w-3.5" />}>
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

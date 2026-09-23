import React from 'react';
import { Card } from '../../components/common/Card';
import { MessageSquare, MessageCircle, Send, Paperclip } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const InboxPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
          Unified WhatsApp Inbox
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Direct two-way salon messaging with your VIP clientele.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
        {/* Left: Conversations List */}
        <Card padding="none" className="lg:col-span-5 flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Client Chats</h3>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-semibold">
              0 Active Threads
            </span>
          </div>

          <div className="p-8 text-center my-auto space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-salon-50 text-salon-500 mx-auto flex items-center justify-center">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-800">No Active Conversations</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                When a client replies to your promotional broadcast or texts your WhatsApp Business number, their chat thread will appear here.
              </p>
            </div>
          </div>
        </Card>

        {/* Right: Active Chat View (Clean Placeholder) */}
        <Card padding="none" className="lg:col-span-7 flex flex-col justify-between">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-sm">
                ?
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">No Client Selected</h4>
                <p className="text-xs text-slate-400">Select a conversation thread to respond</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Phase 3 Channel</span>
            </div>
          </div>

          {/* Chat Empty Area */}
          <div className="p-8 flex-1 flex flex-col items-center justify-center bg-[#FAF9F8] text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-slate-200/60 text-slate-400 flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold text-slate-600">Unified WhatsApp Messenger</p>
            <p className="text-[11px] text-slate-400 max-w-xs">
              Live two-way salon messaging will connect to Meta WhatsApp Cloud API webhooks in Phase 3.
            </p>
          </div>

          {/* Disabled Input Preview */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-2 opacity-60">
              <button disabled className="p-2 text-slate-400 rounded-xl">
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                type="text"
                disabled
                placeholder="Connect WhatsApp Cloud API in Settings to enable replies..."
                className="flex-1 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-xs sm:text-sm text-slate-500 cursor-not-allowed"
              />
              <Button size="sm" variant="primary" disabled rightIcon={<Send className="h-3.5 w-3.5" />}>
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

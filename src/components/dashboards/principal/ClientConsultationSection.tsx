/**
 * Dhenze Electronic Notarization Facility (Dhenze ENF)
 * Client Consultation & Videoconference Workspace
 * Encrypted Messages, Consultation Notes, and Comprehensive Video Call Simulator
 */

import React, { useState } from 'react';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Share2,
  Lock,
  MessageSquare,
  Hand,
  Users,
  Send,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Settings,
} from 'lucide-react';
import { useClientCase } from '../../../context/ClientCaseContext';
import { StatusBadge } from '../../common/StatusBadge';

interface ClientConsultationSectionProps {
  activeSubModule: string;
}

export const ClientConsultationSection: React.FC<ClientConsultationSectionProps> = ({
  activeSubModule,
}) => {
  const { activeCase, sendLawyerMessage } = useClientCase();

  // Chat message state
  const [chatInput, setChatInput] = useState('');

  // Video call controls
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [inCallChatOpen, setInCallChatOpen] = useState(false);
  const [inCallMessage, setInCallMessage] = useState('');

  if (!activeCase) {
    return (
      <div className="border border-black/15 bg-white p-6 dark:border-white/15 dark:bg-neutral-950 text-xs">
        Please select or create an active case to access consultation features.
      </div>
    );
  }

  const handleSendLawyerMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    sendLawyerMessage(activeCase.caseId, chatInput.trim());
    setChatInput('');
  };

  return (
    <div className="space-y-5 text-xs">
      {/* Notice Banner */}
      <div className="border border-black/15 bg-neutral-50 p-3.5 text-xs text-neutral-600 dark:border-white/15 dark:bg-neutral-900/60 dark:text-neutral-400">
        <div className="flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-black dark:text-white mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-black dark:text-white">
              Demonstration Environment — Consultation & Videoconference Sandbox
            </p>
            <p className="text-[11px]">
              This function uses simulated demonstration data and does not create a legally valid identity verification, signature, notarization, certificate, seal, payment, or government record.
            </p>
          </div>
        </div>
      </div>

      {/* Case Header */}
      <div className="border border-black/20 bg-white p-4 dark:border-white/20 dark:bg-neutral-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-mono uppercase text-neutral-500">
            Legal Consultation & Pre-Hearing Briefing
          </span>
          <h4 className="text-sm font-bold text-black dark:text-white">
            {activeCase.caseReference} • {activeCase.assignedLawyer?.name || 'Atty. Roberto Cruz'}
          </h4>
        </div>
        <StatusBadge status="ATTORNEY_CLIENT_PRIVILEGE" variant="success" size="sm" />
      </div>

      {/* SUB-VIEW ROUTING */}
      {activeSubModule === 'principal-calendar' ? (
        /* APPOINTMENT CALENDAR */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Upcoming Hearing & Consultation Calendar
              </h3>
              <p className="text-xs text-neutral-500">
                Scheduled videoconference appearances and notarization ceremonies.
              </p>
            </div>
            <StatusBadge status="SLOTS CONFIRMED" variant="info" size="sm" />
          </div>

          <div className="space-y-3">
            <div className="border border-black/10 p-4 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-bold text-xs">Pre-Ceremony Case Strategy Consultation</span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Presided by {activeCase.assignedLawyer?.name || 'Atty. Roberto Cruz'} • Encrypted Room #413-MKT
                </p>
                <div className="font-mono text-[10px] text-neutral-400">
                  Date: March 24, 2026 • Time: 10:00 AM - 10:30 AM PHT
                </div>
              </div>
              <button className="border border-black bg-black px-4 py-2 font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black cursor-pointer">
                Enter Waiting Room
              </button>
            </div>
          </div>
        </div>
      ) : activeSubModule === 'principal-live-sessions' ? (
        /* SECURE VIDEO CALL SIMULATOR (Section 28) */
        <div className="border border-black/15 bg-neutral-950 text-white p-5 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-xs font-mono font-bold tracking-wider uppercase">
                Synchronous Encrypted Notarial Videoconference Room
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="border border-neutral-700 px-2 py-0.5 text-[9px] font-mono">
                TLS 1.3 • WebRTC DTLS-SRTP
              </span>
              <span className="border border-emerald-500/40 bg-emerald-950/60 px-2 py-0.5 text-[9px] font-mono text-emerald-400">
                ROOM LOCKED
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Primary Video Canvas */}
            <div className="md:col-span-2 relative bg-neutral-900 border border-neutral-800 min-h-[300px] flex flex-col justify-between p-4">
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                <span>ENP: Atty. Juan Dela Cruz (Presiding Notary)</span>
                <span>Signal: 1080p 30fps (Optimal)</span>
              </div>

              {/* Watermark Banner */}
              <div className="self-center border border-white/20 bg-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                DEMONSTRATION VIDEOCONFERENCE — NOT A LEGALLY VALID HEARING
              </div>

              {/* Screen Share Overlay if toggled */}
              {isScreenSharing && (
                <div className="absolute inset-4 bg-neutral-950/90 border border-white/20 p-4 flex flex-col justify-between">
                  <div className="text-[10px] font-mono text-neutral-300">
                    [DOCUMENT PRESENTATION MODE: {activeCase.title}]
                  </div>
                  <div className="text-center font-serif text-neutral-200 text-xs py-10">
                    KNOW ALL MEN BY THESE PRESENTS: Special Power of Attorney preview active for attendees...
                  </div>
                  <button
                    onClick={() => setIsScreenSharing(false)}
                    className="self-end border border-white px-2 py-1 text-[10px]"
                  >
                    Stop Presentation
                  </button>
                </div>
              )}

              {/* Self View Floating Window */}
              <div className="self-end border border-neutral-700 bg-neutral-950 p-2 w-36 space-y-1">
                <div className="text-[9px] text-neutral-400 font-mono">You (Client)</div>
                <div className="h-14 bg-neutral-800 flex items-center justify-center text-[9px] text-neutral-500 font-mono">
                  {isVideoOff ? '[CAMERA OFF]' : '[LIVE VIDEO]'}
                </div>
              </div>
            </div>

            {/* In-Call Controls & Attendees */}
            <div className="border border-neutral-800 bg-neutral-900 p-4 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Hearing Attendees (3)
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between border border-neutral-800 p-2 bg-neutral-950">
                    <span>Atty. Juan Dela Cruz</span>
                    <span className="text-[9px] text-emerald-400 font-mono">Notary Public</span>
                  </div>
                  <div className="flex items-center justify-between border border-neutral-800 p-2 bg-neutral-950">
                    <span>Maria Elena Santos</span>
                    <span className="text-[9px] text-neutral-400 font-mono">Principal</span>
                  </div>
                  <div className="flex items-center justify-between border border-neutral-800 p-2 bg-neutral-950">
                    <span>Atty. Roberto Cruz</span>
                    <span className="text-[9px] text-neutral-400 font-mono">Witness</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-neutral-800">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsMicMuted(!isMicMuted)}
                    className={`flex items-center justify-center gap-1.5 p-2 text-xs font-mono border cursor-pointer ${
                      isMicMuted
                        ? 'border-rose-500 bg-rose-950/60 text-rose-300'
                        : 'border-neutral-700 bg-neutral-950 text-neutral-200'
                    }`}
                  >
                    {isMicMuted ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                    <span>{isMicMuted ? 'Unmute' : 'Mute'}</span>
                  </button>

                  <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`flex items-center justify-center gap-1.5 p-2 text-xs font-mono border cursor-pointer ${
                      isVideoOff
                        ? 'border-rose-500 bg-rose-950/60 text-rose-300'
                        : 'border-neutral-700 bg-neutral-950 text-neutral-200'
                    }`}
                  >
                    {isVideoOff ? <VideoOff className="h-3.5 w-3.5" /> : <Video className="h-3.5 w-3.5" />}
                    <span>{isVideoOff ? 'Start Cam' : 'Stop Cam'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                    className="flex items-center justify-center gap-1.5 p-2 text-xs font-mono border border-neutral-700 bg-neutral-950 text-neutral-200 cursor-pointer"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Present Doc</span>
                  </button>

                  <button
                    onClick={() => setIsHandRaised(!isHandRaised)}
                    className={`flex items-center justify-center gap-1.5 p-2 text-xs font-mono border cursor-pointer ${
                      isHandRaised
                        ? 'border-amber-500 bg-amber-950/60 text-amber-300'
                        : 'border-neutral-700 bg-neutral-950 text-neutral-200'
                    }`}
                  >
                    <Hand className="h-3.5 w-3.5" />
                    <span>{isHandRaised ? 'Hand Raised' : 'Raise Hand'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* LAWYER MESSAGES & NOTES (Default View) */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Privileged Counsel Messaging Thread
              </h3>
              <p className="text-xs text-neutral-500">
                Direct communication with assigned legal counsel regarding revisions and hearing instructions.
              </p>
            </div>
            <StatusBadge status="END-TO-END ENCRYPTED" variant="info" size="sm" />
          </div>

          {/* Messages Feed */}
          <div className="space-y-3 max-h-72 overflow-y-auto p-2 border border-black/10 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900">
            {(activeCase.messages || []).map((msg) => (
              <div
                key={msg.id}
                className={`p-3 max-w-[85%] space-y-1 ${
                  msg.senderRole === 'CLIENT'
                    ? 'ml-auto bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-white text-black border border-black/15 dark:bg-black dark:text-white dark:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] opacity-75">
                  <span className="font-bold">{msg.senderName} ({msg.senderRole})</span>
                  <span className="font-mono">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-xs leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>

          {/* Compose Form */}
          <form onSubmit={handleSendLawyerMessage} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Send message to legal counsel..."
              className="flex-1 border border-black/20 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-black"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 border border-black bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

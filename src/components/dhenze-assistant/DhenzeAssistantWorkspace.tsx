import React, { useState, useRef, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import {
  Send,
  Square,
  Trash2,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  FileText,
  ExternalLink,
  Lock,
  Sparkles,
  Info,
} from 'lucide-react';
import { AssistantMessage, UserCreditProfile } from '../../types/dhenze-assistant';
import { CreditLedgerService } from '../../services/credit-ledger/creditService';
import { AssistantGatewayService } from '../../services/ai-provider/assistantGateway';
import { ConsentModal } from './ConsentModal';

interface DhenzeAssistantWorkspaceProps {
  onSignInClick?: () => void;
  onContactAdminClick?: () => void;
}

export const DhenzeAssistantWorkspace: React.FC<DhenzeAssistantWorkspaceProps> = ({
  onSignInClick,
  onContactAdminClick,
}) => {
  const initialMessage: AssistantMessage = {
    id: 'msg-welcome',
    sender: 'ASSISTANT',
    text: 'Hello. I am Dhenze Assistant. I can help you understand Philippine laws, court rulings, legal procedures, and other general legal matters. My responses provide legal information and are not a substitute for advice from a licensed lawyer.',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    jurisdiction: 'Republic of the Philippines',
    isGeneralInformation: true,
  };

  const [messages, setMessages] = useState<AssistantMessage[]>([initialMessage]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [creditProfile, setCreditProfile] = useState<UserCreditProfile>(() =>
    CreditLedgerService.getCreditStatus('GUEST')
  );
  const [hasConsented, setHasConsented] = useState<boolean>(() => {
    try {
      return localStorage.getItem('dhenze_assistant_consented') === 'true';
    } catch {
      return false;
    }
  });
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [pendingSubmission, setPendingSubmission] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [showAccessOptions, setShowAccessOptions] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleConsentConfirmed = () => {
    setHasConsented(true);
    try {
      localStorage.setItem('dhenze_assistant_consented', 'true');
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    setIsConsentModalOpen(false);

    if (pendingSubmission) {
      executeSubmission(pendingSubmission);
      setPendingSubmission(null);
    }
  };

  const handleSend = () => {
    const trimmed = inputQuery.trim();
    if (!trimmed || isLoading) return;

    if (!hasConsented) {
      setPendingSubmission(trimmed);
      setIsConsentModalOpen(true);
      return;
    }

    executeSubmission(trimmed);
  };

  const executeSubmission = async (queryText: string) => {
    // 1. Consume credit
    const creditResult = CreditLedgerService.consumeCredit('GUEST');
    setCreditProfile(creditResult.status);

    if (!creditResult.success) {
      return;
    }

    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const resp = await AssistantGatewayService.queryAssistant(queryText);

      const assistantMsg: AssistantMessage = {
        id: `asst-${Date.now()}`,
        sender: 'ASSISTANT',
        text: resp.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        jurisdiction: 'Republic of the Philippines',
        isGeneralInformation: true,
        sources: resp.sources,
        hasUncertaintyNotice: resp.hasUncertaintyNotice,
        urgentNotice: resp.urgentNotice,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: AssistantMessage = {
        id: `asst-err-${Date.now()}`,
        sender: 'ASSISTANT',
        text: 'An unexpected processing error occurred while evaluating your legal query. Please try again or consult an attorney.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasUncertaintyNotice: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleFeedback = (messageId: string, type: 'HELPFUL' | 'NOT_HELPFUL') => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, feedback: type } : m))
    );
  };

  const handleClearConversation = () => {
    setMessages([initialMessage]);
  };

  const handleSuggestedClick = (text: string) => {
    if (creditProfile.isExhausted) return;
    if (!hasConsented) {
      setPendingSubmission(text);
      setIsConsentModalOpen(true);
      return;
    }
    executeSubmission(text);
  };

  return (
    <div
      id="dhenze-assistant-workspace"
      className="w-full max-w-4xl mx-auto border border-neutral-200 bg-white shadow-xs text-neutral-900"
    >
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 px-4 py-3 gap-2 bg-white">
        <div className="flex items-center gap-2.5">
          <BrandLogo
            variant="emblem"
            height={26}
            decorative
            className="shrink-0"
          />
          <div>
            <h2 className="text-sm font-bold tracking-tight text-neutral-900 leading-none">
              Dhenze Assistant
            </h2>
            <span className="text-[10px] text-neutral-500 font-mono">
              Philippine Legal Information AI Service
            </span>
          </div>
          <span className="ml-2 border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-neutral-700">
            Demonstration Mode
          </span>
        </div>

        {/* Right tools: Credit indicator & clear button */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-neutral-600 bg-neutral-50 border border-neutral-200 px-2.5 py-1">
            Free questions remaining:{' '}
            <strong className="text-black">{creditProfile.questionsRemaining}</strong>
          </span>

          <button
            type="button"
            onClick={handleClearConversation}
            title="Clear Conversation"
            className="flex items-center gap-1 border border-neutral-200 px-2.5 py-1 text-xs text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Demonstration Banner */}
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2 text-[11px] text-neutral-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
          <span>
            Live legal research is not currently configured. Demonstration responses are provided for interface evaluation only.
          </span>
        </div>
      </div>

      {/* Message Stream */}
      <div className="p-4 sm:p-6 space-y-5 min-h-[360px] max-h-[540px] overflow-y-auto bg-white">
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'ASSISTANT';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-2xl border p-4 text-xs leading-relaxed space-y-2 ${
                  isAssistant
                    ? 'border-neutral-200 bg-white text-neutral-900'
                    : 'border-black bg-black text-white'
                }`}
              >
                {/* Urgent safety banner if present */}
                {msg.urgentNotice && (
                  <div className="border border-red-500 bg-red-50 p-2.5 text-red-900 text-[11px] font-semibold flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{msg.urgentNotice}</span>
                  </div>
                )}

                {/* Message text with preserved line-breaks */}
                <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                {/* Grounded Sources Display */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-3 mt-3 border-t border-neutral-200 space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      Grounded Official Legal Sources:
                    </p>
                    {msg.sources.map((src) => (
                      <div
                        key={src.id}
                        className="flex items-center justify-between border border-neutral-200 bg-neutral-50 p-2 text-[11px]"
                      >
                        <div>
                          <p className="font-semibold text-neutral-900">{src.title}</p>
                          <p className="text-[10px] text-neutral-500">
                            {src.issuingAuthority} • {src.publicationDate}
                          </p>
                        </div>
                        {src.url && (
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 border border-neutral-300 px-2 py-0.5 text-[10px] font-mono hover:bg-neutral-200"
                          >
                            <span>Verify Source</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Jurisdictional Footnote */}
                {isAssistant && msg.jurisdiction && (
                  <div className="pt-2 text-[10px] text-neutral-400 font-mono">
                    Jurisdiction: {msg.jurisdiction} • General Legal Information
                  </div>
                )}
              </div>

              {/* Action Bar for Assistant Messages (Copy, Feedback, Timestamp) */}
              {isAssistant && msg.id !== 'msg-welcome' && (
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-neutral-400 px-1">
                  <span>{msg.timestamp}</span>

                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="flex items-center gap-1 hover:text-black transition-colors"
                    title="Copy response text"
                  >
                    {copiedMessageId === msg.id ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5 pl-2 border-l border-neutral-200">
                    <button
                      type="button"
                      onClick={() => handleFeedback(msg.id, 'HELPFUL')}
                      className={`hover:text-black transition-colors ${
                        msg.feedback === 'HELPFUL' ? 'text-black font-bold' : ''
                      }`}
                      title="Helpful response"
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFeedback(msg.id, 'NOT_HELPFUL')}
                      className={`hover:text-black transition-colors ${
                        msg.feedback === 'NOT_HELPFUL' ? 'text-black font-bold' : ''
                      }`}
                      title="Not helpful"
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start">
            <div className="border border-neutral-200 p-4 bg-white text-xs space-y-2 max-w-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-black animate-ping" />
                <span className="font-semibold text-neutral-700">Evaluating Philippine legal sources...</span>
              </div>
              <p className="text-[10px] text-neutral-400">
                Checking statutes, Supreme Court issuances, and jurisdictional boundaries.
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Section */}
      {messages.length <= 2 && !creditProfile.isExhausted && (
        <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
            Suggested Legal Research Inquiries:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain a Philippine Supreme Court ruling',
              'What are the requirements for electronic notarization?',
              'Summarize a Philippine law',
              'What documents may be needed for a legal consultation?',
            ].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSuggestedClick(q)}
                className="text-left border border-neutral-200 bg-white p-2 text-xs text-neutral-800 hover:border-black hover:bg-neutral-100 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Credit Exhaustion Notice & Actions */}
      {creditProfile.isExhausted && (
        <div className="border-t border-neutral-200 bg-neutral-50 p-4 text-xs space-y-3">
          <div className="flex items-start gap-2.5 text-neutral-800">
            <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-black">Daily Free Allowance Reached</p>
              <p className="text-neutral-600 mt-0.5">
                You have reached your free Dhenze Assistant allowance. Contact the administrator to request a subscription or additional credits.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onContactAdminClick || (() => window.open('mailto:admin@demo-dhenzelaw.ph', '_blank'))}
              className="border border-black bg-black px-3 py-1.5 text-xs text-white font-semibold hover:bg-neutral-800 transition-colors"
            >
              Contact Administrator
            </button>

            <button
              type="button"
              onClick={onSignInClick || (() => (window.location.pathname = '/sign-in'))}
              className="border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-800 font-semibold hover:bg-neutral-100 transition-colors"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setShowAccessOptions(!showAccessOptions)}
              className="border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-800 font-semibold hover:bg-neutral-100 transition-colors"
            >
              View Access Options
            </button>
          </div>

          {showAccessOptions && (
            <div className="border border-neutral-200 bg-white p-3 text-[11px] space-y-1.5 mt-2">
              <p className="font-bold text-neutral-900">Access Tiers &amp; Allowances:</p>
              <ul className="list-disc pl-4 space-y-1 text-neutral-600">
                <li><strong>Guest:</strong> 3 assistant questions per day (automatic daily reset).</li>
                <li><strong>Registered Free Account:</strong> 10 questions per month with verified login.</li>
                <li><strong>Enterprise / Retainer Client:</strong> Custom allowance configured by Firm Administrator.</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Input Composer Section */}
      <div className="border-t border-neutral-200 p-3 sm:p-4 bg-white">
        <div className="relative border border-neutral-300 focus-within:border-black transition-colors">
          <textarea
            ref={textareaRef}
            rows={2}
            disabled={creditProfile.isExhausted || isLoading}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              creditProfile.isExhausted
                ? 'Allowance exhausted. Please sign in or contact the administrator.'
                : 'Ask Dhenze Assistant about Philippine laws, Supreme Court rulings, or court procedures (Enter to send, Shift+Enter for new line)...'
            }
            className="w-full resize-none p-3 text-xs outline-none bg-transparent placeholder:text-neutral-400 disabled:bg-neutral-50 disabled:text-neutral-400"
          />

          <div className="flex items-center justify-between border-t border-neutral-100 px-3 py-2 bg-neutral-50/50">
            <span className="text-[10px] text-neutral-400 font-mono">
              Does not constitute legal advice • Grounded in Philippine law
            </span>

            <div className="flex items-center gap-2">
              {isLoading && (
                <button
                  type="button"
                  onClick={() => setIsLoading(false)}
                  className="flex items-center gap-1 border border-neutral-300 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-700 hover:bg-neutral-100"
                >
                  <Square className="h-3 w-3" />
                  <span>Stop</span>
                </button>
              )}

              <button
                type="button"
                disabled={!inputQuery.trim() || isLoading || creditProfile.isExhausted}
                onClick={handleSend}
                className={`flex items-center gap-1.5 border px-3 py-1 text-xs font-semibold ${
                  inputQuery.trim() && !isLoading && !creditProfile.isExhausted
                    ? 'border-black bg-black text-white hover:bg-neutral-800 cursor-pointer'
                    : 'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed'
                }`}
              >
                <span>Send</span>
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Terms & Consent Dialog */}
      <ConsentModal
        isOpen={isConsentModalOpen}
        onAgree={handleConsentConfirmed}
        onCancel={() => {
          setIsConsentModalOpen(false);
          setPendingSubmission(null);
        }}
      />
    </div>
  );
};

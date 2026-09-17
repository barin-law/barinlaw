/**
 * Dhenze Law Firm & Dhenze Assistant
 * Legal-information AI assistant types, safety validation, and credit ledger schemas
 */

export interface LegalSourceCitation {
  id: string;
  title: string;
  sourceType: 'STATUTE' | 'REGULATION' | 'COURT_RULING' | 'ADMINISTRATIVE_ISSUANCE' | 'GENERAL_PROCEDURAL';
  issuingAuthority: string;
  docketNumber?: string;
  publicationDate?: string;
  url?: string;
  summary: string;
  isVerified: boolean;
}

export interface AssistantMessage {
  id: string;
  sender: 'USER' | 'ASSISTANT';
  text: string;
  timestamp: string;
  jurisdiction?: 'Republic of the Philippines';
  isGeneralInformation?: boolean;
  sources?: LegalSourceCitation[];
  hasUncertaintyNotice?: boolean;
  urgentNotice?: string;
  feedback?: 'HELPFUL' | 'NOT_HELPFUL' | null;
}

export type UserCreditTier = 'GUEST' | 'REGISTERED' | 'SUBSCRIBER' | 'ADMINISTRATOR';

export interface UserCreditProfile {
  tier: UserCreditTier;
  dailyAllowance: number;
  dailyQuestionsUsed: number;
  monthlyQuestionsUsed: number;
  questionsRemaining: number;
  isExhausted: boolean;
  lastResetDate: string;
}

export interface ConsentAgreement {
  disclaimerAcknowledged: boolean;
  privacyNoticeAccepted: boolean;
  externalAiProcessingConsented: boolean;
  confidentialityAgreementAccepted: boolean;
  agreedAt: string;
}

export interface PreapprovedLegalQnA {
  id: string;
  triggerPhrase: string;
  question: string;
  category: string;
  answerText: string;
  sources: LegalSourceCitation[];
}

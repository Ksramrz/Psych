// Shared types for ClinicSense

export type SubscriptionTier = 'free' | 'pro' | 'clinic';

export interface User {
  id: string;
  clerk_id: string;
  email: string;
  subscription_tier: SubscriptionTier;
  created_at: string;
}

export interface Case {
  id: string;
  user_id: string;
  title: string;
  case_content: string;
  analysis_result: CaseAnalysisResult | null;
  created_at: string;
  updated_at: string;
}

export interface CaseAnalysisResult {
  insights: string[];
  patterns: string[];
  possibleFrameworks: string[];
  differentialDiagnoses: string[];
  interventionSuggestions: string[];
  assessmentRecommendations: string[];
  disclaimer: string;
}

export interface SessionNote {
  id: string;
  user_id: string;
  raw_notes: string;
  summary: string;
  created_at: string;
}

export interface EthicsCheck {
  id: string;
  user_id: string;
  question: string;
  response: EthicsCheckResponse;
  risk_level: 'low' | 'medium' | 'high';
  created_at: string;
}

export interface EthicsCheckResponse {
  isEthical: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  concerns: string[];
  recommendations: string[];
  explanation: string;
}

export interface SupervisorReflection {
  id: string;
  user_id: string;
  case_context: string;
  reflection_result: ReflectionResult;
  created_at: string;
}

export interface ReflectionResult {
  reflectiveQuestions: string[];
  alternativePerspectives: string[];
  assessmentSuggestions: string[];
  interventionIdeas: string[];
  considerations: string[];
}

export interface RAGDocument {
  id: string;
  content: string;
  metadata: {
    source: string;
    type: 'dsm' | 'apa' | 'assessment' | 'intervention' | 'other';
    title?: string;
  };
  embedding?: number[];
}




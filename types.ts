export enum ModelName {
  GPT_OSS_120B = 'GPT-OSS 120B (Medium)',
  CLAUDE_SONNET_4_5 = 'Claude Sonnet 4.5',
  CLAUDE_SONNET_4_5_THINKING = 'Claude Sonnet 4.5 (Thinking)',
  GEMINI_3_PRO_HIGH = 'Gemini 3 Pro (High)',
  GEMINI_3_PRO_LOW = 'Gemini 3 Pro (Low)'
}

export interface RouterResponse {
  model_selected: ModelName;
  new_prompt_for_model: string;
  response_content: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'system' | 'router';
  content: string;
  timestamp: Date;
  metadata?: RouterResponse;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPrimary?: boolean;
}
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD', 
  TERMINAL = 'TERMINAL',   
  TOOLS = 'TOOLS',         
  LABS = 'LABS',           
  CHAT = 'CHAT',           
  OFFENSIVE = 'OFFENSIVE'  
}

export interface TacticalBriefing {
  kaliCommands: string[];
  commonMistakes: string[];
  recommendedSoftware: string[];
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: 'Beginner' | 'Intermediate' | 'Advanced' | 'Offensive';
  tags: string[];
  briefing?: TacticalBriefing;
}

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  legalUsage: string;
  illegalUsage: string;
  commandExample: string;
}

export interface UserStats {
  streak: number;
  skillRating: string; 
  completedModules: number;
  weeklyGoalProgress: number; 
}
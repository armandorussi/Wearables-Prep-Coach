
export enum BlockType {
  Calibration = 'calibration',
  Refresher = 'refresher',
  Flashcards = 'flashcards',
  CoderPad = 'coderpad',
  Behavioral = 'behavioral',
  Product = 'product',
  FinalBoss = 'finalboss'
}

export interface HistoryEntry {
  timestamp: number;
  readiness: number;
  scores: {
    technical: number;
    coding: number;
    partner: number;
    product: number;
  };
}

export interface AppState {
  currentBlockIndex: number;
  overallReadiness: number;
  scores: {
    technical: number;
    coding: number;
    partner: number;
    product: number;
  };
  completedBlocks: string[];
  flashcardStats: Record<string, { gotIt: boolean; seen: number }>;
  starDrafts: Record<string, string>;
  quizResults: Record<string, number>;
  history: HistoryEntry[];
  sessionStartTime?: number;
}

export interface Flashcard {
  id: string;
  deck: 'A' | 'B' | 'C' | 'D';
  question: string;
  answer: string;
  tags: string[];
}

export interface CodingPrompt {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hints: string[];
  checklist: string[];
  modelSolution: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  approaches: {
    label: string;
    text: string;
    feedback: string;
    isBest: boolean;
  }[];
  modelStar: string;
}

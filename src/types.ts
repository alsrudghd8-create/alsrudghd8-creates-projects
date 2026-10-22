export type SectionId = 1 | 2 | 3 | 4;

export interface QuestionItem {
  id: string;
  section: SectionId;
  secTitle: string;
  secSubtitle: string;
  qNum: string;
  qText: string;
  answer: string;
  keywords: string[];
  historicalContext?: string; // Additional historical background or Samguk Sagi excerpt
  options: string[];
  correctIdx: number;
}

export type AppMode = 'workbook' | 'quiz' | 'timeline';
export type FilterMode = 'all' | 'unanswered' | 'answered';

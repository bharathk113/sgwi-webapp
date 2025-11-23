export interface Section {
  id: string;
  title: string;
  content: string;
  imagePath?: string; // Local path relative to public/ or logic to load
}

export enum GameState {
  IDLE,
  PLAYING,
  WON,
}

export interface DataPoint {
  x: number;
  y_experimental: number;
  y_theoretical: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export interface PaperConfig {
  title: string;
  doiUrl: string;
  authors: string;
  abstract: string;
  paperContext: string; // Full text or detailed summary for AI context
}
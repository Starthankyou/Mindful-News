/**
 * Mindful News - TypeScript 型別定義
 */

// 1. 今日金句
export interface Quote {
  id: string;
  english: string;
  chinese: string;
  sourceType: 'news' | 'article' | 'book' | 'speech' | 'other';
}

// 2. 精選段落
export interface Passage {
  id: string;
  english: string;
  chinese: string;
  order: number;
}

// 3. 單字
export interface Vocabulary {
  word: string;
  definition: string;
  example?: string;
}

// 4. 文法亮點
export interface GrammarPoint {
  sentence: string;
  explanation: string;
}

// 5. 理解題
export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
}

// 6. 今日資訊卡（主要資料結構）
export interface DailyCard {
  id: string;
  date: string; // ISO format: YYYY-MM-DD
  quote: Quote;
  summary: string[]; // 5 點 bullet
  passages: Passage[];
  vocabulary: Vocabulary[];
  grammar: GrammarPoint;
  comprehensionQuestions: ComprehensionQuestion[];
  lifeApplicationQuestion: string; // 生活應用題
  actionSuggestion: string; // 微行動建議
}

// 7. 使用者輸入（存入 LocalStorage）
export interface UserReflection {
  cardId: string;
  date: string; // ISO format: YYYY-MM-DD
  inspiration: string; // 今日啟發
  lifeApplicationAnswer: string; // 生活應用回答
  myAction: string; // 今日我能做什麼
}

// 8. 收藏項目
export interface CollectionItem {
  id: string;
  type: 'card' | 'quote' | 'action';
  cardId: string; // 關聯到哪張卡片
  content: DailyCard | Quote | string;
  collectedAt: string; // ISO datetime
}

// 9. LocalStorage 鍵值
export const STORAGE_KEYS = {
  REFLECTIONS: 'mindful_news_reflections',
  COLLECTIONS: 'mindful_news_collections',
  CURRENT_CARD_ID: 'mindful_news_current_card',
} as const;

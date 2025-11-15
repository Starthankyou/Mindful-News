/**
 * LocalStorage 工具函數
 * 提供型別安全的 LocalStorage 操作
 */

import { UserReflection, CollectionItem, STORAGE_KEYS } from '../types';

// ========== UserReflection 相關 ==========

/**
 * 儲存使用者反思記錄
 */
export const saveReflection = (reflection: UserReflection): void => {
  const reflections = getReflections();

  // 檢查是否已經有同一天的記錄，如果有則更新
  const existingIndex = reflections.findIndex(
    r => r.cardId === reflection.cardId
  );

  if (existingIndex >= 0) {
    reflections[existingIndex] = reflection;
  } else {
    reflections.push(reflection);
  }

  localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(reflections));
};

/**
 * 取得所有反思記錄
 */
export const getReflections = (): UserReflection[] => {
  const data = localStorage.getItem(STORAGE_KEYS.REFLECTIONS);
  if (!data) return [];

  try {
    return JSON.parse(data) as UserReflection[];
  } catch {
    return [];
  }
};

/**
 * 取得特定卡片的反思記錄
 */
export const getReflectionByCardId = (cardId: string): UserReflection | null => {
  const reflections = getReflections();
  return reflections.find(r => r.cardId === cardId) || null;
};

// ========== Collections 相關 ==========

/**
 * 新增收藏
 */
export const addCollection = (item: CollectionItem): void => {
  const collections = getCollections();

  // 檢查是否已經收藏過
  const exists = collections.some(c => c.id === item.id);
  if (!exists) {
    collections.push(item);
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
  }
};

/**
 * 移除收藏
 */
export const removeCollection = (id: string): void => {
  const collections = getCollections();
  const filtered = collections.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(filtered));
};

/**
 * 取得所有收藏
 */
export const getCollections = (): CollectionItem[] => {
  const data = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
  if (!data) return [];

  try {
    return JSON.parse(data) as CollectionItem[];
  } catch {
    return [];
  }
};

/**
 * 檢查是否已收藏
 */
export const isCollected = (id: string): boolean => {
  const collections = getCollections();
  return collections.some(c => c.id === id);
};

// ========== 其他工具函數 ==========

/**
 * 取得隨機項目（用於隨機回顧）
 */
export const getRandomItem = (): { type: 'quote' | 'inspiration'; content: string } | null => {
  const reflections = getReflections();
  const collections = getCollections();

  // 收集所有金句
  const quotes = collections
    .filter(c => c.type === 'quote')
    .map(c => (c.content as any).english || '');

  // 收集所有啟發
  const inspirations = reflections
    .filter(r => r.inspiration.trim() !== '')
    .map(r => r.inspiration);

  const allItems = [
    ...quotes.map(q => ({ type: 'quote' as const, content: q })),
    ...inspirations.map(i => ({ type: 'inspiration' as const, content: i })),
  ];

  if (allItems.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * allItems.length);
  return allItems[randomIndex];
};

/**
 * 清除所有資料（僅供開發測試使用）
 */
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.REFLECTIONS);
  localStorage.removeItem(STORAGE_KEYS.COLLECTIONS);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_CARD_ID);
};

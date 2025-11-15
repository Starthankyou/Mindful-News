import { useEffect, useState } from 'react';
import { getCollections, removeCollection } from '../utils/localStorage';
import { CollectionItem, Quote } from '../types';

export default function Collections() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);

  const loadCollections = () => {
    const data = getCollections();
    setCollections(data.sort((a, b) => b.collectedAt.localeCompare(a.collectedAt)));
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const handleRemove = (id: string) => {
    removeCollection(id);
    loadCollections();
  };

  if (collections.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">我的收藏</h1>
        <div className="card-mindful text-center py-12">
          <p className="text-gray-500">還沒有任何收藏</p>
          <p className="text-sm text-gray-400 mt-2">
            在今日資訊卡中收藏金句或行動建議吧
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">我的收藏</h1>

      <div className="space-y-4">
        {collections.map(item => (
          <div key={item.id} className="card-mindful">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* 金句 */}
                {item.type === 'quote' && (
                  <>
                    <p className="text-xs text-gray-500 mb-2">📖 金句</p>
                    <blockquote className="text-lg text-gray-700 mb-1">
                      "{(item.content as Quote).english}"
                    </blockquote>
                    <p className="text-gray-600 text-sm italic">
                      「{(item.content as Quote).chinese}」
                    </p>
                  </>
                )}

                {/* 行動建議 */}
                {item.type === 'action' && (
                  <>
                    <p className="text-xs text-gray-500 mb-2">🎯 行動建議</p>
                    <p className="text-gray-700">{item.content as string}</p>
                  </>
                )}

                {/* 整張卡片 */}
                {item.type === 'card' && (
                  <>
                    <p className="text-xs text-gray-500 mb-2">📰 資訊卡</p>
                    <p className="text-gray-700">
                      {(item.content as any).date} - {(item.content as any).quote.chinese}
                    </p>
                  </>
                )}

                <p className="text-xs text-gray-400 mt-2">
                  收藏於 {new Date(item.collectedAt).toLocaleDateString('zh-TW')}
                </p>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { getCollections, removeCollection } from '../utils/localStorage';
import { CollectionItem, Quote } from '../types';
import { useToast } from '../components/Common/Toast';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';

export default function Collections() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const { showToast } = useToast();

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
    showToast('已移除收藏', 'success');
  };

  if (collections.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">我的收藏</h1>
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-500">還沒有任何收藏</p>
            <p className="text-sm text-gray-400 mt-2">
              在今日資訊卡中收藏金句或行動建議吧
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">我的收藏</h1>
        <span className="text-sm text-gray-500">共 {collections.length} 項收藏</span>
      </div>

      <div className="space-y-4">
        {collections.map(item => (
          <Card key={item.id}>
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

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(item.id)}
                className="ml-4 text-gray-400 hover:text-red-500"
              >
                🗑️
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

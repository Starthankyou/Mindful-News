import { useEffect, useState } from 'react';
import { getReflections } from '../utils/localStorage';
import { UserReflection } from '../types';
import Card from '../components/Common/Card';

export default function Journal() {
  const [reflections, setReflections] = useState<UserReflection[]>([]);

  useEffect(() => {
    const data = getReflections();
    // 按日期排序（最新的在前）
    setReflections(data.sort((a, b) => b.date.localeCompare(a.date)));
  }, []);

  if (reflections.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">我的日誌</h1>
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-500">還沒有任何記錄</p>
            <p className="text-sm text-gray-400 mt-2">
              完成每日資訊卡的反思後，記錄就會顯示在這裡
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">我的日誌</h1>
        <span className="text-sm text-gray-500">共 {reflections.length} 筆記錄</span>
      </div>

      <div className="space-y-4">
        {reflections.map(reflection => (
          <Card key={reflection.cardId}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-blue-600">{reflection.date}</span>
            </div>

            {reflection.inspiration && (
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">💡 今日啟發</p>
                <p className="text-gray-700">{reflection.inspiration}</p>
              </div>
            )}

            {reflection.lifeApplicationAnswer && (
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">🤔 生活應用</p>
                <p className="text-gray-700">{reflection.lifeApplicationAnswer}</p>
              </div>
            )}

            {reflection.myAction && (
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">🎯 我的行動</p>
                <p className="text-gray-700">{reflection.myAction}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

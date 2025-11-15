import { useState } from 'react';
import { getRandomItem } from '../utils/localStorage';

export default function Review() {
  const [randomItem, setRandomItem] = useState<{
    type: 'quote' | 'inspiration';
    content: string;
  } | null>(null);

  const handleGetRandom = () => {
    const item = getRandomItem();
    setRandomItem(item);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">隨機回顧</h1>

      <div className="card-mindful text-center">
        <p className="text-gray-600 mb-6">
          從你的收藏與日誌中，隨機抽取一段內容，重溫過去的啟發
        </p>

        <button
          onClick={handleGetRandom}
          className="btn-primary mx-auto mb-6"
        >
          🔄 隨機抽取
        </button>

        {randomItem && (
          <div className="bg-blue-50 p-6 rounded-lg">
            {randomItem.type === 'quote' && (
              <>
                <p className="text-xs text-gray-500 mb-3">📖 金句</p>
                <blockquote className="text-xl text-gray-700 leading-relaxed">
                  "{randomItem.content}"
                </blockquote>
              </>
            )}

            {randomItem.type === 'inspiration' && (
              <>
                <p className="text-xs text-gray-500 mb-3">💡 過去的啟發</p>
                <p className="text-lg text-gray-700">
                  {randomItem.content}
                </p>
              </>
            )}
          </div>
        )}

        {!randomItem && (
          <div className="text-gray-400 text-sm">
            <p>點擊上方按鈕，開始你的隨機回顧之旅</p>
          </div>
        )}
      </div>
    </div>
  );
}

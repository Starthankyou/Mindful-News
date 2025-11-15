import { useState } from 'react';
import { getRandomItem } from '../utils/localStorage';
import { useToast } from '../components/Common/Toast';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';

export default function Review() {
  const [randomItem, setRandomItem] = useState<{
    type: 'quote' | 'inspiration';
    content: string;
  } | null>(null);

  const { showToast } = useToast();

  const handleGetRandom = () => {
    const item = getRandomItem();
    if (item) {
      setRandomItem(item);
    } else {
      showToast('還沒有任何收藏或啟發記錄', 'info');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">隨機回顧</h1>

      <Card>
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            從你的收藏與日誌中，隨機抽取一段內容，重溫過去的啟發
          </p>

          <Button
            variant="primary"
            onClick={handleGetRandom}
            className="mx-auto mb-6"
          >
            🔄 隨機抽取
          </Button>

          {randomItem && (
            <div className="bg-blue-50 p-6 rounded-lg animate-slide-in-right">
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
            <div className="text-gray-400 text-sm py-8">
              <p>點擊上方按鈕，開始你的隨機回顧之旅</p>
              <p className="text-xs mt-2">需要先有收藏的金句或日誌記錄</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { DailyCard, UserReflection, CollectionItem } from '../types';
import {
  saveReflection,
  getReflectionByCardId,
  addCollection,
  isCollected,
} from '../utils/localStorage';
import { useToast } from '../components/Common/Toast';
import Button from '../components/Common/Button';
import Card from '../components/Common/Card';

export default function Home() {
  const [card, setCard] = useState<DailyCard | null>(null);
  const [loading, setLoading] = useState(true);

  // 使用者輸入狀態
  const [inspiration, setInspiration] = useState('');
  const [lifeApplicationAnswer, setLifeApplicationAnswer] = useState('');
  const [myAction, setMyAction] = useState('');

  // 收藏狀態
  const [isQuoteCollected, setIsQuoteCollected] = useState(false);
  const [isActionCollected, setIsActionCollected] = useState(false);
  const [isCardCollected, setIsCardCollected] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    // 載入今日資訊卡
    fetch('/Mindful-News/data/daily-card.json')
      .then(res => res.json())
      .then((data: DailyCard) => {
        setCard(data);
        setLoading(false);

        // 載入已儲存的反思記錄
        const savedReflection = getReflectionByCardId(data.id);
        if (savedReflection) {
          setInspiration(savedReflection.inspiration);
          setLifeApplicationAnswer(savedReflection.lifeApplicationAnswer);
          setMyAction(savedReflection.myAction);
        }

        // 檢查收藏狀態
        setIsQuoteCollected(isCollected(`quote-${data.quote.id}`));
        setIsActionCollected(isCollected(`action-${data.id}`));
        setIsCardCollected(isCollected(`card-${data.id}`));
      })
      .catch(err => {
        console.error('Failed to load daily card:', err);
        setLoading(false);
        showToast('載入資訊卡失敗', 'error');
      });
  }, [showToast]);

  const handleSaveReflection = () => {
    if (!card) return;

    // 檢查是否至少填寫了一個欄位
    if (!inspiration && !lifeApplicationAnswer && !myAction) {
      showToast('請至少填寫一個反思欄位', 'error');
      return;
    }

    const reflection: UserReflection = {
      cardId: card.id,
      date: card.date,
      inspiration,
      lifeApplicationAnswer,
      myAction,
    };

    saveReflection(reflection);
    showToast('✅ 已儲存今日記錄！', 'success');
  };

  const handleToggleQuoteCollection = () => {
    if (!card) return;

    const collectionId = `quote-${card.quote.id}`;

    if (isQuoteCollected) {
      // 取消收藏的邏輯在 Collections 頁面處理
      showToast('請到收藏頁面移除', 'info');
      return;
    }

    const collectionItem: CollectionItem = {
      id: collectionId,
      type: 'quote',
      cardId: card.id,
      content: card.quote,
      collectedAt: new Date().toISOString(),
    };

    addCollection(collectionItem);
    setIsQuoteCollected(true);
    showToast('⭐ 已收藏金句', 'success');
  };

  const handleToggleActionCollection = () => {
    if (!card) return;

    const collectionId = `action-${card.id}`;

    if (isActionCollected) {
      showToast('請到收藏頁面移除', 'info');
      return;
    }

    const collectionItem: CollectionItem = {
      id: collectionId,
      type: 'action',
      cardId: card.id,
      content: card.actionSuggestion,
      collectedAt: new Date().toISOString(),
    };

    addCollection(collectionItem);
    setIsActionCollected(true);
    showToast('⭐ 已收藏行動建議', 'success');
  };

  const handleToggleCardCollection = () => {
    if (!card) return;

    const collectionId = `card-${card.id}`;

    if (isCardCollected) {
      showToast('請到收藏頁面移除', 'info');
      return;
    }

    const collectionItem: CollectionItem = {
      id: collectionId,
      type: 'card',
      cardId: card.id,
      content: card,
      collectedAt: new Date().toISOString(),
    };

    addCollection(collectionItem);
    setIsCardCollected(true);
    showToast('⭐ 已收藏整張資訊卡', 'success');
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse text-gray-500">載入中...</div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">無法載入今日資訊卡</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* 標題與收藏按鈕 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">今日資訊卡</h1>
        <Button
          variant={isCardCollected ? 'secondary' : 'outline'}
          size="sm"
          onClick={handleToggleCardCollection}
        >
          {isCardCollected ? '⭐ 已收藏' : '☆ 收藏卡片'}
        </Button>
      </div>

      {/* 1. 今日金句 */}
      <Card title="📖 今日金句">
        <blockquote className="text-quote mb-2">
          "{card.quote.english}"
        </blockquote>
        <p className="text-gray-600 italic mb-4">
          「{card.quote.chinese}」
        </p>
        <Button
          variant={isQuoteCollected ? 'secondary' : 'ghost'}
          size="sm"
          onClick={handleToggleQuoteCollection}
        >
          {isQuoteCollected ? '⭐ 已收藏' : '☆ 收藏金句'}
        </Button>
      </Card>

      {/* 2. 精要摘要 */}
      <Card title="✨ 精要摘要">
        <ul className="space-y-2">
          {card.summary.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 3. 精選段落 */}
      <Card title="📝 精選段落">
        {card.passages.map(passage => (
          <div key={passage.id} className="mb-4 last:mb-0">
            <p className="text-gray-700 mb-2 leading-relaxed">
              {passage.english}
            </p>
            <p className="text-gray-500 text-sm">
              {passage.chinese}
            </p>
          </div>
        ))}
      </Card>

      {/* 4. 英文學習區 */}
      <Card title="📚 英文學習">
        {/* 單字 */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">關鍵單字</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {card.vocabulary.map((vocab, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded">
                <p className="font-semibold text-blue-600">{vocab.word}</p>
                <p className="text-sm text-gray-600">{vocab.definition}</p>
                {vocab.example && (
                  <p className="text-xs text-gray-500 mt-1 italic">
                    {vocab.example}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 文法亮點 */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">文法亮點</h3>
          <div className="bg-blue-50 p-3 rounded">
            <p className="text-gray-700 mb-1">"{card.grammar.sentence}"</p>
            <p className="text-sm text-gray-600">{card.grammar.explanation}</p>
          </div>
        </div>

        {/* 理解題 */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">理解測驗</h3>
          {card.comprehensionQuestions.map((q, qIndex) => (
            <div key={q.id} className="mb-3">
              <p className="text-gray-700 mb-2">{qIndex + 1}. {q.question}</p>
              <div className="space-y-1">
                {q.options.map((option, oIndex) => (
                  <label key={oIndex} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      className="mr-2"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 5. 反思區 */}
      <Card title="💭 反思區">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            今日啟發
          </label>
          <input
            type="text"
            placeholder="這篇內容帶給我什麼啟發？"
            value={inspiration}
            onChange={(e) => setInspiration(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            生活應用題
          </label>
          <p className="text-gray-600 mb-2 text-sm">{card.lifeApplicationQuestion}</p>
          <textarea
            placeholder="我的回答..."
            rows={3}
            value={lifeApplicationAnswer}
            onChange={(e) => setLifeApplicationAnswer(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </Card>

      {/* 6. 微行動區 */}
      <Card title="🎯 微行動">
        <div className="bg-green-50 p-3 rounded mb-4 flex items-start justify-between">
          <p className="text-sm text-gray-700 flex-1">
            <span className="font-semibold">💡 行動建議：</span>
            {card.actionSuggestion}
          </p>
          <Button
            variant={isActionCollected ? 'secondary' : 'ghost'}
            size="sm"
            onClick={handleToggleActionCollection}
            className="ml-3 flex-shrink-0"
          >
            {isActionCollected ? '⭐' : '☆'}
          </Button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            今日我能做什麼？
          </label>
          <textarea
            placeholder="寫下你的行動計劃..."
            rows={2}
            value={myAction}
            onChange={(e) => setMyAction(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <Button
          variant="primary"
          className="w-full mt-4"
          onClick={handleSaveReflection}
        >
          💾 儲存今日記錄
        </Button>
      </Card>
    </div>
  );
}

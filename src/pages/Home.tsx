import { useEffect, useState } from 'react';
import { DailyCard } from '../types';

export default function Home() {
  const [card, setCard] = useState<DailyCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 載入今日資訊卡
    fetch('/Mindful-News/data/daily-card.json')
      .then(res => res.json())
      .then(data => {
        setCard(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load daily card:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">載入中...</p>
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">今日資訊卡</h1>

      {/* TODO: 將這些區塊拆分成獨立組件 */}

      {/* 1. 今日金句 */}
      <section className="card-mindful">
        <h2 className="section-title">📖 今日金句</h2>
        <blockquote className="text-quote mb-2">
          "{card.quote.english}"
        </blockquote>
        <p className="text-gray-600 italic">
          「{card.quote.chinese}」
        </p>
      </section>

      {/* 2. 精要摘要 */}
      <section className="card-mindful">
        <h2 className="section-title">✨ 精要摘要</h2>
        <ul className="space-y-2">
          {card.summary.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. 精選段落 */}
      <section className="card-mindful">
        <h2 className="section-title">📝 精選段落</h2>
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
      </section>

      {/* 4. 英文學習區 */}
      <section className="card-mindful">
        <h2 className="section-title">📚 英文學習</h2>

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
      </section>

      {/* 5. 反思區 */}
      <section className="card-mindful">
        <h2 className="section-title">💭 反思區</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            今日啟發
          </label>
          <input
            type="text"
            placeholder="這篇內容帶給我什麼啟發？"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </section>

      {/* 6. 微行動區 */}
      <section className="card-mindful">
        <h2 className="section-title">🎯 微行動</h2>

        <div className="bg-green-50 p-3 rounded mb-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">💡 行動建議：</span>
            {card.actionSuggestion}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            今日我能做什麼？
          </label>
          <textarea
            placeholder="寫下你的行動計劃..."
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button className="btn-primary w-full mt-4">
          💾 儲存今日記錄
        </button>
      </section>
    </div>
  );
}

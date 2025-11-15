import Card from '../components/Common/Card';

export default function Custom() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">自訂輸入</h1>

      <Card>
        <p className="text-gray-600 mb-4">
          此功能尚未開放，未來將支援：
        </p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>自訂網址輸入與儲存</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>手動建立資訊卡</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>匯入外部內容</span>
          </li>
        </ul>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-500">
            💡 提示：目前專注於完善核心功能，敬請期待！
          </p>
        </div>
      </Card>
    </div>
  );
}

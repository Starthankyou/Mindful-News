import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '今日', icon: '📰' },
    { path: '/journal', label: '日誌', icon: '📔' },
    { path: '/collections', label: '收藏', icon: '⭐' },
    { path: '/review', label: '回顧', icon: '🔄' },
    { path: '/custom', label: '自訂', icon: '✏️' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container-mindful">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Mindful News
          </Link>

          <div className="flex gap-2 md:gap-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-colors
                  ${location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                <span className="mr-1">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

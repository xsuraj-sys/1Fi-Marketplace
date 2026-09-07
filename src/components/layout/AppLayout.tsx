import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Home, User, Store } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AppLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/shop', icon: Store },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-surface-alt font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/shop" className="flex items-center gap-2">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">1Fi</span>
          </Link>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-8 pb-24">
        <Outlet />
      </main>

      {/* Mobile bottom nav - hidden on desktop for simplicity */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-slate-200 pb-safe sm:hidden">
        <div className="flex justify-around p-3">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path) && (item.path !== '/' || location.pathname === '/');
            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-xl transition-colors",
                  isActive ? "text-brand-600" : "text-slate-500 hover:bg-slate-50"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  );
}

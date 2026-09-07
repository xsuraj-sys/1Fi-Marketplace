import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin, Star } from 'lucide-react';
import { Card } from '../components/ui/Card';

export function Shop() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Shop</h1>
        <p className="text-slate-500 mt-2">Discover products and manage your purchases.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Top Brands - Blank state as per assignment */}
        <Card className="p-6 flex flex-col items-center justify-center text-center min-h-[200px] opacity-75">
          <div className="bg-slate-100 p-3 rounded-full mb-4 text-slate-400">
            <Star className="w-6 h-6" />
          </div>
          <h2 className="font-semibold text-slate-900">Top Brands</h2>
          <p className="text-sm text-slate-500 mt-2">Coming soon</p>
        </Card>

        {/* Nearby Stores - Blank state as per assignment */}
        <Card className="p-6 flex flex-col items-center justify-center text-center min-h-[200px] opacity-75">
          <div className="bg-slate-100 p-3 rounded-full mb-4 text-slate-400">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="font-semibold text-slate-900">Nearby Stores</h2>
          <p className="text-sm text-slate-500 mt-2">Coming soon</p>
        </Card>

        {/* 1Fi Marketplace - Implemented */}
        <Link to="/marketplace" className="block group">
          <Card className="p-6 flex flex-col items-center justify-center text-center min-h-[200px] border-brand-200 bg-brand-50/20 ring-1 ring-brand-100 transition-all hover:border-brand-400 hover:shadow-lg hover:-translate-y-1">
            <div className="bg-brand-100 p-4 rounded-full mb-4 text-brand-600 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-semibold text-slate-900 text-lg">1Fi Marketplace</h2>
            <p className="text-sm text-slate-600 mt-2 mb-4">Buy smartphones, laptops, and more with easy EMI options.</p>
            <div className="mt-auto">
              <span className="inline-flex items-center text-sm font-semibold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-lg group-hover:bg-brand-100 transition-colors">
                Enter Marketplace →
              </span>
            </div>
          </Card>
        </Link>
        
      </div>
    </div>
  );
}

import { Product } from '../../types';
import { getStartingPrice } from '../../utils/emi';
import { Card } from '../ui/Card';

import { ImageFallback } from '../ui/ImageFallback';
import { Link } from 'react-router-dom';
import { calculateMonthlyEMI } from '../../utils/emi';
import { mockEMIPlans } from '../../data/emiPlans';
import { Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const startingPrice = getStartingPrice(product.variants);
  const mainImage = product.variants[0]?.images[0];
  
  // Calculate lowest EMI (longest tenure)
  const maxTenurePlan = [...mockEMIPlans].sort((a, b) => b.tenureMonths - a.tenureMonths)[0];
  const startingEMI = maxTenurePlan ? calculateMonthlyEMI(startingPrice, maxTenurePlan.interestRate, maxTenurePlan.tenureMonths) : 0;
  const hasNoCostEMI = mockEMIPlans.some(p => p.interestRate === 0);

  return (
    <Link to={`/product/${product.id}`} className="block group h-full">
      <Card className="overflow-hidden transition-all hover:shadow-md hover:border-brand-300 h-full flex flex-col group-hover:-translate-y-1 duration-300">
        <div className="aspect-square bg-white p-6 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
          <ImageFallback 
            src={mainImage} 
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            fallbackIconSize={48}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow bg-surface-alt">
          <div className="flex justify-between items-start mb-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {product.brand}
            </p>
          </div>
          <h3 className="font-semibold text-slate-900 mb-4 line-clamp-2">{product.name}</h3>
          
          <div className="mt-auto pt-4 border-t border-slate-200/60 flex flex-col">
            <span className="text-2xl font-bold text-slate-900 leading-none mb-1.5">
              ₹{startingPrice.toLocaleString('en-IN')}
            </span>
            {startingEMI > 0 && (
              <span className="text-xs text-slate-500 font-medium mb-1">
                Starting from ₹{startingEMI.toLocaleString('en-IN')}/month
              </span>
            )}
            {hasNoCostEMI && (
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center">
                <Check className="w-3.5 h-3.5 mr-1" strokeWidth={3} /> No Cost EMI
              </span>
            )}
          </div>
          <div className="mt-4 pt-3 flex justify-center w-full">
            <span className="text-sm font-semibold text-brand-600 group-hover:text-brand-700 transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

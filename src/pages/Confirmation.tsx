import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ImageFallback } from '../components/ui/ImageFallback';
import { Product, Variant, EMIPlanDetails } from '../types';

interface ConfirmationState {
  product: Product;
  variant: Variant;
  plan: EMIPlanDetails;
}

export function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const state = location.state as ConfirmationState | null;

  if (!state) {
    return <Navigate to="/shop" replace />;
  }

  const { product, variant, plan } = state;

  return (
    <div className="max-w-md mx-auto py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">EMI Plan Selected</h1>
        <p className="text-slate-500 text-lg">Your selected plan is ready for the eligibility check.</p>
      </div>

      <Card className="p-6 mb-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white border border-slate-100 rounded-xl p-2 flex-shrink-0 overflow-hidden flex items-center justify-center">
            <ImageFallback src={variant.images[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" fallbackIconSize={32} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-lg">{product.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{variant.storage} • {variant.color}</p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Monthly EMI</span>
            <span className="font-semibold text-slate-900 text-lg">₹{plan.monthlyEMI.toLocaleString('en-IN')}/mo</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Tenure</span>
            <span className="font-medium text-slate-900">{plan.tenureMonths} months</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Interest</span>
            <span className="font-medium text-slate-900">
              {plan.interestRate === 0 ? '0%' : `${plan.interestRate}% p.a.`}
            </span>
          </div>
        </div>
      </Card>

      <Button fullWidth size="lg" onClick={() => navigate('/eligibility', { state })} className="group">
        Check Eligibility <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}

import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { ImageFallback } from '../components/ui/ImageFallback';

export function EligibilityCheck() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any; // Cast safely later if needed

  const [pan, setPan] = useState('');
  const [mobile, setMobile] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Basic validation: PAN should be 10 alphanumeric chars, mobile 10 digits
  const isValid = pan.length === 10 && mobile.replace(/\D/g, '').length === 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setStatus('loading');
    
    // Simulate network delay for verification
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (!state) {
    return <Navigate to="/shop" replace />;
  }

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Eligibility Confirmed!</h1>
          <p className="text-slate-500 text-lg">Great news! You are fully eligible for this EMI plan.</p>
        </div>

        <Card className="p-6 mb-8 text-center bg-brand-50/50 border-brand-100">
          <ShieldCheck className="w-8 h-8 text-brand-500 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-900 mb-1">Approval Complete</h3>
          <p className="text-sm text-slate-600 mb-6">Your profile has been successfully verified.</p>
          
          <div className="bg-white rounded-xl border border-slate-100 p-4 text-left">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-3">
              <div className="w-12 h-12 flex-shrink-0">
                <ImageFallback src={state.variant.images[0]} alt={state.product.name} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 leading-tight">{state.product.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{state.variant.storage} • {state.variant.color}</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Selected Plan</span>
              <span className="font-semibold text-slate-900">₹{state.plan.monthlyEMI.toLocaleString('en-IN')}/mo x {state.plan.tenureMonths}m</span>
            </div>
          </div>
        </Card>

        <Button fullWidth size="lg" onClick={() => navigate('/shop')} className="group">
          Continue <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        EMI Plan
      </button>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10 text-brand-500" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Check Eligibility</h1>
        <p className="text-slate-500 text-lg">Enter your details to verify your EMI approval.</p>
      </div>

      <Card className="p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="pan" className="block text-sm font-semibold text-slate-900 mb-2">
              PAN Number
            </label>
            <input
              type="text"
              id="pan"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              placeholder="ABCDE1234F"
              maxLength={10}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow uppercase font-medium placeholder:normal-case placeholder:font-normal placeholder:text-slate-400"
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-semibold text-slate-900 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="9876543210"
              maxLength={10}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow font-medium placeholder:font-normal placeholder:text-slate-400"
              disabled={status === 'loading'}
            />
          </div>

          <Button 
            type="submit" 
            fullWidth 
            size="lg" 
            disabled={!isValid || status === 'loading'}
            className="mt-8"
          >
            {status === 'loading' ? (
              <span className="flex items-center">
                <Spinner className="mr-2 h-5 w-5 text-white" />
                Verifying Details...
              </span>
            ) : (
              'Check Eligibility'
            )}
          </Button>
        </form>
      </Card>
      
      <p className="text-center text-xs text-slate-400">
        This is a mock assignment flow. No actual verification takes place.
      </p>
    </div>
  );
}

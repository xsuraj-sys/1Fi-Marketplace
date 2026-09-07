import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { ProductGallery } from '../components/marketplace/ProductGallery';
import { VariantSelector } from '../components/marketplace/VariantSelector';
import { EMIPlanCard } from '../components/marketplace/EMIPlanCard';
import { calculateMonthlyEMI, calculateTotalPayable } from '../utils/emi';
import { EMIPlanDetails, Variant } from '../types';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, emiPlans, loading, error } = useProduct(id);

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // Set initial variant when product loads
  useEffect(() => {
    if (product && product.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product, selectedVariant]);

  // Calculate dynamic EMI details based on selected variant price
  const enrichedEmiPlans: EMIPlanDetails[] = useMemo(() => {
    if (!selectedVariant || !emiPlans.length) return [];
    
    return emiPlans.map(plan => {
      const monthlyEMI = calculateMonthlyEMI(selectedVariant.price, plan.interestRate, plan.tenureMonths);
      const totalPayable = calculateTotalPayable(selectedVariant.price, monthlyEMI, plan.interestRate, plan.tenureMonths);
      const totalInterest = totalPayable - selectedVariant.price;
      
      return {
        ...plan,
        monthlyEMI,
        totalPayable,
        totalInterest
      };
    });
  }, [selectedVariant, emiPlans]);

  const selectedPlan = enrichedEmiPlans.find(p => p.id === selectedPlanId);

  const handleProceed = () => {
    if (selectedPlan && selectedVariant && product) {
      // In a real app, this might go to a context or store. For this assignment,
      // state via navigation is sufficient.
      navigate('/confirmation', {
        state: {
          product,
          variant: selectedVariant,
          plan: selectedPlan
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-16 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-6">{error || 'Product not found'}</h3>
        <Button variant="outline" onClick={() => navigate('/marketplace')}>
          Back to Marketplace
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <button 
        onClick={() => navigate('/marketplace')}
        className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Marketplace
      </button>

      <div className="max-w-2xl mx-auto">
        {/* Top: Images */}
        <div className="mb-10">
          <ProductGallery 
            images={selectedVariant?.images || []} 
            altText={product.name} 
          />
        </div>

        {/* Bottom: Details */}
        <div className="space-y-8">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-2">
              {product.brand}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
            <p className="text-slate-600">{product.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Select Variant</h3>
            <VariantSelector 
              variants={product.variants}
              selectedVariantId={selectedVariant?.id || ''}
              onSelect={setSelectedVariant}
            />
          </div>

          <div className="border-t border-slate-200 pt-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Product Price</p>
                <p className="text-3xl font-bold text-slate-900">
                  ₹{selectedVariant?.price.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <h3 className="font-semibold text-slate-900 mb-4">Select EMI Plan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {enrichedEmiPlans.map(plan => (
                <EMIPlanCard 
                  key={plan.id}
                  plan={plan}
                  selected={selectedPlanId === plan.id}
                  onSelect={(p) => setSelectedPlanId(p.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 sm:p-6 z-40 transform translate-y-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-sm text-slate-500 font-medium">Selected Plan</p>
            {selectedPlan ? (
              <p className="font-bold text-slate-900">
                ₹{selectedPlan.monthlyEMI.toLocaleString('en-IN')}/mo
                <span className="text-sm font-normal text-slate-500 ml-1">for {selectedPlan.tenureMonths} mos</span>
              </p>
            ) : (
              <p className="text-slate-900 font-medium">None selected</p>
            )}
          </div>
          <Button 
            className="w-full sm:w-auto px-10" 
            size="lg"
            disabled={!selectedPlan}
            onClick={handleProceed}
          >
            Proceed with EMI
          </Button>
        </div>
      </div>
    </div>
  );
}

import { EMIPlanDetails } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EMIPlanCardProps {
  plan: EMIPlanDetails;
  selected: boolean;
  onSelect: (plan: EMIPlanDetails) => void;
}

export function EMIPlanCard({ plan, selected, onSelect }: EMIPlanCardProps) {
  const isNoCost = plan.interestRate === 0;

  return (
    <Card 
      onClick={() => onSelect(plan)}
      className={cn(
        "cursor-pointer p-4 transition-all hover:border-brand-300 relative",
        selected ? "border-brand-500 ring-1 ring-brand-500 bg-brand-50/30" : "border-slate-200"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-slate-900">{plan.tenureMonths} Months</h4>
          <p className="text-sm text-slate-500">
            {isNoCost ? "No Cost EMI" : `${plan.interestRate}% p.a. interest`}
          </p>
        </div>
        {isNoCost && <Badge>No Cost</Badge>}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-slate-900">
            ₹{plan.monthlyEMI.toLocaleString('en-IN')}
            <span className="text-sm font-normal text-slate-500">/mo</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Total payable: ₹{plan.totalPayable.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {selected && (
        <div className="absolute top-4 right-4 text-brand-600 bg-brand-100 rounded-full p-0.5">
          <Check className="w-4 h-4" strokeWidth={3} />
        </div>
      )}
    </Card>
  );
}

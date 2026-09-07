export interface EMIPlan {
  id: string;
  tenureMonths: number;
  interestRate: number; // e.g., 0 for No Cost EMI, 15 for 15% p.a.
}

export interface Variant {
  id: string;
  storage: string;
  color: string;
  price: number;
  images: string[];
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: 'Smartphones' | 'Laptops' | 'Tablets';
  description: string;
  variants: Variant[];
}

export interface EMIPlanDetails extends EMIPlan {
  monthlyEMI: number;
  totalInterest: number;
  totalPayable: number;
}

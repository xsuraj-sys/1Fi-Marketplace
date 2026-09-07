import { EMIPlan } from '../types';

export const mockEMIPlans: EMIPlan[] = [
  { id: 'emi_3m', tenureMonths: 3, interestRate: 0 },
  { id: 'emi_6m', tenureMonths: 6, interestRate: 0 },
  { id: 'emi_9m', tenureMonths: 9, interestRate: 15 },
  { id: 'emi_12m', tenureMonths: 12, interestRate: 15 },
  { id: 'emi_24m', tenureMonths: 24, interestRate: 15 },
];

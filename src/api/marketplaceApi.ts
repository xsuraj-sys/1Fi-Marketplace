import { Product, EMIPlan } from '../types';
import { mockProducts } from '../data/products';
import { mockEMIPlans } from '../data/emiPlans';

// Simulates network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const marketplaceApi = {
  getProducts: async (): Promise<Product[]> => {
    await delay(800);
    
    // Explicit failure path for testing error states (approx 10% chance to fail)
    if (Math.random() < 0.1) {
      throw new Error('Failed to fetch products. Please try again.');
    }
    
    return mockProducts;
  },
  
  getProductById: async (id: string): Promise<Product> => {
    await delay(600);
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  getEMIPlans: async (): Promise<EMIPlan[]> => {
    await delay(500);
    return mockEMIPlans;
  }
};

import { useState, useEffect } from 'react';
import { Product, EMIPlan } from '../types';
import { marketplaceApi } from '../api/marketplaceApi';

export function useProduct(productId: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [emiPlans, setEmiPlans] = useState<EMIPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!productId) {
      setError('Product not found');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const [productData, emiData] = await Promise.all([
        marketplaceApi.getProductById(productId),
        marketplaceApi.getEMIPlans()
      ]);
      setProduct(productData);
      setEmiPlans(emiData);
    } catch (err: any) {
      setError(err.message || 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  return { product, emiPlans, loading, error, retry: fetchData };
}

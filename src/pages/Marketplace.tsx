import { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/marketplace/ProductCard';
import { SearchBar } from '../components/marketplace/SearchBar';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export function Marketplace() {
  const { products, loading, error, retry } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Smartphones', 'Laptops', 'Tablets'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Link 
        to="/shop"
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Shop
      </Link>

      <header className="mb-2">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">1Fi Marketplace</h1>
        <p className="text-slate-500">Shop your favorite gadgets on EMI.</p>
      </header>

      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {loading && (
        <div className="py-20 flex flex-col items-center justify-center">
          <Spinner />
          <p className="text-slate-500 mt-4">Loading products...</p>
        </div>
      )}

      {error && !loading && (
        <div className="py-16 px-4 bg-red-50 rounded-2xl border border-red-100 flex flex-col items-center text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Unable to load products</h3>
          <p className="text-slate-600 mb-6 max-w-sm">{error}</p>
          <Button variant="outline" onClick={retry}>Retry</Button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500">
              No products found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

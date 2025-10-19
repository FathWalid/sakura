import { useState } from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [filter, setFilter] = useState<string>('All');

  const types = ['All', ...Array.from(new Set(products.map(p => p.type)))];

  const filteredProducts = filter === 'All'
    ? products
    : products.filter(p => p.type === filter);

  return (
    <div className="py-16">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {types.map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2 rounded-full uppercase text-sm tracking-wider transition-all duration-300 ${
              filter === type
                ? 'bg-gold text-teal-dark shadow-lg scale-105'
                : 'bg-teal-dark/10 text-teal-dark hover:bg-teal-dark/20'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { SweetCard } from '@/components/SweetCard';
import { FilterBar, FilterOptions } from '@/components/FilterBar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { mockSweets, Sweet } from '@/data/mockSweets';
import { CreditCard } from 'lucide-react';

const Purchase = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    priceRange: 'all',
    sortBy: 'name'
  });

  // Load sweets on component mount
  useEffect(() => {
    setSweets(mockSweets);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = [...new Set(sweets.map(sweet => sweet.category))];
    return cats;
  }, [sweets]);

  // Filter and sort sweets
  const filteredSweets = useMemo(() => {
    let filtered = sweets.filter(sweet => {
      const matchesSearch = sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           sweet.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filters.category === 'all' || sweet.category === filters.category;
      
      let matchesPrice = true;
      if (filters.priceRange !== 'all') {
        switch (filters.priceRange) {
          case 'under-200':
            matchesPrice = sweet.price < 200;
            break;
          case '200-300':
            matchesPrice = sweet.price >= 200 && sweet.price <= 300;
            break;
          case '300-400':
            matchesPrice = sweet.price >= 300 && sweet.price <= 400;
            break;
          case 'over-400':
            matchesPrice = sweet.price > 400;
            break;
        }
      }
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort sweets
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return filtered;
  }, [sweets, searchQuery, filters]);

  const handleAuthClick = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        cartCount={0}
        onAuthClick={handleAuthClick}
        onCartClick={() => navigate('/cart')}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CreditCard className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Direct Purchase</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Select a sweet to purchase directly without adding to cart
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Choose Your Sweet</h2>
            <p className="text-muted-foreground">
              Click "Purchase" on any sweet to go directly to checkout
            </p>
          </div>
        </div>

        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={() => setFilters({ category: 'all', priceRange: 'all', sortBy: 'name' })}
          categories={categories}
          totalResults={filteredSweets.length}
        />

        {filteredSweets.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No sweets found</h2>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({ category: 'all', priceRange: 'all', sortBy: 'name' });
              }}
              className="text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Purchase;

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

export interface FilterOptions {
  category: string;
  priceRange: string;
  sortBy: string;
}

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  categories: string[];
  totalResults: number;
}

export function FilterBar({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  categories,
  totalResults 
}: FilterBarProps) {
  const hasActiveFilters = filters.category !== 'all' || filters.priceRange !== 'all' || filters.sortBy !== 'name';

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-200', label: '₹0 - ₹200' },
    { value: '200-300', label: '₹200 - ₹300' },
    { value: '300-400', label: '₹300 - ₹400' },
    { value: '400+', label: '₹400+' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'price', label: 'Price Low-High' },
    { value: 'price-desc', label: 'Price High-Low' },
    { value: 'stock', label: 'Stock High-Low' },
  ];

  return (
    <div className="bg-card border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Filters</span>
          <Badge variant="secondary">{totalResults} results</Badge>
        </div>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="min-w-[160px]">
          <Select 
            value={filters.category} 
            onValueChange={(value) => onFilterChange({ ...filters, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[160px]">
          <Select 
            value={filters.priceRange} 
            onValueChange={(value) => onFilterChange({ ...filters, priceRange: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[160px]">
          <Select 
            value={filters.sortBy} 
            onValueChange={(value) => onFilterChange({ ...filters, sortBy: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.category !== 'all' && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => onFilterChange({ ...filters, category: 'all' })}>
              Category: {filters.category} <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
          {filters.priceRange !== 'all' && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => onFilterChange({ ...filters, priceRange: 'all' })}>
              Price: {priceRanges.find(r => r.value === filters.priceRange)?.label} <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
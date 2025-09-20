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
    <div className="bg-card border rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm sm:text-base">Filters</span>
          <Badge variant="secondary" className="text-xs sm:text-sm">{totalResults} results</Badge>
        </div>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground h-8 sm:h-9"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Clear All</span>
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
        <div className="w-full sm:min-w-[160px] sm:flex-1">
          <Select 
            value={filters.category} 
            onValueChange={(value) => onFilterChange({ ...filters, category: value })}
          >
            <SelectTrigger className="h-9 sm:h-10">
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

        <div className="w-full sm:min-w-[160px] sm:flex-1">
          <Select 
            value={filters.priceRange} 
            onValueChange={(value) => onFilterChange({ ...filters, priceRange: value })}
          >
            <SelectTrigger className="h-9 sm:h-10">
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

        <div className="w-full sm:min-w-[160px] sm:flex-1">
          <Select 
            value={filters.sortBy} 
            onValueChange={(value) => onFilterChange({ ...filters, sortBy: value })}
          >
            <SelectTrigger className="h-9 sm:h-10">
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
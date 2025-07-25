import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedIndustry: string;
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="px-8 py-4 bg-white border-b border-gray-200">
      <div className="flex space-x-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-purple-100 text-purple-700 border border-purple-200'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {category.name}
            {category.count !== undefined && (
              <span className="ml-1 text-xs opacity-75">({category.count})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
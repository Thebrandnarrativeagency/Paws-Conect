
import React from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { PlusIcon } from '@heroicons/react/24/outline';

const ShopView: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Banner */}
      <div className="relative h-32 rounded-3xl bg-[#F4ACB7] overflow-hidden p-6 flex items-center">
        <div className="relative z-10 max-w-[60%]">
          <h2 className="text-white font-bold text-lg leading-tight">Summer Sale!</h2>
          <p className="text-white/90 text-xs">Up to 40% off on all grooming kits.</p>
        </div>
        <img 
          src="https://picsum.photos/seed/shopbanner/300" 
          alt="Sale" 
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80"
        />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Food', color: 'bg-orange-100' },
          { label: 'Toys', color: 'bg-blue-100' },
          { label: 'Health', color: 'bg-green-100' },
          { label: 'Beds', color: 'bg-purple-100' },
        ].map((cat) => (
          <button key={cat.label} className="flex flex-col items-center gap-2">
            <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center`}>
               <span className="text-xl">🐾</span>
            </div>
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 relative group">
            <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gray-50">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute bottom-2 right-2 p-1.5 bg-[#78B2A4] text-white rounded-lg shadow-md">
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
            <h4 className="font-bold text-gray-800 text-xs truncate mb-1">{product.name}</h4>
            <div className="flex items-center justify-between">
              <span className="text-[#D4A373] font-bold text-sm">${product.price.toFixed(2)}</span>
              <span className="text-[8px] px-1.5 py-0.5 bg-gray-100 rounded-full text-gray-500 font-bold uppercase tracking-wider">{product.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopView;

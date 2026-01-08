
import React from 'react';
import { MOCK_ARTICLES } from '../constants';
import { BookmarkIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useApp } from '../App';
import { SubscriptionTier } from '../types';

const EducationView: React.FC = () => {
  const { user, openUpgrade } = useApp();

  return (
    <div className="p-4 space-y-6">
      {/* Search */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search pet care guides..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-[#78B2A4] focus:border-[#78B2A4] text-sm"
        />
        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Featured Article */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Featured Guide</h3>
        <div className="relative group overflow-hidden rounded-3xl shadow-sm border border-gray-100 bg-white">
          <img 
            src={MOCK_ARTICLES[0].image} 
            alt={MOCK_ARTICLES[0].title}
            className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="p-5">
            <span className="text-[10px] font-bold text-[#78B2A4] uppercase tracking-widest">{MOCK_ARTICLES[0].category}</span>
            <h4 className="text-lg font-bold text-gray-800 mt-1 mb-2 leading-tight">{MOCK_ARTICLES[0].title}</h4>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{MOCK_ARTICLES[0].excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">By {MOCK_ARTICLES[0].author}</span>
              <button className="text-gray-400 hover:text-[#78B2A4]">
                <BookmarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Latest Reads</h3>
        <div className="space-y-4">
          {MOCK_ARTICLES.concat(MOCK_ARTICLES).map((article, idx) => {
            const isLocked = article.isPremium && user.tier === SubscriptionTier.FREE;
            return (
              <div 
                key={`${article.id}-${idx}`} 
                onClick={() => isLocked && openUpgrade()}
                className={`bg-white rounded-2xl p-3 flex gap-4 shadow-sm border border-gray-100 hover:border-[#78B2A4]/30 transition-all cursor-pointer relative ${
                  isLocked ? 'grayscale-[0.5]' : ''
                }`}
              >
                <div className="relative">
                  <img 
                    src={article.image} 
                    className="w-24 h-24 rounded-xl object-cover" 
                    alt={article.title}
                  />
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                      <LockClosedIcon className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-bold text-[#D4A373] uppercase tracking-widest">{article.category}</span>
                    {article.isPremium && (
                      <span className="text-[8px] font-black bg-[#D4A373]/10 text-[#D4A373] px-1.5 py-0.5 rounded-full uppercase">Plus</span>
                    )}
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight">{article.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-2">5 min read • {article.author}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EducationView;

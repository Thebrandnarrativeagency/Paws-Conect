
import React from 'react';
import { MOCK_POSTS } from '../constants';
import { HeartIcon, ChatBubbleOvalLeftIcon, ShareIcon } from '@heroicons/react/24/outline';

const FeedView: React.FC = () => {
  return (
    <div className="space-y-4 p-4">
      {/* Create Post Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-3">
        <img 
          src="https://picsum.photos/seed/user/100" 
          alt="Avatar" 
          className="w-10 h-10 rounded-2xl border border-gray-200"
        />
        <button className="flex-1 text-left px-5 py-2.5 bg-gray-50 rounded-2xl text-gray-400 text-sm font-medium hover:bg-gray-100 transition-colors">
          Any dog or cat moments?
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
        {['All', 'Dogs', 'Cats'].map((cat) => (
          <button 
            key={cat}
            className={`px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
              cat === 'All' ? 'bg-[#78B2A4] text-white shadow-lg shadow-[#78B2A4]/20' : 'bg-white text-gray-400 border border-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts */}
      {MOCK_POSTS.map((post) => (
        <div key={post.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 flex items-center gap-3">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-10 h-10 rounded-2xl object-cover"
            />
            <div>
              <h3 className="font-bold text-gray-800 text-sm">{post.author.name}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{post.timestamp}</p>
            </div>
          </div>
          
          <div className="px-5 pb-4">
            <p className="text-gray-700 text-sm leading-relaxed font-medium">{post.content}</p>
          </div>

          {post.image && (
            <div className="px-2">
              <img 
                src={post.image} 
                alt="Post media" 
                className="w-full aspect-[4/3] object-cover rounded-[1.5rem]"
              />
            </div>
          )}

          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors">
                <HeartIcon className="w-5 h-5" />
                <span className="text-xs font-black">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-[#78B2A4] transition-colors">
                <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                <span className="text-xs font-black">{post.comments}</span>
              </button>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedView;

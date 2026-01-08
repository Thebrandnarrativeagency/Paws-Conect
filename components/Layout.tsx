
import React from 'react';
import { ViewType } from '../types';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  ChatBubbleLeftRightIcon, 
  BookOpenIcon, 
  CalendarIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid, 
  ShoppingBagIcon as ShoppingBagIconSolid, 
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid, 
  BookOpenIcon as BookOpenIconSolid, 
  CalendarIcon as CalendarIconSolid, 
  UserCircleIcon as UserCircleIconSolid 
} from '@heroicons/react/24/solid';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, title }) => {
  const navItems = [
    { id: 'feed', icon: HomeIcon, iconSolid: HomeIconSolid, label: 'Feed' },
    { id: 'shop', icon: ShoppingBagIcon, iconSolid: ShoppingBagIconSolid, label: 'Shop' },
    { id: 'drpaws', icon: ChatBubbleLeftRightIcon, iconSolid: ChatBubbleLeftRightIconSolid, label: 'Dr. Paws' },
    { id: 'education', icon: BookOpenIcon, iconSolid: BookOpenIconSolid, label: 'Library' },
    { id: 'events', icon: CalendarIcon, iconSolid: CalendarIconSolid, label: 'Events' },
    { id: 'profile', icon: UserCircleIcon, iconSolid: UserCircleIconSolid, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative border-x border-gray-100">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#78B2A4] rounded-full flex items-center justify-center">
             <span className="text-white text-xl font-bold">P</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h1>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#FDFBF7] pb-24 hide-scrollbar">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 flex justify-between items-center z-20 pb-safe">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          const Icon = isActive ? item.iconSolid : item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewType)}
              className="flex flex-col items-center gap-1 group w-14"
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-[#78B2A4]/10' : ''}`}>
                <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-[#78B2A4]' : 'text-gray-400 group-hover:text-gray-600'}`} />
              </div>
              <span className={`text-[10px] font-semibold transition-colors ${isActive ? 'text-[#78B2A4]' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;

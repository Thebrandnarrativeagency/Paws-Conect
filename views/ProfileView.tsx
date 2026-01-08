
import React from 'react';
import { PencilSquareIcon, HeartIcon, CreditCardIcon, QuestionMarkCircleIcon, SparklesIcon, BriefcaseIcon, UserIcon } from '@heroicons/react/24/outline';
import { useApp } from '../App';
import { SubscriptionTier, UserType } from '../types';
import { MOCK_USERS } from '../constants';

const ProfileView: React.FC = () => {
  const { user, setUser, openUpgrade } = useApp();

  const toggleRole = () => {
    const nextRole = user.type === UserType.OWNER ? UserType.PROVIDER : UserType.OWNER;
    const mockUser = MOCK_USERS.find(u => u.type === nextRole);
    if (mockUser) {
      setUser({ ...mockUser, isSubscriptionActive: nextRole === UserType.OWNER ? true : false });
    }
  };

  return (
    <div className="p-4 pb-20">
      {/* Role Toggle for Demo */}
      <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
        <button 
          onClick={toggleRole}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${user.type === UserType.OWNER ? 'bg-white shadow-sm text-[#78B2A4]' : 'text-gray-400'}`}
        >
          <UserIcon className="w-4 h-4" />
          Owner
        </button>
        <button 
          onClick={toggleRole}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${user.type === UserType.PROVIDER ? 'bg-white shadow-sm text-[#D4A373]' : 'text-gray-400'}`}
        >
          <BriefcaseIcon className="w-4 h-4" />
          Provider
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center py-4">
        <div className="relative mb-4">
          <div className={`p-1 rounded-[2.5rem] ${user.tier !== SubscriptionTier.FREE ? 'bg-gradient-to-tr from-[#78B2A4] to-[#D4A373]' : 'bg-gray-100'}`}>
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-28 h-28 rounded-[2.2rem] object-cover border-4 border-white shadow-xl"
            />
          </div>
          {user.tier !== SubscriptionTier.FREE && (
            <div className={`absolute -top-1 -right-1 p-2 rounded-full shadow-lg border-2 border-white ${user.type === UserType.PROVIDER ? 'bg-[#D4A373]' : 'bg-[#78B2A4]'}`}>
              <SparklesIcon className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <h2 className="text-2xl font-black text-gray-800">{user.name}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-black uppercase tracking-widest ${user.type === UserType.PROVIDER ? 'text-[#D4A373]' : 'text-[#78B2A4]'}`}>
            {user.type === UserType.PROVIDER ? 'Service Provider' : 'Pet Owner'}
          </span>
          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
          <span className={`text-[10px] font-black uppercase tracking-widest ${user.isSubscriptionActive ? 'text-green-500' : 'text-red-400'}`}>
            {user.isSubscriptionActive ? 'Account Active' : 'Action Required'}
          </span>
        </div>
      </div>

      {/* Subscription Card */}
      {!user.isSubscriptionActive && user.type === UserType.PROVIDER && (
        <div className="mt-8 bg-red-50 border-2 border-red-100 p-6 rounded-[2.5rem] animate-pulse">
          <h4 className="text-red-600 font-black text-xs uppercase tracking-widest mb-2">Subscription Expired</h4>
          <p className="text-red-500/80 text-[11px] leading-relaxed mb-4 font-medium">
            Your provider membership is currently inactive. Pay the monthly service fee to resume your listings and community access.
          </p>
          <button 
            onClick={openUpgrade}
            className="w-full py-3 bg-red-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-200"
          >
            Pay Service Fee ($29.99/mo)
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 my-8">
        {[
          { label: 'Followers', value: '1.2k' },
          { label: 'Impact', value: user.type === UserType.PROVIDER ? '98%' : 'High' },
          { label: 'Activity', value: 'Recent' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-[1.5rem] p-4 text-center shadow-sm border border-gray-100">
            <div className="text-base font-black text-gray-800">{stat.value}</div>
            <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Settings List */}
      <div className="space-y-3">
        {[
          { icon: HeartIcon, label: user.type === UserType.PROVIDER ? 'Business Details' : 'My Pets' },
          { icon: CreditCardIcon, label: 'Subscription Billing' },
          { icon: QuestionMarkCircleIcon, label: 'Help & Support' },
        ].map((item) => (
          <button key={item.label} className="w-full flex items-center justify-between p-5 bg-white rounded-[1.5rem] shadow-sm border border-gray-50 hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
                <item.icon className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-sm font-bold text-gray-700">{item.label}</span>
            </div>
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      <button className="w-full mt-10 p-5 text-gray-400 font-black text-[10px] uppercase tracking-widest bg-gray-50 rounded-[1.5rem] hover:bg-gray-100 transition-colors">
        Sign Out of Paws Connect
      </button>
    </div>
  );
};

export default ProfileView;

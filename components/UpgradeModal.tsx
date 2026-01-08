
import React from 'react';
import { PRICING_PLANS } from '../constants';
import { CheckCircleIcon, XMarkIcon, SparklesIcon, BriefcaseIcon } from '@heroicons/react/24/solid';
import { UserType } from '../types';

interface UpgradeModalProps {
  isOpen: boolean;
  userType: UserType;
  onClose: () => void;
  onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, userType, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  const plans = userType === UserType.OWNER ? PRICING_PLANS.owner : PRICING_PLANS.provider;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-white w-full max-w-sm rounded-[3rem] overflow-hidden shadow-2xl relative">
        <div className="p-8 pt-12">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-50"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <div className={`inline-flex p-4 rounded-3xl mb-4 ${userType === UserType.PROVIDER ? 'bg-[#D4A373]/10' : 'bg-[#78B2A4]/10'}`}>
              {userType === UserType.PROVIDER ? (
                <BriefcaseIcon className="w-8 h-8 text-[#D4A373]" />
              ) : (
                <SparklesIcon className="w-8 h-8 text-[#78B2A4]" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {userType === UserType.PROVIDER ? 'Business Membership' : 'Paws Plus Upgrade'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {userType === UserType.PROVIDER ? 'Reach thousands of dog & cat owners' : 'The best for your dog & cat'}
            </p>
          </div>

          <div className="space-y-4">
            {plans.map((plan: any) => (
              <div 
                key={plan.id}
                className={`relative p-6 rounded-3xl border-2 transition-all ${
                  plan.popular 
                    ? userType === UserType.PROVIDER ? 'border-[#D4A373] bg-[#D4A373]/5' : 'border-[#78B2A4] bg-[#78B2A4]/5'
                    : 'border-gray-100 bg-white opacity-60'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-gray-900">${plan.price}</span>
                      {plan.period && <span className="text-xs text-gray-400 font-bold uppercase">{plan.period}</span>}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                      <CheckCircleIcon className={`w-4 h-4 ${userType === UserType.PROVIDER ? 'text-[#D4A373]' : 'text-[#78B2A4]'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={onUpgrade}
                  className={`w-full py-4 rounded-2xl font-black text-sm transition-all shadow-lg ${
                    plan.popular 
                      ? userType === UserType.PROVIDER 
                        ? 'bg-[#D4A373] text-white shadow-[#D4A373]/30' 
                        : 'bg-[#78B2A4] text-white shadow-[#78B2A4]/30'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
          
          <p className="text-[10px] text-gray-400 text-center mt-6 font-bold uppercase tracking-widest">
            Dogs & Cats Owners Community
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;

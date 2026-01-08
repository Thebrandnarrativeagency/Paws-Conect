
import React, { useState, useMemo, createContext, useContext } from 'react';
import { ViewType, SubscriptionTier, User, UserType } from './types';
import { MOCK_USERS } from './constants';
import Layout from './components/Layout';
import FeedView from './views/FeedView';
import ShopView from './views/ShopView';
import DrPawsView from './views/DrPawsView';
import EducationView from './views/EducationView';
import EventsView from './views/EventsView';
import ProfileView from './views/ProfileView';
import UpgradeModal from './components/UpgradeModal';
import { LockClosedIcon } from '@heroicons/react/24/solid';

interface AppContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  openUpgrade: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('feed');
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  const viewTitle = useMemo(() => {
    switch (activeView) {
      case 'feed': return 'Dog & Cat Feed';
      case 'shop': return 'Paws Market';
      case 'drpaws': return 'Ask Dr. Paws';
      case 'education': return 'Pet Library';
      case 'events': return 'Local Events';
      case 'profile': return 'My Profile';
      default: return 'Paws Connect';
    }
  }, [activeView]);

  const handleUpgrade = () => {
    setCurrentUser(prev => ({ 
      ...prev, 
      tier: prev.type === UserType.PROVIDER ? SubscriptionTier.PROVIDER_PRO : SubscriptionTier.PREMIUM,
      isSubscriptionActive: true
    }));
    setIsUpgradeOpen(false);
  };

  const isBlocked = currentUser.type === UserType.PROVIDER && !currentUser.isSubscriptionActive && activeView !== 'profile';

  const renderView = () => {
    if (isBlocked) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white/50 backdrop-blur-sm">
          <div className="w-20 h-20 bg-[#D4A373]/10 rounded-full flex items-center justify-center mb-6">
            <LockClosedIcon className="w-10 h-10 text-[#D4A373]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Membership Required</h2>
          <p className="text-gray-500 mt-2 mb-8 text-sm leading-relaxed">
            Service providers need an active monthly membership to list services, access Dr. Paws, and interact with the community.
          </p>
          <button 
            onClick={() => setIsUpgradeOpen(true)}
            className="w-full py-4 bg-[#D4A373] text-white rounded-2xl font-bold shadow-xl shadow-[#D4A373]/30"
          >
            Activate My Account
          </button>
        </div>
      );
    }

    switch (activeView) {
      case 'feed': return <FeedView />;
      case 'shop': return <ShopView />;
      case 'drpaws': return <DrPawsView />;
      case 'education': return <EducationView />;
      case 'events': return <EventsView />;
      case 'profile': return <ProfileView />;
      default: return <FeedView />;
    }
  };

  return (
    <AppContext.Provider value={{ 
      user: currentUser, 
      setUser: setCurrentUser, 
      openUpgrade: () => setIsUpgradeOpen(true) 
    }}>
      <Layout 
        activeView={activeView} 
        setActiveView={setActiveView} 
        title={viewTitle}
      >
        {renderView()}
      </Layout>
      <UpgradeModal 
        isOpen={isUpgradeOpen} 
        userType={currentUser.type}
        onClose={() => setIsUpgradeOpen(false)}
        onUpgrade={handleUpgrade}
      />
    </AppContext.Provider>
  );
};

export default App;

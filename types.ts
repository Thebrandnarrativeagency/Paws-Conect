
export enum UserType {
  OWNER = 'owner',
  PROVIDER = 'provider'
}

export enum SubscriptionTier {
  FREE = 'free',
  PREMIUM = 'premium',
  PROVIDER_PRO = 'provider_pro'
}

export interface User {
  id: string;
  name: string;
  type: UserType;
  tier: SubscriptionTier;
  avatar: string;
  bio: string;
  petType?: 'dog' | 'cat' | 'both';
  services?: string[];
  rating?: number;
  reviewsCount?: number;
  isSubscriptionActive: boolean;
  usageCount: {
    drPawsQueries: number;
  };
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  category: 'dogs' | 'cats' | 'general';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  premiumOnly?: boolean;
}

export interface EducationArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  image: string;
  author: string;
  isPremium?: boolean;
}

export interface PetEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  attendees: number;
  type: 'meetup' | 'workshop' | 'adoption' | 'online';
  isPremium?: boolean;
}

export type ViewType = 'feed' | 'shop' | 'drpaws' | 'education' | 'events' | 'profile';

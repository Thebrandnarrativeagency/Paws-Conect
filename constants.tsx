
import { User, UserType, SubscriptionTier, Post, Product, EducationArticle, PetEvent } from './types';

export const COLORS = {
  primary: '#78B2A4', 
  secondary: '#D4A373', 
  accent: '#F4ACB7', 
  background: '#FAEDCD', 
  blue: '#A8DADC', 
};

export const PRICING_PLANS = {
  owner: [
    {
      id: 'free',
      name: 'Owner Basic',
      price: 0,
      features: [
        'Community access',
        '3 Dr. Paws queries/day',
        'Standard shop access'
      ],
      cta: 'Current Plan'
    },
    {
      id: 'premium',
      name: 'Paws Plus',
      price: 9.99,
      period: '/mo',
      features: [
        'Unlimited Dr. Paws',
        'Premium guides',
        '10% Shop discount'
      ],
      cta: 'Upgrade Now',
      popular: true
    }
  ],
  provider: [
    {
      id: 'provider_pro',
      name: 'Provider Pro',
      price: 29.99,
      period: '/mo',
      features: [
        'List your services',
        'Verify your credentials',
        'Direct chat with owners',
        'Analytics dashboard',
        'Unlimited AI tools'
      ],
      cta: 'Activate Membership',
      popular: true
    }
  ]
};

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    type: UserType.OWNER,
    tier: SubscriptionTier.FREE,
    petType: 'dog',
    avatar: 'https://picsum.photos/seed/sarah/200',
    bio: 'Proud mom of a Golden Retriever. 🐾 Dogs only!',
    isSubscriptionActive: true,
    usageCount: { drPawsQueries: 0 }
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    type: UserType.PROVIDER,
    tier: SubscriptionTier.FREE, // Starts inactive
    avatar: 'https://picsum.photos/seed/james/200',
    bio: 'Veterinarian specializing in dogs and cats.',
    services: ['General Checkup', 'Vaccination'],
    rating: 4.9,
    reviewsCount: 128,
    isSubscriptionActive: false,
    usageCount: { drPawsQueries: 0 }
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: MOCK_USERS[0],
    content: 'Our daily walk at the dog park! 🐕‍🦺 #GoldenLife',
    image: 'https://picsum.photos/seed/dogwalk/600/400',
    likes: 42,
    comments: 5,
    timestamp: '2h ago',
    category: 'dogs'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'sh1', name: 'Premium Dog Kibble', price: 45.99, category: 'Dog Food', image: 'https://picsum.photos/seed/dogfood/300', description: 'Grain-free for dogs.' },
  { id: 'sh2', name: 'Catnip Mice Trio', price: 12.50, category: 'Cat Toys', image: 'https://picsum.photos/seed/cattoy/300', description: 'Fun for cats.' },
];

export const MOCK_ARTICLES: EducationArticle[] = [
  {
    id: 'a1',
    title: 'Cat Body Language 101',
    excerpt: 'Understand your feline friend.',
    category: 'Cats',
    content: '...',
    image: 'https://picsum.photos/seed/catbehavior/400/250',
    author: 'Dr. James Wilson'
  }
];

export const MOCK_EVENTS: PetEvent[] = [
  {
    id: 'e1',
    title: 'Golden Retriever Meetup',
    date: 'Oct 15, 2:00 PM',
    location: 'Dog Park',
    description: 'Goldens only!',
    image: 'https://picsum.photos/seed/dogevent/500/300',
    attendees: 34,
    type: 'meetup'
  }
];

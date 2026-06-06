export interface Pet {
  id: string;
  pet_name: string;
  pet_image_url: string;
  breed: string;
  age: string;
  status: 'playing' | 'walking' | 'resting' | 'active';
  owner_name: string;
  latitude: number;
  longitude: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  pets: Pet[];
}

export interface SiteConfig {
  logoUrl: string;
  heroTitle: string;
  heroDescription: string;
  googlePlayLink: string;
  appStoreLink: string;
  updatedAt?: any;
}

export interface Application {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  message?: string;
  category?: string;
  region?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}

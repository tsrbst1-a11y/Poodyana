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

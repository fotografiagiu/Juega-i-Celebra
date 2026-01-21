
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface PriceTier {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

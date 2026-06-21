export interface Product {
  id: string;
  name: string;
  category: "Wear & Go" | "HD Lace Frontal" | "Bob Perruques" | "Tissages & Closures" | "Perruques Colorées";
  texture: "Straight" | "Body Wave" | "Deep Wave" | "Kinky Curly";
  basePrice: number;
  image: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeColor?: string;
  description: string;
  lengths: number[]; // in inches
  densities: string[]; // e.g. "150%", "180%", "250%"
  colors: string[];
  salesVolume: number;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
  flashSaleDiscount?: number; // e.g. 30 for 30% off
  isNewArrival?: boolean;
  stockLeft?: number;
}

export interface CartItem {
  product: Product;
  selectedLength: number;
  selectedDensity: string;
  selectedColor: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  address: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
  status: "Confirmed" | "Shipped" | "Delivered";
}

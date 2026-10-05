export type Category = 'all' | 'running' | 'trail' | 'court' | 'racing';

export interface ProductColorway {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export interface ProductSpec {
  weight: string; // e.g. "185g (Men's US 9)"
  heelDrop: string; // e.g. "8mm"
  stackHeight: string; // e.g. "38mm / 30mm"
  midsole: string;
  outsole: string;
  surface: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  heroImage: string;
  gallery: string[];
  colorways: ProductColorway[];
  availableSizes: { size: number; inStock: boolean }[];
  description: string;
  highlights: string[];
  specs: ProductSpec;
  fitNote: string;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique item id: product.id + size + colorway.id
  product: Product;
  selectedSize: number;
  sizeUnit: 'US' | 'EU' | 'UK';
  selectedColorway: ProductColorway;
  quantity: number;
}

export type Currency = 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // against USD
}

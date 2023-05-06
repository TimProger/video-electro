export interface IProduct {
  id: number;
  name: string;
  image: string;
  discount?: number | null;
  article: string,
  is_new?: boolean;
  is_hit?: boolean;
  availability: number;
  price: number;
}

export interface IBasketProduct {
  id: number;
  name: string;
  image: string;
  discount?: number | null;
  article: string,
  is_new?: boolean;
  is_hit?: boolean;
  availability: number;
  price: number;
  buy_now: boolean;
}

export interface IFavProduct {
  id: number;
  more: number
  product_id: number;
}
export interface IProduct {
  id: number;
  name: string;
  image: string;
  discount?: number | null;
  is_new?: boolean;
  is_hit?: boolean;
  product_more: IProductMore[]
}

export interface IProductMore {
  id: number;
  availability: number;
  price: number;
}
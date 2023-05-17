export interface IProductShort {
  id: number;
  is_new: boolean;
  is_hit: boolean;
  show: boolean;
  discount: number | null;
  delete: boolean;
  Dimension: {
    Depth: string;
    Width: string;
    Height: string;
    DimensionUnit: string;
  }
  EAN: string;
  GuaranteePeriod: string;
  image: string;
  ItemID: number;
  ItemsPerUnit: number;
  Multiplicity: number;
  ParentProdCode: string;
  ParentProdGroup: string;
  ProductCode: string;
  ProductDescription: string;
  ProductGroup: string;
  ProductName: string;
  SenderPrdCode: number;
  UOM: string;
  VendorProdNum: string;
  Weight: number;
  brand: number;
  Series: number;
  AnalitCat: string;
  QTY: number;
  SumQTY: number;
  Price2: number;
  RetailPrice: number;
  RetailCurrency: string;
  CustPrice: number;
  MRC: number;
}

export interface IProduct {
  product: {
    id: number;
    is_new: boolean;
    is_hit: boolean;
    show: boolean;
    discount: number;
    delete: boolean;
    Dimension: {
      Depth: string;
      Width: string;
      Height: string;
      DimensionUnit: string;
    }
    EAN: string;
    GuaranteePeriod: string;
    image: string;
    ItemID: number;
    ItemsPerUnit: number;
    Multiplicity: number;
    ParentProdCode: string;
    ParentProdGroup: string;
    ProductCode: string;
    ProductDescription: string;
    ProductGroup: string;
    ProductName: string;
    SenderPrdCode: number;
    UOM: string;
    VendorProdNum: string;
    Weight: number;
    brand: number;
    Series: number;
    AnalitCat: string;
    QTY: number;
    SumQTY: number;
    Price2: number;
    RetailPrice: number;
    RetailCurrency: string;
    CustPrice: number;
    MRC: number;
  },
  country: {
    data: string | string[];
  },
  certificate_infos: {
    data: string
  }[],
  related_prods: {
    id: number;
    data: string;
    relatedProd_product: number;
  }[];
  catalog_brochure: {
    data: string
  };
  rs_catalog: {
    id: number;
    Level2ID: number;
    Level2Name: string;
    Level3ID: number;
    Level3Name: string;
    Level4ID: number;
    Level4Name: string;
    product_catalog: number;
  },
  images: {
    id: number;
    image: null;
    imageURL: string;
    show: boolean;
    image_product: number
  }[];
  videos: {
    videoURL: string;
  }[];
  feature: {
    id: number;
    featureETIMDetails_product_id: number;
    featureETIMDetails_id: number;
    featureValue: string;
    featureCode: string;
    featureUom: null;
    featureName: string;
  }[]
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

export interface IFilter {
  feature_id: number;
  data: string[];
}

export interface ICatalogQuery {
  sort: string;
  Level2?: string;
  Level3?: string;
  feature?: string
}
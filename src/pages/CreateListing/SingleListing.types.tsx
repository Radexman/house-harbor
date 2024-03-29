export type SingleListingType = {
  type: 'rent' | 'sale';
  userRef: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  location: string;
  offer: boolean;
  regularPrice: number;
  discountedPrice: number;
  imagesUrls: object;
  latitude: number;
  longitude: number;
};

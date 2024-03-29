export type SingleListingType = {
  type: 'rent' | 'sale';
  userRef: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  address: string;
  offer: boolean;
  regularPrice: number;
  discountedPrice: number;
  imagesUrls: FileList;
  latitude: number;
  longitude: number;
};

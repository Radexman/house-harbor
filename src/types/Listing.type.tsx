import { GeoPoint, Timestamp } from 'firebase/firestore';

export type ListingType = {
  data: {
    bathrooms: number;
    bedrooms: number;
    discountedPrice: number;
    furnished: boolean;
    geolocation: GeoPoint;
    imagesUrls: string[];
    location: string;
    name: string;
    offer: boolean;
    parking: boolean;
    regularPrice: number;
    timestamp: Timestamp;
    type: string;
    userRef: string;
  };
  id: string;
};

// xaURP89qDLW1TUDzU0cvifdYgWs1;

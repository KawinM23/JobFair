export interface BookingItem {
  bookingDate: Date;
  user: string;
  company: string;
  createdAt: Date;
}

export interface BookingInterface {
  _id: string;
  bookingDate: Date;
  user: {
    _id: string;
    name: string;
    email: string;
    tel: string;
  };
  company: {
    name: string;
    address: string;
    tel: string;
    id: string;
  };
  createdAt: Date;
  __v: 0;
}

export interface BookingItem {
  bookingDate: Date;
  user: string;
  company: string;
  createdAt: Date;
}

export interface BookingInterface {
  _id: string;
  bookingDate: string;
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
  createdAt: string;
  __v: 0;
}

export interface AddBookingInterface {
  bookingDate: Date;
  createdAt: Date;
}

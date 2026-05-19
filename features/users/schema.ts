export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: Company;
  address: Address;
}

export interface UserTableData {
  userId: number;
  name: string;
  email: string;
  website: string;
  post: number;
  todo: {
    pending: number;
    completed: number;
  };
}

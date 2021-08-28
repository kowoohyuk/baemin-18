export interface User {
  _id?: string;
  email: string;
  nickname: string;
  pwd: string;
  birth: string;
  phone: string;
  ageUp: 'T' | 'F';
  privateInfo: 'T' | 'F';
  smsReceive: 'T' | 'F';
  token?: string;
}

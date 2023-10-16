export interface IUser {
  save(): unknown;
  _id: string;
  username: string;
  email: string;
  pass1: string | boolean;
  pass2: string;
  deposit: number;
  deposit2: number;
  deposit3: number;
  img: string;
  admin: boolean;
  newPassToken: string;
  userToken: string;
  maticBalance: number;
  walletAddress: string;
  status: boolean;
  lockAmount1: number;
  lockDays1: number;
  lockAmount2: number;
  lockDays2: number;
  lockAmount3: number;
  lockDays3: number;
}

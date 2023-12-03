export interface McoinAccount {
  publicId?: string;
  userId?: string;
  balance?: string;
  isDeleted?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Profile {
  publicId?: string;
  name?: string;
  email?: string;
  avatar?: string;
  gender?: string;
  phone?: string;
  introduction?: string;
  displayName?: string;
  mcoinAccount?: McoinAccount;
  createdAt?: string;
  updatedAt?: string;
}
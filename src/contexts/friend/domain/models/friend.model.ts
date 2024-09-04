export interface FriendModel {
  id: string;
  fullName: string;
  friendname: string;
  email?: string;
  phoneNum: string;
  createdAt?: Date;
  profilePicture: string;
  activationStatus: boolean;
}

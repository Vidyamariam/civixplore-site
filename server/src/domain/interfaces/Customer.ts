import {Types} from "mongoose";

export interface Customer{
    userId: Types.ObjectId; // Reference to the User model
    fullName: string;
    phoneNumber: string;
    email: string; 
    location: string;
    additionalDetails: string;
    profilePicture?: string; // Optional field for the profile image
  }
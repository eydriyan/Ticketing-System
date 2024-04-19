// user.model.ts
export class User { 
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
  
    // It's good practice to have a constructor
    constructor(data?: Partial<User>) {
      // Assign properties from the provided data, if any
      Object.assign(this, data); 
    }
  }
  
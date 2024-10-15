export class User{
    userId: number;
    firstName: string;
    lastName: string;
    roleName: string;
    emailId: string;
    userName: string;
    roleId: number;
  
    constructor(userId: number, firstName: string,lastName: string, roleName: string,emailId: string,userName: string,roleId: number) {
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.roleName = roleName;
      this.emailId = emailId;
      this.userName = userName;
      this.roleId = roleId;
    }

    // getUserInfo(): string {
    //     return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}`;
    //   }
}
export class Role{
    roleId: number;
    roleName: string;
    isActive: boolean;
   
  
    constructor(roleId: number, roleName: string,isActive: boolean) {
      this.roleId = roleId;
      this.roleName= roleName;
      this.isActive = isActive;
      
    }

    // getUserInfo(): string {
    //     return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}`;
    //   }
}
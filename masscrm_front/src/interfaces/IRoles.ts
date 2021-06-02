export interface IRole {
  text?: string;
  description?: string;
}

export interface IRoles {
  [key: string]: IRole;
}

export interface IRolesDisplay {
  [key: string]: string;
}

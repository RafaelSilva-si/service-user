export interface ValidateUserModel {
  email: string;
  password: string;
}

export interface ValidateUser {
  validate(data: ValidateUserModel): Promise<string>;
}

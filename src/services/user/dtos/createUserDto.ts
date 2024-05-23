export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  phone: string;
  CPF: string;

  constructor(data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    CPF: string;
  }) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.confirmPassword = data.confirmPassword;
    this.phone = data.phone;
    this.CPF = data.CPF;
  }
}

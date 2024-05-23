export class UpdateUserDto {
  email: string;
  name: string;
  phone: string;
  CPF: string;

  constructor(data: {
    name: string;
    email: string;
    phone: string;
    CPF: string;
  }) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.CPF = data.CPF;
  }
}

export interface PrimitiveUser {
  id?: string;
  name: string;
  email?: string;
  username?: string;
  password?: string;
  phone: number;
  country: string;
  address: string;
  city: string;
  role?: string;
  birthdate: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserDto {
  name: string;
  email: string;
  username: string;
  password: string;
  phone: number;
  country: string;
  address: string;
  city: string;
  birthdate: string;
}

export class User {
  constructor(public readonly attributes: PrimitiveUser) {}

  static create(dto: UserDto): User {
    return new User(dto);
  }

  toValue(): Partial<PrimitiveUser> {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      username: this.attributes.username,
      email: this.attributes.email,
      phone: this.attributes.phone,
      country: this.attributes.country,
      address: this.attributes.address,
      city: this.attributes.city,
      role: this.attributes.role,
      birthdate: this.attributes.birthdate,
      createdAt: this.attributes.createdAt,
      updatedAt: this.attributes.updatedAt,
    };
  }
}

export class UpdateUser {
  constructor(public readonly attributes: Partial<PrimitiveUser>) {}

  static create(dto: Partial<PrimitiveUser>): UpdateUser {
    return new UpdateUser(dto);
  }
  toValue(): Partial<PrimitiveUser> {
    return this.attributes;
  }
}

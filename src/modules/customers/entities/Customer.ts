import City from "@modules/cities/entities/City";

export default class Customer {
  public _id?: string;
  public name: string;
  public gender?: 'M' | 'F' | '';
  public birthDate?: Date;
  public city?: City;

  constructor(name = '', gender: ('M' | 'F' | '') = '', birthDate: Date | undefined = undefined, city: City | undefined = undefined) {
    this.name = name;
    this.gender = gender;
    this.birthDate = birthDate;
    this.city = city;
  }

  public static getAge(birthDate: Date) {
    const today = new Date;

    return Math.floor((today.getTime() - birthDate.getTime()) / (24 * 60 * 60 * 1000 * 365));
  }
}
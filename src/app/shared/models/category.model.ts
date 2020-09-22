import { ICategory } from '../interfaces/category.interface';

export class Category implements ICategory {
  constructor(
    public id: number,
    public nameEN: string,
    public description: string,
    public img: string
  ) {}
}

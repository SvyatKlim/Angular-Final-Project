import { IProduct } from '../interfaces/product.interface';
export class Product implements IProduct {
  constructor(
    public dataID: string,
    public category: string,
    public name: string,
    public vegetarian: boolean,
    public ingridients: any,
    public weight: string,
    public price: number,
    public description: string,
    public img: string,
    public count: number = 1
  ) {}
}

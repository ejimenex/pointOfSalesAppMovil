import { IngredientPerServices } from './ingredientPerService.model';

export class Service {
  name: string;
  description: string;
  price: number;
  cost: number;
  ingredientPerService: IngredientPerServices[];
  email: string;
  otherCost:number
  createdDate:string
}

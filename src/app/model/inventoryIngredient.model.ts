import { ingredient } from "./ingredient.model"
import { InventoryIngredientDetail } from "./inventoryIngredientDetail.model";

export class InventoryIngredient{
    
    name:string;
        
    email:string;
    
    ingredient:ingredient;   
    
    stock:number;
    quantity:number
    lastDateModified:string;
    commentary:string;
    detail:InventoryIngredientDetail[]
}
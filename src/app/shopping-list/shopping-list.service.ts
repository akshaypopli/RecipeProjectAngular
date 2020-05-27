import { Injectable } from "@angular/core";
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable()

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredients[]>();
    ingredientEdit = new Subject<number>();

    private ingredients: Ingredients[] = [
        new Ingredients('Apples', 5),
        new Ingredients('Grapes', 10)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredientByIndex(index){
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredients){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredients[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, editedIngredient: Ingredients){
        this.ingredients[index] = editedIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngregient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
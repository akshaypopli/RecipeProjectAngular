import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject, Subscription } from 'rxjs';

@Injectable()

export class RecipeService{

    private recipes: Recipe[]=[];

    constructor(private shoppinglistService: ShoppingListService){}
    recipeChanged = new Subject<Recipe[]>();
    selectedRecipe = new Subject<Recipe>();

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(index: number){
        return this.recipes[index];
    }

    // addIngredientsToShoppingList(ingredients: Ingredients[]){
    //     this.shoppinglistService.addIngredients(ingredients);
    // }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, editedRecipe: Recipe){
        this.recipes[index] = editedRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService{
    private recipes: Recipe[]= [
        new Recipe(
                    'testRecipe', 
                    'testDesc', 
                    'https://www.wbcsd.org/var/site/storage/images/media/images/fresh_pa/80809-2-eng-GB/FRESH_PA_i1140.jpg',
                    [
                        new Ingredients('macarroni', 1),
                        new Ingredients('mixed vegetable shredded', 2),
                    ]),
        new Recipe(
                    'testRecipe123', 
                   'testDesc', 
                   'https://www.wbcsd.org/var/site/storage/images/media/images/fresh_pa/80809-2-eng-GB/FRESH_PA_i1140.jpg',
                   [
                        new Ingredients('Brocoli', 2),
                        new Ingredients('meat', 1),
                    ])
                   
    ];

    constructor(private shoppinglistService: ShoppingListService){}

    selectedRecipe = new Subject<Recipe>();

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(index: number){
        return this.recipes[index];
    }

    // addIngredientsToShoppingList(ingredients: Ingredients[]){
    //     this.shoppinglistService.addIngredients(ingredients);
    // }
}
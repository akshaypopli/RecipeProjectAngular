import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject, Subscription } from 'rxjs';

@Injectable()

export class RecipeService{

    private recipes: Recipe[]= [
        new Recipe(
                    'Burger', 
                    'Tasty Spicy Burger', 
                    'https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary.jpg',
                    [
                        new Ingredients('Ham', 1),
                        new Ingredients('Onion', 1),
                        new Ingredients('Lettuce', 3),
                        new Ingredients('Hot Sauce', 1),
                    ]),
        new Recipe(
                    'Ramen', 
                   'Hot Garlic Ramen - super spicy', 
                   'https://assets.bonappetit.com/photos/5e3c7a3c866b940008106763/16:9/w_1280,c_limit/HLY-Veggie-Ramen-16x9.jpg',
                   [
                        new Ingredients('Ramen', 1),
                        new Ingredients('Vegetables Shredded', 1),
                        new Ingredients('Eggs', 1),
                        new Ingredients('Chilli Flakes', 1),
                        new Ingredients('Spring onion', 1),
                    ]),
        new Recipe(
                    'Spaghetti', 
                    'Tasty Spaghetti', 
                    'https://www.starfrit.com/media/contentmanager/content/cache/1070x1070//recipes/e1_r1_spaghetti.jpg',
                    [
                        new Ingredients('Spaghetti', 1),
                        new Ingredients('Tomatoes', 1),
                        new Ingredients('Chilli Flakes', 1),
                        new Ingredients('Cheese', 1),
                    ])
                   
    ];

    constructor(private shoppinglistService: ShoppingListService){}
    recipeChanged = new Subject<Recipe[]>();
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
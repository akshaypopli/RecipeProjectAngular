import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private shoppinglistService: ShoppingListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params)=>{
      this.id = +param['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
    });
  }

  toShoppingList(){
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.shoppinglistService.addIngredients(this.recipe.ingredients);
  }

}

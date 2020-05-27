import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredients[];
  private ingredientschanged: Subscription;
  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.ingredientschanged = this.shoppinglistService.ingredientsChanged.subscribe((item: Ingredients[])=>{
      this.ingredients = item;
    })
  }

  ngOnDestroy(){
    this.ingredientschanged.unsubscribe();
  }

  oneditIngredient(index){
    this.shoppinglistService.ingredientEdit.next(index); 
  }
}

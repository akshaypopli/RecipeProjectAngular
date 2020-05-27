import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredients } from "../../shared/ingredients.model";
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  edit: Subscription;
  editMode:boolean = false;
  editIngredientIndex: number;
  editedItem: Ingredients;
  @ViewChild('f') shoppingForm: NgForm;

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit() {
    this.edit = this.shoppinglistService.ingredientEdit.subscribe((index: number)=>{
      this.editIngredientIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppinglistService.getIngredientByIndex(index);
      this.shoppingForm.setValue({
        name: this.editedItem.name,
        quantity: this.editedItem.quantity
      })
    });
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const ingredient = new Ingredients(value.name, value.quantity);
    if(this.editMode){
      this.shoppinglistService.updateIngredient(this.editIngredientIndex, ingredient);
    }else{
      this.shoppinglistService.addIngredient(ingredient);
    }
    this.editMode = false;
    form.reset();
  }

  onReset(){
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppinglistService.deleteIngregient(this.editIngredientIndex);
    this.onReset();
  }

  ngOnDestroy(){
    this.edit.unsubscribe();
  }



}

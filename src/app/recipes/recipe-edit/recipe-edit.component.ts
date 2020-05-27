import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeToEdit: Recipe;
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { 
    this.route.params.subscribe((param: Params)=>{
      this.id = +param['id'];
      this.editMode = param['id'] != null;
      console.log('this.editMode : ' + this.editMode);
      // if(this.editMode){
      //   this.recipeToEdit = this.recipeService.getRecipeById(this.id);
      // }
      
    });
  }

  ngOnInit(): void {
  }

}

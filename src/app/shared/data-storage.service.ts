import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { NgxSpinnerService } from "ngx-spinner"; 
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, 
        private spinner: NgxSpinnerService,
        private authService: AuthService){}

    saveData(){
        this.spinner.show();
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-project-11235.firebaseio.com/recipes.json', recipes).subscribe(response=>{
            console.log(response);
            this.spinner.hide();
        });
    }

    fetchData(){
        return this.http.get<Recipe[]>('https://ng-course-project-11235.firebaseio.com/recipes.json')
            .pipe(map(recipes=>{
            return recipes.map(recipe=>{
                return {
                    ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
        }),
        tap(recipes=>{
            this.recipeService.setRecipes(recipes);
        })
    )}
}
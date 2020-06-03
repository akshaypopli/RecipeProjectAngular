import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeNotSelectedComponent } from './recipes/recipe-not-selected/recipe-not-selected.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';


const appRoutes: Routes = [
    {path:'', redirectTo: '/recipes', pathMatch: 'full'},
    {path:'recipes',
     component: RecipesComponent, 
     canActivate: [AuthGuard], 
     children:[
        {path:'', component: RecipeNotSelectedComponent},
        {path:'new-recipe', component: RecipeEditComponent},
        {path:':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
        {path:':id/edit-recipe', component: RecipeEditComponent, resolve: [RecipeResolverService]},
    ]},
    {path:'shopping-list', component: ShoppingListComponent},
    {path:'auth', component: AuthComponent},
    {path:'**', redirectTo: '/recipes'},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}
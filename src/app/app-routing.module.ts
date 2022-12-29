import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {PostComponent} from "./post/post.component";
import {PostsComponent} from "./posts/posts.component";
import {AboutExtraComponent} from "./about-extra/about-extra.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {AuthGuard} from "./auth.guard";
import {PostResolver} from "./post.resolver";

//http://localhost:4200/

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'about',canActivateChild:[AuthGuard],component:AboutComponent,children:[
      {path : 'extra',component:AboutExtraComponent}
    ]},
  {path:'posts',component:PostsComponent,canActivate:[AuthGuard]},
  {path:'posts/:id',component:PostComponent,resolve : {post:PostResolver}},
  {path:'error',component:ErrorPageComponent},
  {path:'**',redirectTo:'/error'}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule {

}

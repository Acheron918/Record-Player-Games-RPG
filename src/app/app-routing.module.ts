import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LfgComponent } from './pages/lfg/lfg.component';
import { PostsComponent } from './pages/posts/posts.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import {LoginComponent} from './component/login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: '**', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'reviews', component: ReviewsComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'lfg', component: LfgComponent},
  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
<<<<<<< HEAD
import { LfgComponent } from './pages/LFG/lfg.component';
=======
import { PostsComponent } from './pages/posts/posts.component';
>>>>>>> 103a58e3ceb7dc3d92254f0def24d84ae8c6878b
import { RankingComponent } from './pages/ranking/ranking.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: '**', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'reviews', component: ReviewsComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'lfg', component: LfgComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LfgComponent } from './pages/LFG/lfg.component';
import { PostsComponent } from './pages/posts/posts.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AngularFireAuthGuard,redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { map } from 'rxjs';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home', 
    component: HomeComponent,
  },
  {
    path: 'login', 
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToHome}
  },
  {
    path: 'register', 
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToHome}
  },
  {
    path: 'posts',
     component: PostsComponent,
     canActivate: [AngularFireAuthGuard],
     data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'reviews',
     component: ReviewsComponent,
     canActivate: [AngularFireAuthGuard],
     data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'ranking',
     component: RankingComponent,
     canActivate: [AngularFireAuthGuard],
     data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
  {
    path: 'lfg',
     component: LfgComponent,
     canActivate: [AngularFireAuthGuard],
     data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
   // {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


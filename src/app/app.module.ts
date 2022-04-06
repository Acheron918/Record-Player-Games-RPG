import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeroComponent } from './component/hero/hero.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { PostComponent } from './component/post/post.component';
import { PostsComponent } from './pages/posts/posts.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { GroupComponent } from './component/group/group.component';
import { LfgComponent } from './pages/LFG/lfg.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HotToastModule } from '@ngneat/hot-toast';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp'
import { GameRankingComponent } from './component/game-ranking/game-ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ReviewsComponent,
    FooterComponent,
    HeroComponent,
    RankingComponent,
    PostComponent,
    PostsComponent,
    LoginComponent,
    GroupComponent,
    LfgComponent,
    RegisterComponent,
    GameRankingComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FontAwesomeModule,
    HotToastModule.forRoot(),
    AngularFirestoreModule
    ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    FirebaseTSApp.init(environment.firebase);
  }
 }
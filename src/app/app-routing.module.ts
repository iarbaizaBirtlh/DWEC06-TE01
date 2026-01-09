import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { GameListComponent } from './components/game-list.component';
import { GameDetailComponent } from './pages/games/game-detail.component';
import { MyLibraryComponent } from './pages/library/my-library.component';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { AuthGuard } from './guard/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'games', component: GameListComponent},
  {path: 'games/:id', component: GameDetailComponent},
  {path: 'library', component: MyLibraryComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

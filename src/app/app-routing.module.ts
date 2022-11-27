import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './util/authentication.guard';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { MusicasComponent } from './musicas/musicas.component';
import { BandasComponent } from './bandas/bandas.component';
import { ManutMusicasComponent } from './manut-musicas/manut-musicas.component';
import { ManutBandasComponent } from './manut-bandas/manut-bandas.component';
import { PlaylistComponent } from './playlist/playlist.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'bandas', component: BandasComponent},
  { path: 'musicas', component: MusicasComponent},
  { path: 'manutBandas', component: ManutBandasComponent},
  { path: 'manutBandas/:bandId', component: ManutBandasComponent },
  { path: 'manutMusicas', component: ManutMusicasComponent},
  { path: 'manutMusicas/:musicId', component: ManutMusicasComponent },
  { path: 'playlist', component: PlaylistComponent},
  { path: 'playlist/:playlistId', component: PlaylistComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NotAuthorizedComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard],
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BandasComponent } from './bandas/bandas.component';
import { MusicasComponent } from './musicas/musicas.component';
import { ManutBandasComponent } from './manut-bandas/manut-bandas.component';
import { ManutMusicasComponent } from './manut-musicas/manut-musicas.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { ModalComponent } from './modal/modal.component';
import { PlaylistPanelComponent } from './playlist-panel/playlist-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    BandasComponent,
    MusicasComponent,
    ManutBandasComponent,
    ManutMusicasComponent,
    NotAuthorizedComponent,
    ModalComponent,
    PlaylistPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

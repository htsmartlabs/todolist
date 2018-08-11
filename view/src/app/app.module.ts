import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ChildLoginComponent } from './child-login/child-login.component';
import { ParentLoginComponent } from './parent-login/parent-login.component';
import { ParentHomeComponent } from './parent-home/parent-home.component';
import { ChildHomeComponent } from './child-home/child-home.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ChildLoginComponent,
    ParentLoginComponent,
    ParentHomeComponent,
    ChildHomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

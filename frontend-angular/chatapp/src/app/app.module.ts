import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MessagingComponent } from './homepage/messaging/messaging.component';
import { VideoChatComponent } from './video-chat/video-chat.component';
import { OktaAuthModule,OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { LoginComponent } from './login/login.component';
import myOktaConfig from '../config'
import { Router } from '@angular/router';
import { SearchComponent } from './homepage/search/search.component';
import {HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS} from '@angular/common/http';
import { UsersListComponent } from './homepage/users-list/users-list.component';
import { UsersGroupsComponent } from './homepage/users-groups/users-groups.component'
import { HttpService } from './shared/http.service';
import { HttpAuthenticationInterceptor } from './http.interceptor';
import { GroupResolver } from './services/groupId-resolver.service';
import { GroupService } from './services/group.service';
import { LogoutComponent } from './logout/logout.component';

const oktaAuth = new OktaAuth({
  issuer:   myOktaConfig.oidc.issuer,
  clientId: myOktaConfig.oidc.clientId
  ,redirectUri: myOktaConfig.oidc.redirectUri
})

@NgModule({
  declarations: [
    AppComponent,
    MessagingComponent,
    VideoChatComponent,
    HomepageComponent,
    LoginComponent,
    SearchComponent,
    UsersListComponent,
    UsersGroupsComponent,
    LogoutComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    OktaAuthModule,
    HttpClientModule,
  ],
  providers: [
    { 
      provide: OKTA_CONFIG, 
      useFactory:()=>{
        oktaAuth;
        return{
          oktaAuth,
          onAuthRequired:(oktaAuth:OktaAuth,injector:Injector)=>{
            const router = injector.get(Router);
            router.navigate(['/login']);
          }
        }
      },
    },{provide:HTTP_INTERCEPTORS,useClass:HttpAuthenticationInterceptor,multi:true},HttpService,GroupResolver,GroupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { MessagingComponent } from "./messaging/messaging.component";
import { VideoChatComponent } from "./video-chat/video-chat.component";
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from "./login/login.component";
const routes: Routes =[
    {path:'login',component:LoginComponent},
    {
        path:'',component:HomepageComponent,canActivate:[OktaAuthGuard], children:[ 
            {path:'messaging',component:MessagingComponent},
            {path:'videoCall',component:VideoChatComponent}
        ],
    },
    {path:'login/callback',component: OktaCallbackComponent}
]
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}
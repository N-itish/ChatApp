import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { MessagingComponent } from "./homepage/messaging/messaging.component";
import { VideoChatComponent } from "./homepage/video-chat/video-chat.component";
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from "./login/login.component";
import { GroupResolver } from "./services/groupId-resolver.service";
const routes: Routes =[
    {path:'login',component:LoginComponent},
    {
        path:'',component:HomepageComponent,canActivate:[OktaAuthGuard] ,children:[ 
            {path:'messaging',component:MessagingComponent},
        ],
    },
    {path:'login/callback',component: OktaCallbackComponent},
    {path:'videoCall/:id',component:VideoChatComponent,resolve:{group: GroupResolver}}
]
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}
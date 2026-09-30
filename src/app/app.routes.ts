import { Routes } from '@angular/router';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/register/register/register.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';

export const routes: Routes = [
    {path:'' , redirectTo:'login' , pathMatch:'full'},
    {path:'' , component: AuthlayoutComponent , children:[
        {path:'login' , component : LoginComponent , title : 'Route-Social | login'},
        {path:'register' , component : RegisterComponent , title : 'Route-Social | register'},
    ]},
    {path:'' , component : MainlayoutComponent , children:[
        {path:'feeds' , loadComponent: ()=> import('./features/feeds/feeds/feeds.component').then( (c)=>c.FeedsComponent ) , title : 'Route-Social | Feeds' },
        {path:'profile' , loadComponent: ()=> import('./features/profile/profile/profile.component').then( (c)=>c.ProfileComponent ) , title : 'Route-Social | Profile' },
        {path:'notification' , loadComponent: ()=> import('./features/notifications/notifications/notifications.component').then( (c)=>c.NotificationsComponent ) , title : 'Notifications' }
    ]},
    {path:'**' ,loadComponent: ()=> import('./features/wildCard/wild-card/wild-card.component').then( (c)=>c.WildCardComponent ), title : 'Route-Social | Error 404'  }
];

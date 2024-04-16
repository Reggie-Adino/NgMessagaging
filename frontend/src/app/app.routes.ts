import { Routes } from '@angular/router';
import { MasterComponent } from './shared/layouts/master/master.component';
import { Component } from '@angular/core';
import { MessagesComponent } from './pages/messages/messages.component';
import { combineLatest } from 'rxjs';
import { ComposeComponent } from './pages/compose/compose.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: '', component: MasterComponent, 
    children:[
        {path:'', component:LoginComponent, canActivate:[guestGuard]},
        {path:'messages', component: MessagesComponent, canActivate:[authGuard]}, 
        {path:'compose', component:ComposeComponent},
        {path:'register', component:RegisterComponent}        
    ]}
];

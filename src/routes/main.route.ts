import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import {AppComponent} from './app/app-compponent'
import { AppComponent } from '@components/../app/app.component';

const mainRoutes: Routes = [
    
    {path : "", component: AppComponent}
]

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(mainRoutes);

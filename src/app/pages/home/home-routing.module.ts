import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'myLists',
        children: [
          {
            path: '',
            loadChildren: () => import('../mylists/mylists.module').then(m => m.MylistsPageModule)
          }
        ]
      },
      {
        path: 'sharedLists',
        children: [
          {
            path: '',
            loadChildren: () => import('../shared-with-me/shared-with-me.module').then(m => m.SharedWithMePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/myLists',
        pathMatch: 'full'
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }

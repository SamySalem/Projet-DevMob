import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedWithMePage } from './shared-with-me.page';

const routes: Routes = [
  {
    path: '',
    component: SharedWithMePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedWithMePageRoutingModule {}

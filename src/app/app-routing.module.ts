import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrLoginComponent } from './components/qr-login/qr-login.component';
import { InformListComponent } from './inform-list/inform-list.component';

const routes: Routes = [
{ path: '', component: QrLoginComponent},
{ path: 'inform-list', component: InformListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [InformListComponent]

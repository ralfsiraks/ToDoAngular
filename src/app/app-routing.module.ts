import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './ToDo/header/header.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./ToDo/todo.module').then((m) => m.TodoModule),
  },
  { path: '', component: HeaderComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

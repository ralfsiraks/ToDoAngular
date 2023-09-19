import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoModule } from './ToDo/todo.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, TodoModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ShellInputComponent } from './components/shell-input/shell-input.component';
import { ShellExecutionService } from './services/shell-execution.service';

@NgModule({
  declarations: [
    AppComponent,
    ShellInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ShellExecutionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

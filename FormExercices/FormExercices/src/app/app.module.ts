import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { Routes, RouterModule } from '@angular/router';

/*specifing the routes for our application*/
const routes: Routes = [
  { path: 'reativeform', component: ReactiveFormComponent },
];

@NgModule({
  declarations: [AppComponent, ReactiveFormComponent],
  imports: [
    BrowserModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

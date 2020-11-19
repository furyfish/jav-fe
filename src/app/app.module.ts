import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {VerbListComponent} from './components/verb-list/verb-list.component';
import {VerbDetailsComponent} from './components/verb-details/verb-details.component';
import {VerbAddComponent} from './components/verb-add/verb-add.component';

import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: 'verb-list', pathMatch: 'full' },
  { path: 'verb-list', component: VerbListComponent },
  { path: 'verb/:id', component: VerbDetailsComponent },
  { path: 'verb-add', component: VerbAddComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    VerbListComponent,
    VerbDetailsComponent,
    VerbAddComponent
  ],
  imports: [
    [RouterModule.forRoot(routes)],
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

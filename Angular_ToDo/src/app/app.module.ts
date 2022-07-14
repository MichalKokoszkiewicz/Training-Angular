import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TodosComponent } from './components/todos/todos.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { HelloComponent } from './components/hello/hello.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TaskFormComponent } from './components/task-form/task-form.component';
import { DefaultValuePipe } from './pipes/default-value.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { Error404Component } from './components/error404/error404.component';

const routes: Routes = [
  { path: 'todos', component: TodosComponent },
  { path: 'hello', component: HelloComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'task-form', children: [
      { path: '', component: TaskFormComponent },
      { path: ':id', component: TaskFormComponent },
  ]},
  { path: 'stats', loadChildren: () =>
    import('./modules/stats/stats.module').then((m) => m.StatsModule)
  },
  // { path: 'task-form', component: TaskFormComponent },
  // { path: 'task-form/:id', component: TaskFormComponent },
  { path: '', pathMatch: 'full', redirectTo: 'todos' },
  { path: '**', component: Error404Component },
];

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent,
    TodosComponent,
    HelloComponent,
    AddTaskComponent,
    TaskFormComponent,
    DefaultValuePipe,
    HighlightDirective,
    Error404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

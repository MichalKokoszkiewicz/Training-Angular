import {Injectable} from '@angular/core';
import {TaskListModel} from "../models/task-list-model";
import {TaskModel} from "../models/task-model";
import {TaskTypeEnum} from "../models/task-type-enum";
import {catchError, map, Observable, of, Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly URL = 'http://localhost:3000/tasks';

  private data$ = new Subject<TaskListModel[]>();

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<TaskListModel[]> {
    return this.data$.asObservable();
  }

  loadData() {
    this.httpClient
      .get<TaskModel[]>(this.URL)
      .pipe(
        tap((data) => console.log(data)),
        catchError((err) => {
          console.error(err);
          return of([]);
        })
      )
      .subscribe((data) => {
        const todoList = new TaskListModel({
          title: 'TODO',
          tasks: data
            .filter((task: TaskModel) => task.type === TaskTypeEnum.TODO)
            .map((task) => new TaskModel(task)),
          type: TaskTypeEnum.TODO
        });
        const inProgressList = new TaskListModel({
          title: 'IN PROGRESS',
          tasks: data
            .filter((task: TaskModel) => task.type === TaskTypeEnum.IN_PROGRESS)
            .map((task) => new TaskModel(task)),
          type: TaskTypeEnum.IN_PROGRESS
        });
        const doneList = new TaskListModel({
          title: 'DONE',
          tasks: data
            .filter((task: TaskModel) => task.type === TaskTypeEnum.DONE)
            .map((task) => new TaskModel(task)),
          type: TaskTypeEnum.DONE
        });
        this.data$.next([
          todoList,
          inProgressList,
          doneList,
        ])
      });
  }

  addTask(task: TaskModel): Observable<boolean> {
    task.id = uuidv4();
    return this.httpClient
      .post(this.URL, task)
      .pipe(
        map(() => true),
        catchError((err) => {
          console.error(err);
          return of(false);
        }),
      );
  }

  getTask(id: string): Observable<TaskModel | null> {
    return this.httpClient
      .get(this.URL + '/' + id)
      .pipe(
        map((task) => new TaskModel(task)),
        catchError((err) => {
          console.error(err);
          return of(null);
        }),
      );
  }

  editTask(task: TaskModel): Observable<boolean> {
    return this.httpClient
      .put(this.URL + '/' + task.id, task)
      .pipe(
        map(() => true),
        catchError((err) => {
          console.error(err);
          return of(false);
        }),
      );
  }

  deleteTask(id: string): Observable<boolean> {
    return this.httpClient
      .delete(this.URL + '/' + id)
      .pipe(
        map(() => true),
        catchError((err) => {
          console.error(err);
          return of(false);
        }),
      );
  }
}

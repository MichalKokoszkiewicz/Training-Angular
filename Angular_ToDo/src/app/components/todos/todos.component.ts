import {Component, Input, OnInit} from '@angular/core';
import {TaskListModel} from "../../models/task-list-model";
import {Observable} from "rxjs";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  // data: TaskListModel[] = [];
  data$: Observable<TaskListModel[]> | undefined;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.data$ = this.dataService.getData();
    this.dataService.loadData();
    // this.dataService.getData().subscribe((data) => {
    //   this.data = data;
    // });
  }

}

import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {Observable} from "rxjs";
import {TaskListModel} from "../../../../models/task-list-model";
import {TaskTypeEnum} from "../../../../models/task-type-enum";
import {ShowData} from "../../models/show-data";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  data: ShowData = {
    todo: 0,
    inProgress: 0,
    done: 0,
    sum: 0,
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData()
      .subscribe((data: TaskListModel[]) => {
        let sum = 0;
        data.forEach((taskList: TaskListModel) => {
          sum += taskList.tasks.length;
          switch (taskList.type) {
            case TaskTypeEnum.TODO: this.data.todo = taskList.tasks.length; break;
            case TaskTypeEnum.IN_PROGRESS: this.data.inProgress = taskList.tasks.length; break;
            case TaskTypeEnum.DONE: this.data.done = taskList.tasks.length; break;
          }
        });
        this.data.sum = sum;
      });
    this.dataService.loadData();
  }

}

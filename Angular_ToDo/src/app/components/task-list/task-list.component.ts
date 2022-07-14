import {Component, Input, OnInit} from '@angular/core';
import {TaskListModel} from "../../models/task-list-model";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() taskList: TaskListModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

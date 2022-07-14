import {Component, Input, OnInit} from '@angular/core';
import {TaskModel} from "../../models/task-model";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: TaskModel | undefined;

  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit(): void {
  }

  onEditButtonClick() {
    this.router.navigate(['task-form', this.task?.id]);
  }

  onDeleteButtonClick() {
    if (this.task?.id) {
      this.dataService.deleteTask(this.task.id)
        .subscribe((result) => {
          if (result) {
            this.dataService.loadData();
          }
        })
    }
  }
}

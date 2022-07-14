import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {TaskModel} from "../../models/task-model";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    console.log('valid', form.valid);
    console.log('value', form.value);

    if (form.valid) {
      this.dataService.addTask(new TaskModel(form.value))
        .subscribe((result) => {
          console.log('save in database:', result);
        });
    }
  }

}

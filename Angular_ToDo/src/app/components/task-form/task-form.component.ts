import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {TaskModel} from "../../models/task-model";
import {ActivatedRoute, Route, Router, Routes} from "@angular/router";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  form: FormGroup | undefined;
  submitted = false;
  originalTask: TaskModel | null = null;

  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', [Validators.required]],
    });
    const id = this.route.snapshot.params['id'];
    if (id) {
      console.log('task id to edit:', id);
      this.dataService.getTask(id)
        .subscribe((task: TaskModel | null) => {
          if (task) {
            this.originalTask = task;
            this.form?.patchValue(task);
          }
        })
    }
  }

  onFormSubmit() {
    this.submitted = true;

    console.log('valid', this.form?.valid);
    console.log('value', this.form?.value);

    if (!this.form?.valid) {
      return;
    }

    if (this.originalTask) {
      const task = new TaskModel({
        ...this.originalTask,
        ...this.form?.value,
      });
      this.dataService.editTask(task)
        .subscribe((result) => {
          console.log('save task in database:', result);
        });
    } else {
      const task = new TaskModel(this.form?.value);
      this.dataService.addTask(task)
        .subscribe((result) => {
          console.log('save task in database:', result);
        });
    }
  }

}

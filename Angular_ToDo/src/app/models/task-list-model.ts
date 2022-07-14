import {TaskModel} from "./task-model";
import {TaskTypeEnum} from "./task-type-enum";

export class TaskListModel {
  title: string;
  tasks: TaskModel[];
  type: TaskTypeEnum;

  constructor(opts?: Partial<TaskListModel>) {
    opts = opts || {};
    this.title = opts.title || '';
    this.tasks = opts.tasks || [];
    this.type = opts.type || TaskTypeEnum.TODO;
  }
}

import {TaskTypeEnum} from "./task-type-enum";

export class TaskModel {
  id: string | null;
  title: string;
  type: TaskTypeEnum;

  constructor(opts?: Partial<TaskModel>) {
    opts = opts || {};
    this.id = opts.id || null;
    this.title = opts.title || '';
    this.type = opts.type || TaskTypeEnum.TODO;
  }
}

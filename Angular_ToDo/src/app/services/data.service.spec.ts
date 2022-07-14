import {TestBed} from '@angular/core/testing';

import {DataService} from './data.service';
import {of, takeLast} from "rxjs";
import {TaskModel} from "../models/task-model";
import {TaskTypeEnum} from "../models/task-type-enum";
import {HttpClient} from "@angular/common/http";

fdescribe('DataService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: DataService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(of([
      new TaskModel({type: TaskTypeEnum.TODO}),
      new TaskModel({type: TaskTypeEnum.DONE}),
      new TaskModel({type: TaskTypeEnum.DONE}),
    ]));
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy}],
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadData() should load data from server', (done) => {
    service.getData().subscribe((taskList) => {
      expect(taskList.length).toEqual(3);
      expect(taskList[0].tasks.length).toEqual(1);
      expect(taskList[1].tasks.length).toEqual(0);
      expect(taskList[2].tasks.length).toEqual(2);
      done();
    });
    service.loadData();
  })
});

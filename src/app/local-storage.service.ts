import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'angular-webstorage-service';
const STORAGE_KEY = 'local_lists';

export class TaskStorage {
  constructor (public todo: string[] = [],
               public progress: string[] = [],
               public done: string[] = []) {}
}

@Injectable()
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
  }

  public setTasks(tasks: TaskStorage): void {
    this.storage.set(STORAGE_KEY, tasks);
  }

  public getTasks(): TaskStorage {
    return this.storage.get(STORAGE_KEY) || new TaskStorage();
  }
}

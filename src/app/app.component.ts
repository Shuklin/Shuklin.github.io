import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {LocalStorageService, TaskStorage} from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: TaskStorage;

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  private getTasks() {
    this.tasks = this.localStorageService.getTasks();
  }

  private setTasks() {
    this.localStorageService.setTasks(this.tasks);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.setTasks();
  }

  addTask(list: string, input) {
    const value = input.value.trim();
    if (value !== '') {
      this.tasks[list].unshift(value);
      this.setTasks();
    }
    input.value = '';
  }

  removeTask(list, index) {
    this.tasks[list].splice(index, 1);
    this.setTasks();
  }
}

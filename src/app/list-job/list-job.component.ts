import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-list-job",
  templateUrl: "./list-job.component.html",
  styleUrls: ["./list-job.component.css"]
})
export class ListJobComponent implements OnInit {
  list = [];
  namelist: string;
  limitJob = [];
  addJob(index) {
    if (this.list[index].id == "") {
      alert("ban chua dien job");
    } else if (this.limit(this.list[index].listJob, index)) {
      this.list[index].listJob.push(this.list[index].id);

      this.list[index].id = "";
    } else {
      alert("quá số lượng công việc");
    }
  }
  limit(listJob, index) {
    if (listJob.length < this.list[index].limitJob) {
      return true;
    }
    return false;
  }
  addLimitJob(limitJob, index) {
    this.list[index].limitJob = limitJob;
    this.limitJob[index] = this.list[index].limitJob;
    this.list[index].limitJob = "";
  }
  removeJob(nameJob) {
    for (let i of this.list) {
      for (let j = 0; j < i.listJob.length; j++)
        if (i.listJob[j] == nameJob) {
          i.listJob.splice(j, 1);
        }
    }
  }
  addList() {
    if (this.namelist == undefined || this.namelist == "") {
      alert("bạn chưa nhập tên list");
    } else {
      this.list.push({ namelist: this.namelist, listJob: [] });
      // this.pushLocalLists({ namelist: this.namelist, listJob: [] });
      this.namelist = "";
    }
  }
  removeList(index) {
    for (let i = 0; i < this.list.length; i++) {
      if (i == index) {
        this.list.splice(index, 1);
      }
    }
  }
  // pushLocalLists(list) {
  //   let local = JSON.parse(localStorage.getItem("listKanbanboards"));
  //   local.push(list);
  //   localStorage.setItem("listKanbanboards", JSON.stringify(local));
  //   localStorage.getItem("listKanbanboards");
  //   console.log(localStorage.getItem("listKanbanboards"));
  // }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  constructor() {}

  ngOnInit() {
    // let storageKey = "listKanbanboards";
    // let dataString = localStorage.getItem(storageKey);
    // if (dataString) {
    //   this.list = JSON.parse(dataString);
    // } else {
    //   this.list = [];
    // }
  }
}

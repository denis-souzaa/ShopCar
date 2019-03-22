import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template:`
    <app-layout>
      <ng-snotify></ng-snotify>
      <router-outlet></router-outlet>
    </app-layout>
  `
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

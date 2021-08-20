import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginas',
  template:`
  <router-outlet></router-outlet>
`,
})
export class PaginasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-paginas',
  template:`
  <router-outlet></router-outlet>
`,
})
export class PaginasComponent implements OnInit {

  constructor(
    ) { }

  ngOnInit() {
  }

}

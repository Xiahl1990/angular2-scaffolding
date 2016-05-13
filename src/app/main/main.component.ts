import { Component } from 'angular2/core';
import {RouteConfig} from 'angular2/router';
//import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/components/accordion';
// webpack html imports
let template = require('./main.html');

import {Zcgl} from '../zcgl/zcgl.component';
import {Xxgl} from '../xxgl/xxgl.component';


@Component({
  selector: 'main',
  styles: [require('./main.css')],
  template: template,
  directives: [ACCORDION_DIRECTIVES]
})

@RouteConfig([
  {path: '/', name: 'Zcgl', component: Zcgl, useAsDefault: true},
  {path: '/:id', name: 'Xxgl', component: Xxgl}
])

export class Main {
  public oneAtATime:boolean = true;
  public items:Array<string> = ['Item 1', 'Item 2', 'Item 3'];
  private id:string = 'waniya';

  public status:Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  public groups:Array<any> = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  public addItem():void {
    this.items.push(`Items ${this.items.length + 1}`);
  }
}

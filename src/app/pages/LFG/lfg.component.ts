import { Component, OnInit, Renderer2, Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-lfg',
  templateUrl: './lfg.component.html',
  styleUrls: ['./lfg.component.css']
 
})
export class LfgComponent implements OnInit {

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }


  
  ngOnInit(): void {
    const script = this._renderer2.createElement('script');
    script.type = 'text/javascript';
    script.src = './assets/js/newgroup.js';
    this._document.body.appendChild(script);
  }
  onShow() {
    alert('Show button clicked!');
  }

}



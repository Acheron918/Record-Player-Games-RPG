import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/pages/posts/posts.component';

@Component({
  selector: 'app-each-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
   
  @Input() postData : PostData | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}

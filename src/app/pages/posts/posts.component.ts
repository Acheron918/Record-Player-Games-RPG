import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostsCreateComponent } from './post-create/post-create.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  

  ngOnInit(): void {
  }
  onCreatePostClick(){
    this.dialog.open(PostsCreateComponent);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
  })

export class PostsCreateComponent implements OnInit{
  selectedImageFile!: File;

    constructor(){
    }

    ngOnInit(): void {
        
    }

    onPhotoSelected(photoSelector: HTMLInputElement){
      this.selectedImageFile = photoSelector.files![0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.selectedImageFile);
      fileReader.addEventListener(
        "loadend",
        ev => {
          let readableString = fileReader.result?.toString();
        }
      );
    }
}
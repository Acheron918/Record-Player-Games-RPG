import { Component, OnInit, Renderer2,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/service/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  // Global variables
  selectedImageFile!: File;
  commentPost = '';
  imagePost = '';

  // Initialize javascript for modal
  public ngOnInit(): void {
    const script = this._renderer2.createElement('script');
    script.type = 'text/javascript';
    script.src = './assets/js/post.js';
    this._document.body.appendChild(script);
  }

  //Constructor
  constructor(private storage : AngularFireStorage, private firestore : AngularFirestore, 
            private user : AuthService, private toust: HotToastService, public authF : AngularFireAuth,
            private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document) { }

  // Function to upload image view
  onPhotoSelected(photoSelector: HTMLInputElement){
    this.selectedImageFile = photoSelector.files![0];
    if(!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener(
      "loadend",
      ev => {
        let readableString = fileReader.result?.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-review-image")
            postPreviewImage.src = readableString!;
      }
    );
  }

  // Send the post to firebase
  onPostClick(){

    // Block the button
      var button = document.getElementById('postButton');
          button?.classList.add('is-loading');
      
    // Create a post on firebase
      let postId = this.firestore.createId();
      this.storage.upload(`Posts/${postId}/image`, this.selectedImageFile)    //Upload the image on firebase storage
      .then( res => { 

            // Add the post on database
            this.firestore.collection("/Posts/").add({
              comment: this.commentPost,
              creator: this.user.currentUser(),
              imageUrl: `gs://rpg-reviews.appspot.com/Posts/${postId}/image`,
            });
            this.toust.success('Data saved successfully');

            // Hide the modal and unlock the button
            button?.classList.remove('is-loading');
            var oModal = document.getElementById("postModal");
            oModal?.classList.remove('is-active');

            // Clean inputs of modal
            this.commentPost = "";
            let postPreviewImage = <HTMLImageElement>document.getElementById("post-review-image")
                postPreviewImage.src = "";
            
      }, err => {
        this.toust.error(err.message);
      })
    
  }
  
}

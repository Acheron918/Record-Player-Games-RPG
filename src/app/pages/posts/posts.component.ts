import { Component, OnInit, Renderer2,Inject } from '@angular/core';
import { DOCUMENT, Time } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { FirebaseTSFirestore, Limit, OrderBy} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth'
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage'
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp'
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  posts : PostData [] = [];

  // Global variables
  selectedImageFile!: File;
  commentPost = '';
  imagePost = '';
  titlePost = '';

  // Initialize javascript for modal
  public ngOnInit(): void {
    this.getPosts();
    const script = this._renderer2.createElement('script');
    script.type = 'text/javascript';
    script.src = './assets/js/post.js';
    this._document.body.appendChild(script);
  }

  //Constructor
  constructor( private toust: HotToastService, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document) { }

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
  uploadImagePost(){

    // Block the button
    var button = document.getElementById('postButton');
    button?.classList.add('is-loading');

    // Create a post on firebase
    let postId = this.firestore.genDocId();

    this.storage.upload(
      {
        uploadName: "Upload new Image",
        path: ["Posts",postId,"image"],
        data: {
          data: this.selectedImageFile
        },
        onComplete: (downloadUrl) => {
          this.firestore.create(
            {
              path: ["Posts",postId],
              data:{
                title: this.titlePost,
                comment: this.commentPost,
                creatorId: this.auth.getAuth().currentUser?.uid,
                userName: this.auth.getAuth().currentUser?.displayName,
                imageURL: downloadUrl,
                time: FirebaseTSApp.getFirestoreTimestamp()
              },  
              onComplete: (docId) =>{
                  // Hide the modal and unlock the button
                  button?.classList.remove('is-loading');
                  var oModal = document.getElementById("postModal");
                  oModal?.classList.remove('is-active');

                  // Clean inputs of modal
                  this.commentPost = "";
                  this.titlePost = "";
                  let postPreviewImage = <HTMLImageElement>document.getElementById("post-review-image")
                      postPreviewImage.src = "";

                  // this.getPost(this.auth.getAuth().currentUser?.uid);
                  this.toust.success('Data saved successfully');
              }
            });
        }
      }
    );

  }

  getPost(id : any){
    this.firestore.getDocument({
      path: ["Posts",id],
      onComplete: result =>{
        let post = <PostData>result.data();
        this.posts.push(post);
      }
    });
  }

  // Get the posts
  getPosts(){

    this.firestore.getCollection(
      {
        path: ["Posts"],
        where: [
          new OrderBy("time","desc"),
          new Limit(10)
        ],
        onComplete: (result) =>{
            
              result.docs.forEach(
                doc => {
                  let post = <PostData>doc.data();
                  this.posts.push(post);
                }
              );
        },
        onFail: err =>{

        }
      }
    );

  }
}

export interface PostData {
  title: string;
  comment: string;
  creatorId: string;
  imageURL?: string;
  userName: string;
}

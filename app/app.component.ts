import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  public demoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.demoForm = this.formBuilder.group({
       text_input: ['', Validators.required],
       photos: this.formBuilder.array([])
    });
  }

  // We will create multiple form controls inside defined form controls photos.
  createItem(data): FormGroup {
      return this.formBuilder.group(data);
  }

  //Help to get all photos controls as form array.
  get photos(): FormArray {
    console.log(this.demoForm);
    return this.demoForm.get('photos') as FormArray;
  };

  detectFiles(event) {
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          console.log("e.target.result", e.target.result);
            this.photos.push(this.createItem({
                file,
                url: e.target.result  //Base64 string for preview image
            }));
        }
        reader.readAsDataURL(file);
      }
    }
  }

  removePhoto(i){
		this.photos.removeAt(i);
	}

}


// angular form is group of controls

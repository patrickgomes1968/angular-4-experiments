import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'array-form',
  templateUrl: './array-form.component.html',
  styleUrls: ['./array-form.component.css']
})
export class ArrayFormComponent {
  form = new FormGroup({
    topics: new FormArray([new FormControl()]),
    // topic: new FormControl,
    account: new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  })

  get topics() {
    return this.form.get('topics') as FormArray;
  }

  get username() {
    return this.form.get('account.username');
  }

  addTopic(topic: HTMLInputElement) {
    this.topics.push(new FormControl(topic.value));
    topic.value = '';
  }

  removeTopic(topic: FormControl) {
    this.topics.removeAt(this.topics.controls.indexOf(topic))
  }

}

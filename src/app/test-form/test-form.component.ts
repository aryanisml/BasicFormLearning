import { Component, OnInit, Input, OnChanges, SimpleChanges,
   AfterContentInit, AfterContentChecked, DoCheck, AfterViewInit, AfterViewChecked } from '@angular/core';
import { TestFormService } from './test-form.service';
import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, scan, first } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked, DoCheck,
  AfterViewInit, AfterViewChecked {
  testForm: FormGroup;
  @Input()
  mySample;
  constructor(private testFormService: TestFormService) {
    console.log('Constructor');
  }
  ngOnInit() {
    console.log('On Init');
    this.setForm();
    this.setForm();
    this.fnameChange();
    this.lnameChange();
    this.setformDefaultVal();
    this.getBehaviourSubject();
    this.concatSample();
    //  this.getAsyncVal();
    this.learnScan();
    this.getStarWars();
    this.testFormService.sampleAsyncSubjec$.subscribe(data => console.log(data));
  }

  ngAfterContentInit() {
    console.log('After content init');
  }

  ngDoCheck() {
    console.log('do check');
  }
  ngAfterContentChecked() {
    console.log('After content checked.');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnchanges');
  }

  ngAfterViewInit() {
    console.log('After View Init');
  }

  ngAfterViewChecked() {
    console.log('After View Checked...');
  }

  getStarWars() {
    this.testFormService.getStarWarAPI().subscribe(d => console.log(d));
  }
  getAsyncVal() {
    this.testFormService.sampleAsyncSubjec$.subscribe(data => console.log(data));
  }
  concatSample() {
    this.testFormService.getConcatSample().subscribe(data => console.log('data', data));
  }
  fnameChange() {
    this.testForm.get('fname').valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(firstName => {
      this.testForm.get('name').setValue(firstName);
    });
  }
  lnameChange() {
    this.testForm.controls.lname.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(lastName => {
      const fname = this.testForm.value.fname;
      this.testForm.controls.name.setValue(fname ? fname + ' ' + lastName : lastName);
    });
  }
  setformDefaultVal() {
    this.testFormService.getDefaultVal().subscribe(user => {
      this.testForm.patchValue(user, { onlySelf: true, emitEvent: false });
    });
    this.testFormService.getMergeAll().subscribe(user => {
      console.log(user);
    });
  }
  setForm() {
    this.testFormService.UserForm.subscribe(formGroup => {
      this.testForm = formGroup;
      this.testFormService.userFormCurInst = this.testForm;
    });
  }
  show() {
    console.log(this.testFormService.userFormCurInst);
  }
  getBehaviourSubject() {
    this.testFormService.sampleSubject.asObservable().subscribe(d => console.log(d));
  }
  learnScan() {
    const sampleSpread = [1, 3, 4, 5, 6];
    console.log(...sampleSpread);
    let newSampleSpread = [];
    newSampleSpread = [...sampleSpread];
    newSampleSpread.push(9);
    console.log(sampleSpread);
    console.log(newSampleSpread);
    const numberStream = of(1, 3, 5);
    numberStream.pipe(scan((acc, cur) => acc * cur, 10));
    numberStream.subscribe(d => console.log(d));
    const sampleSubject = new Subject();
    const exampleSubject = sampleSubject.pipe(scan((acc, cur) => Object.assign({}, acc, cur), {}));
    exampleSubject.subscribe(d => console.log('object', d));
    sampleSubject.next({ name: 'Swapnil' });
    sampleSubject.next({ son: 'Vihaan' });
    sampleSubject.next({ wife: 'Tanushree' });
  }
}

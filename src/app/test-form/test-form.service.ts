import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of, BehaviorSubject, ObservedValueOf, concat, forkJoin, AsyncSubject, Subject } from 'rxjs';
import { mergeMap, map, mergeAll, concatMap, combineLatest, delay, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestFormService {

  userFormCurInst: FormGroup;
  sample$: Observable<any>;
  sampleTwo$: Observable<any>;
  resultSample$: Observable<any>;
  sampleSubject: BehaviorSubject<string |
  { fname: string, lname: string, name: string, salary?: string }>
    = new BehaviorSubject<string | { fname: string, lname: string, name: string, salary?: string }>('Hello World');

  sampleAsyncSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  sampleAsyncSubjec$ = this.sampleAsyncSubject.asObservable();

  public get UserForm(): Observable<FormGroup> {
    return of(this.CreateFormGroup());
  }

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient) {
  }

  private CreateFormGroup() {
    return this.fb.group({
      fname: [''],
      lname: [''],
      name: [''],
      salary: ['']
    });
  }

  getUserInfo(): Observable<{ fname: string, lname: string, name: string, salary?: string }> {
    const user = {
      fname: 'swapnil',
      lname: 'kamble',
      name: 'swapnil kamble'
    };
    return of(user);
  }

  getSalary(fname): Observable<{ salary: string }> {
    const deptMap = [{ fname: 'swapnil', salary: '67099$' },
    { fname: 'vamshi', salary: '9733099$' }];
    const rVal = { salary: '' };
    rVal.salary = deptMap.filter(d => d.fname === fname).map(x => x.salary).toString();
    return of(rVal);
  }

  getDefaultVal() {
    return this.getUserInfo().pipe(
      mergeMap(user => this.getSalary(user.fname).pipe(map(d => {
        user.salary = d.salary;
        return user;
      })))
    );
  }


  getMergeAll() {
    return this.getUserInfo().pipe(map(user =>
      this.getSalary(user.fname).pipe(map(d => {
        user.salary = d.salary;
        //  this.sampleSubject.next(user);
        return user;
      }))), mergeAll());
  }


  getConcatSample() {
    this.sampleTwo$ = of('hello world2').pipe(delay(0));
    this.sample$ = of('Hello World').pipe(delay(0));
    this.resultSample$ = this.sample$.pipe(withLatestFrom(this.sampleTwo$));
    //  this.resultSample$ = this.sample$.pipe(concatMap(data => this.sampleTwo$));
    // this.resultSample$ = forkJoin(this.sampleTwo$, this.sample$);
    this.sampleAsyncSubject.next('5');
    return this.resultSample$;
  }

  getStarWarAPI() {
    return this.httpClient.get('https://swapi.co/api/people/1/').pipe(concatMap((data: any) => {
      return this.httpClient.get(data.homeworld);
    }), mergeMap((data: any) => {
      const multipleAPIRequest = data.residents;
      const subResult = [];
      for (let index = 0; index < multipleAPIRequest.length; index++) {
        const req = multipleAPIRequest[index];
        subResult.push(this.httpClient.get(req));
      }
      return forkJoin(subResult);
    }));
  }

}

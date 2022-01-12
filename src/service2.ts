import { add$, sub$ } from "./service1";
import { AsyncSubject, forkJoin } from "rxjs";

export {
  IPlusTwo,
  plusTwo$,
  ISubtractOne,
  subtractOne$,
  IAddTwoSubOne,
  addTwoSubOne$
};


interface IPlusTwo {
  (a: number): number;
}
const _plusTwo$ = new AsyncSubject<IPlusTwo>();
const plusTwo$ = _plusTwo$.asObservable();
add$.subscribe(add => {
  const plusTwo: IPlusTwo = x => add(x, 2);
  _plusTwo$.next(plusTwo);
  _plusTwo$.complete();
});

interface ISubtractOne {
  (a: number): number;
}
const _subtractOne$ = new AsyncSubject<ISubtractOne>();
const subtractOne$ = _subtractOne$.asObservable();
sub$.subscribe(sub => {
  const subtractOne: ISubtractOne = x => sub(x, 1);
  _subtractOne$.next(subtractOne);
  _subtractOne$.complete();
});

interface IAddTwoSubOne {
  (a: number): number;
}
const _addTwoSubOne$ = new AsyncSubject<IAddTwoSubOne>();
const addTwoSubOne$ = _addTwoSubOne$.asObservable();
forkJoin({
  add: add$,
  sub: sub$
}).subscribe(({add, sub}) => {
  const addTwoSubOne: IAddTwoSubOne = x => sub(add(x, 2), 1);
  _addTwoSubOne$.next(addTwoSubOne);
  _addTwoSubOne$.complete();
});

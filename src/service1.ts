import { AsyncSubject } from "rxjs";

export {
  IAdd,
  add$,
  ISub,
  sub$
};

interface IAdd {
  (a: number, b: number): number;
}

interface ISub {
  (a: number, b: number): number;
}

const _add$ = new AsyncSubject<IAdd>();
const add$ = _add$.asObservable();
const _add = (a: number, b: number): number => a + b;
setTimeout(() => {
  _add$.next(_add);
  _add$.complete();
}, 3000);

const _sub$ = new AsyncSubject<ISub>();
const sub$ = _sub$.asObservable();
const _sub = (a: number, b: number): number => a - b;
setTimeout(() => {
  _sub$.next(_sub);
  _sub$.complete();
}, 5000);

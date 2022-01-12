#!/usr/bin/env node

// The prereq pattern involves using RxJS AsyncSubject and it's asObservable().
// Only expose type/interface definitions and Observables (not Subjects) named for the functions they will emit.
// Consumers will subscribe to the Observables, and may use the emitted function.
// The Subjects are not exposed directly to prevent consumers from accessing next() and complete().
// Consumers can be certain that once the Observables emit their associated function, the function is ready to call.
// RxJS forkJoin can be used to specify multiple prerequisites that a function depends on.

import { plusTwo$, subtractOne$, addTwoSubOne$ } from "./service2";

(() => {
  console.log('start');
  console.time('t1');
  console.time('t2');
  console.time('t3');
  console.time('t4');
  console.time('t5');
  
  plusTwo$.subscribe(plusTwo => {
    console.timeEnd('t1');
    console.log(`1 + 2 should be 3, and appear after 3sec: ${plusTwo(1)}`);
  });

  subtractOne$.subscribe(subtractOne => {
    console.timeEnd('t2');
    console.log(`3 - 1 should be 2, and appear after 5sec: ${subtractOne(3)}`);
  });

  addTwoSubOne$.subscribe(addTwoSubOne => {
    console.timeEnd('t3');
    console.log(`(4 + 2) - 1 should be 5, and appear after 5sec: ${addTwoSubOne(4)}`);
  });

  setTimeout(() => {
    plusTwo$.subscribe(plusTwo => {
      console.timeEnd('t4');
      console.log(`2 + 2 should be 4, and appear after 6sec: ${plusTwo(2)}`);
    });
  }, 6000);

  setTimeout(() => {
    subtractOne$.subscribe(subtractOne => {
      console.timeEnd('t5');
      console.log(`9 - 1 should be 8, and appear after 5sec: ${subtractOne(9)}`);
    });
  }, 1000);

})();


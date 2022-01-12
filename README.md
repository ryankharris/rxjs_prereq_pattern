# RxJS Prereq Pattern
This is an example of an idea for how to set prequisites or async dependencies at the function level within JS modules using RxJS.

## Details
The prereq pattern involves using RxJS AsyncSubject and it's asObservable().

Only expose type/interface definitions and Observables (not Subjects) named for the functions they will emit.

Consumers will subscribe to the Observables, and may use the emitted function.

The Subjects are not exposed directly to prevent consumers from accessing next() and complete().

Consumers can be certain that once the Observables emit their associated function, the function is ready to call.

RxJS forkJoin can be used to specify multiple prerequisites that a function depends on.
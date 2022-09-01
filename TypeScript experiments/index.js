"use strict";
// import * as _ from 'lodash';
// const person: Person = {
//     first: 'Jeff',
//     last: 'Delaney'
// }
// const person2: Person = {
//     first: 'Usain',
//     last: 'Bolt',
//     fast: true,
//     myValue: 56
// }
// function pow(x:number, y:number): string {
//     return Math.pow(x, y).toString();
// }
// function pow2(x:number, y:number): void {
//     console.log( Math.pow(x, y).toString() );
// }
// pow(5, 10)
// pow2(10, 5)
// arrays
// const arr: number[] = [];
// const arr: Person[] = [];
// arr.push(1)
// arr.push('23')
// arr.push(false)
// type MyList = [number?, string?, boolean?]
// const arr: MyList = [];
// arr.push(1)
// arr.push('23')
// arr.push(false)
// Generics
class Observable {
    value;
    constructor(value) {
        this.value = value;
    }
}
let x;
let y;
let z = new Observable(23);

// import * as _ from 'lodash';

// console.log('hello world');

// async function hello() {
//     return 'world' 
// }

//const url = new URL('...').

// _.pickBy()

// let lucky: any = 23;
// let lucky: number;

// lucky = '23';
// lucky = 23;

// let lucky: number = 23;
// let lucky = 23;


// type Style = string;
// type Style = 'bold' | 'italic' | 23;

// let font: Style;

// font = 'something';

// font = 23;


interface Person {
    first: string;
    last: string;
    [key: string]: any;
}

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

class Observable<T> {
    constructor(public value: T) {}
}

let x: Observable<number>;

let y: Observable<Person>;

let z = new Observable(23);
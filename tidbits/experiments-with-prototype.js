
const tm = new Map();
tm.set('m1',1);


const test = {
    a: 0,
    b: 'aba', 
    // __proto__: String,
    // __proto__: new String(),
    // __proto__: Number,
    // __proto__: Boolean,
    // __proto__: Symbol,
    // __proto__: Date,
    // __proto__: new Date(),
    // __proto__: new Error(),
    // __proto__: new Map(),
    // __proto__: tm,
    __proto__: JSON,
}

console.log( typeof test );

console.log( typeof test.__proto__ );

console.log( test.prototype );

console.log( test.call );
console.log( test.apply );
console.log( test.bind );

//test.append('mow', 4);

console.log( test.name );

console.log( test.valueOf );

console.log( test.entries );

console.log( test.stringify );

console.log( test.toString );
console.log( test.fromCharCode );
console.log( test.length );
console.log( test.endsWith );
console.log( test.repeat );

console.log( test.NaN );
console.log( test.parseInt );

console.log( test.match );
console.log( test.species );

console.log( test.message );
console.log( test.cause );
console.log( test.stack );

console.log( test.now );
console.log( test.parse );
console.log( test.UTC );

console.log( test.getFullYear );
console.log( test.getDate );

console.log( Object.keys( test ) );
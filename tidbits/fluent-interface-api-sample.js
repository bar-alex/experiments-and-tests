// basically, allow for method chaining

const myObj = {
    result: 0,
    add:  function (a) { this.result = this.result + a; return this },
    sub:  function (a) { this.result = this.result - a; return this },
    mult: function (a) { this.result = this.result * a; return this },
    div:  function (a) { this.result = this.result / a; return this },
}

console.log( 'mutable object', myObj.add(3).mult(2).result, 
    '\t // myObj.add(3).mult(2).result' )


// const myObj2 = {
//     result: 0,
//     add:  function (a) { const obj = {...this}; obj.result = obj.result + a; return obj },
//     sub:  function (a) { const obj = {...this}; obj.result = obj.result - a; return obj },
//     mult: function (a) { const obj = {...this}; obj.result = obj.result * a; return obj },
//     div:  function (a) { const obj = {...this}; obj.result = obj.result / a; return obj },
// }

// console.log( 'immutable object', myObj2.add(3).mult(2).div(5).result )


const myObj3 = {
    result: 0,
    add:  function (a) { return {...this, result: this.result + a} },
    sub:  function (a) { return {...this, result: this.result - a} },
    mult: function (a) { return {...this, result: this.result * a} },
    div:  function (a) { return {...this, result: this.result / a} },
}

console.log( 'immutable object', myObj3.add(5).mult(3).div(2).result, 
    '\t // myObj3.add(5).mult(3).div(2).result' )


function myFunc (initial = 0) {
    // result: 0,
    return {
        result: initial, 
        add:  function (a) { return {...this, result: this.result + a} },
        sub:  function (a) { return {...this, result: this.result - a} },
        mult: function (a) { return {...this, result: this.result * a} },
        div:  function (a) { return {...this, result: this.result / a} },
    }

}

console.log( 'from func', myFunc().add(5).mult(4).div(3).result, 
    '\t // myFunc().add(5).mult(4).div(3).result' )


function myFunc2 (initial = 0) {
    let context = initial;
    return {
        add:  function (a) { context += a; return this; },
        sub:  function (a) { context -= a; return this; },
        mult: function (a) { context *= a; return this; },
        div:  function (a) { context /= a; return this; },
        result: _ => context,   // doesn't need this
    }

}

console.log( 'func closure', myFunc2().add(5).mult(4).div(3).result(), 
    '\t // myFunc2().add(5).mult(4).div(3).result()' )


// function myFunc3 (initial = 0) {
//     let context = initial;
//     // const getResult = _ => context;
//     return {
//         add:  function (a) { context += a; return this; },
//         sub:  function (a) { context -= a; return this; },
//         mult: function (a) { context *= a; return this; },
//         div:  function (a) { context /= a; return this; },
//         getResult: _ => context,
//         result: (this).getResult(),
//     }

// }

// console.log( 'func closure+', myFunc3().add(5).mult(4).div(6).result, 
//     '\t // myFunc3().add(5).mult(4).div(6).result' )

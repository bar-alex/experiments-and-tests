// basically, allow for method chaining

const myObj = {
    result: 0,
    add: function (a) { this.result = this.result + a; return this },
    sub: function (a) { this.result = this.result - a; return this },
    mult: function (a) { this.result = this.result * a; return this },
    div: function (a) { this.result = this.result / a; return this },
}

console.log( myObj.add(3).mult(2) )


const myObj2 = {
    result: 0,
    add: function (a) { const obj = {...this}; obj.result = obj.result + a; return obj },
    sub: function (a) { const obj = {...this}; obj.result = obj.result - a; return obj },
    mult: function (a) { const obj = {...this}; obj.result = obj.result * a; return obj },
    div: function (a) { const obj = {...this}; obj.result = obj.result / a; return obj },
}

console.log( myObj2.add(3).mult(2).div(5) )


const myObj3 = {
    result: 0,
    add:  function (a) { return {...this, result: this.result + a} },
    sub:  function (a) { return {...this, result: this.result - a} },
    mult: function (a) { return {...this, result: this.result * a} },
    div:  function (a) { return {...this, result: this.result / a} },
}

console.log( 'final result', myObj3.add(5).mult(3).div(2).result )

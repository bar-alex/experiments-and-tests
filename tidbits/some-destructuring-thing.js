const props = [
    {name:'Vicky', age:24}, 
    {name:'Sai'  , age:22}, 
    {name:'Ram'  , age:26}, 
]

const [, {name}, {name:name2, age}] = props;
console.log( name, age, name2 );


//console.log( [, {name}, ] );
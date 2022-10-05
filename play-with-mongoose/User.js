const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
})

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: v => v%2 === 0,
            message: props => `${props.value} is not an even number`,
        }
    },
    email: {
        type: String,
        minLength: 10,
        required: true,
        lowercase: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: ()  => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: ()  => Date.now(),
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    hobbies: [String],
    address: addressSchema,
})


userSchema.methods.sayHi = function () {
    console.log(`Hi, my name is ${this.name}, and my best friend is ${this.bestFriend ? this.bestFriend.name : "..I don't have one"}`)
}

userSchema.statics.findByName = function (name) {
    // return this.where({ name: new RegExp(name, 'i') })
    return this.find({ name: new RegExp(name, 'i') })
}

userSchema.query.byName = function (name) {
    return this.where({ name: new RegExp(name, 'i') })
}

userSchema.virtual("namedEmail").get( function() {
    return `${this.name} <${this.email}>`
} )

userSchema.pre("save", function(next) {
    this.updatedAt = Date.now()
    // console.log('pre update triggered');
    // next()
    throw new Error("fail save")
})

userSchema.post("save", function(doc, next) {
    doc.sayHi()
    // console.log('post update triggered');
    next()
})

module.exports = mongoose.model("User", userSchema)


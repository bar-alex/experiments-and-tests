require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect(process.env.MONGO_URI);

run();
async function run() {
	// const user = new User({ name: "Kyle", age: 26 })
	// await user.save()

	// user.name = "Sally";
	// await user.save()

	try {
		// const user = await User.create({
		//     name: "Kyle",
		//     age: 26,    // force error with string val "sds"
		//     email: "TEST@test.com",
		//     hobbies: ["Weight Lifting", "Bowling", ],
		//     address: {
		//         street: "Main St",
		//     }
		// });

		// console.log(user);

		// const user = await User.findById("633cafe1a1090f0db0c13ef9")
		// const user = await User.findOne({ name: "Kyle" })
		// const user = await User.exists({ name: "Kyle" })

		// queries in mongoose, an alternative to mongodb's find
		// const user = await User.where("name")
		// 	.equals("Kyle")
		// 	.where("age")
		// 	.gt(12)
		// 	// .lt(31)
        //     .populate("bestFriend")
        //     .limit(1)
			// .countDocuments()
            // .select("name age")
        
        // user[0].sayHi()

        // user[0].bestFriend = "633ca798421973e3ddcf6790"
        // await user[0].save()

        // const user = await User.findByName("Kyle").limit(2)
        // const user = await User.find().byName("Kyle").limit(2)
        const user = await User.findOne({name: "Kyle", email: "test@test.com"})

        console.log(user.namedEmail);
		console.log(user);

        await user.save()
        console.log(user);

	} catch (e) {
		console.log(e.message);
		// console.log( Object.keys( e.errors ) );
	}
}

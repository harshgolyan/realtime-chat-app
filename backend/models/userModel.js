const mongoose = require("mongoose");
const { z } = require("zod");

const objectId = mongoose.Schema.Types.ObjectId;

const userSchemaZod = z.object({
    name: z.string().min(1,"Name is required"),
    email: z.string().email("Invalid email address").min(1,"Email is required"),
    password: z.string().min(8, "Password must be at least 6 characters long").nonempty("Password is required"),
    pic: z.string().url("Invalid URL").default("https://cdn-icons-png.flaticon.com/128/3135/3135715.png")
});

const userSchemaMongoose = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true,
        default: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
    }
});

userSchemaMongoose.pre("save", function (next) {
    const user = this;

    const result = userSchemaZod.safeParse({
        name: user.name,
        email: user.email,
        password: user.password,
        pic: user.pic
    });

    if (!result.success) {
        const errorMessages = result.error.errors.map(err => err.message).join(", ");
        return next(new Error(errorMessages));
    }

    next();
});

const User = mongoose.model("User", userSchemaMongoose);
module.exports = User;

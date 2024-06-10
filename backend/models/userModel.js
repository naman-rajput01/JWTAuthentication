const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        name:
        {
            type: String,
            required: [true, "Please enter name"]
        },
        email:
        {
            type: String,
            required: [true, "Please enter email"],
            unique: true,
        },
        password:
        {
            type: String,
            required: [true, "Please enter Password"]
        },

    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema)
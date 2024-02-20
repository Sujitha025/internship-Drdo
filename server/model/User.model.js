import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: true, 
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    firstName: { type: String},
    lastName: { type: String},
    mobile : { type : Number},
    address: { type: String},
    profile: { type: String}
});
UserSchema.index({ username: 1 }, { unique: true }); // Index for username
UserSchema.index({ email: 1 }, { unique: true }); // Index for email

export default mongoose.model.Users || mongoose.model('User', UserSchema);
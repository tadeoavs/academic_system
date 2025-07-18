import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true, //Quitar espacios en blanco al inicio y al final
    },
    email: {
        type: String,
        required: true,
        unique: true, // No permitir emails duplicados
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
});

export default mongoose.model("User", userSchema);
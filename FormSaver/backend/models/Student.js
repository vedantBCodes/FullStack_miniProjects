import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  dob: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  altPhoneNumber: { type: String },
  email: { type: String, required: true, unique: true },

  permanentAddress: { type: String, required: true },

  idProofNumber: { type: String, required: true }, // only Aadhar

  emergencyContactName: { type: String, required: true },
  emergencyContactRelation: { type: String, required: true },
  emergencyContactPhone: { type: String, required: true },

  roomNumber: { type: String, required: true },
  roomType: { type: String, enum: ["Bedroom", "Hall"], required: true },
  deposit: { type: Number, required: true },
  monthlyRent: { type: Number, required: true },
  expectedStay: { type: Number, required: true }, // months

  registrationDate: { type: Date, required: true }, // new field
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Student", studentSchema);

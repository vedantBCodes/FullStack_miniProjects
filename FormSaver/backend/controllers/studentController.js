import Student from "../models/Student.js";

// Helper function to validate Aadhar number
const isValidAadhar = (aadhar) => {
  const regex = /^\d{12}$/; // exactly 12 digits
  return regex.test(aadhar);
};

export const createStudent = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      dob,
      registrationDate,
      phoneNumber,
      altPhoneNumber,
      email,
      permanentAddress,
      idProofNumber,
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactPhone,
      roomNumber,
      roomType,
      deposit,
      monthlyRent,
      expectedStay
    } = req.body;

    // Validation
    if (!isValidAadhar(idProofNumber)) {
      return res.status(400).json({ error: "Invalid Aadhar number. It must be 12 digits." });
    }

    if (!registrationDate) {
      return res.status(400).json({ error: "Registration date is required." });
    }

    const newStudent = new Student({
      fullName,
      gender,
      dob,
      registrationDate,
      phoneNumber,
      altPhoneNumber,
      email,
      permanentAddress,
      idProofNumber,
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactPhone,
      roomNumber,
      roomType,
      deposit,
      monthlyRent,
      expectedStay
    });

    await newStudent.save();
    res.status(201).json({ message: `Student ${newStudent.fullName} registered successfully!` });
  } catch (err) {
    console.error("Error saving student:", err);
    res.status(400).json({ error: err.message });
  }
};

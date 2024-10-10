const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

module.exports = (db) => {
  router.get('/', async (req, res) => {
    try {
      const students = await db.collection('students').find().toArray();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const student_id = uuidv4();
      const {first_name, last_name, phone_number, email, notes, class_signed_up } = req.body;

      // Validation for required fields
      if (!first_name || !last_name) {
        return res.status(400).json({ message: "first_name and last_name are required." });
      }

      const newStudent = {
        student_id,
        first_name,
        last_name,
        phone_number,
        email,
        notes,
        signup_date: new Date(),
        class_signed_up: class_signed_up || [],
        attendance_history: []
      };

      const result = await db.collection('students').insertOne(newStudent);
      res.status(201).json({ message: "Student added successfully", student: newStudent });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const studentId = req.params.id; // Use student_id, not ObjectId
      const { first_name, last_name, phone_number, email, notes, class_signed_up } = req.body;

      // Validation for required fields
      if (!first_name && !last_name && !phone_number && !email && !notes && !class_signed_up) {
        return res.status(400).json({ message: "At least one field must be provided for update." });
      }

      const updatedStudent = {
        first_name,
        last_name,
        phone_number,
        email,
        notes,
        class_signed_up
      };

      const result = await db.collection('students').updateOne(
        { student_id: studentId },
        { $set: updatedStudent }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json({ message: "Student updated successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const studentId = req.params.id; // Use student_id, not ObjectId
      const result = await db.collection('students').deleteOne({ student_id: studentId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return router;
};
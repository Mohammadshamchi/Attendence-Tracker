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
      const newStudent = {
        student_id: req.body.student_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        email: req.body.email,
        notes: req.body.notes,
        signup_date: new Date(),
        class_signed_up: req.body.class_signed_up,
        attendance_history: []
      };

      const result = await db.collection('students').insertOne(newStudent);
      res.status(201).json({ message: "Student added successfully", studentId: result.insertedId });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const studentId = new ObjectId(req.params.id);
      const updatedStudent = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        email: req.body.email,
        notes: req.body.notes,
        class_signed_up: req.body.class_signed_up
      };

      const result = await db.collection('students').updateOne(
        { _id: studentId },
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
      const studentId = new ObjectId(req.params.id);
      const result = await db.collection('students').deleteOne({ _id: studentId });

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
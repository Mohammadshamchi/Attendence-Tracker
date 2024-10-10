const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

module.exports = (db) => {
  // Get all classes
  router.get('/', async (req, res) => {
    try {
      const classes = await db.collection('classes').find().toArray();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create a new class
  router.post('/', async (req, res) => {
    console.log("Received class data:", req.body);
    try {
      const newClass = {
        name: req.body.name,
        info: req.body.info,
        participants: req.body.participants || [], // Store participants as strings (student_id)
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        classHours: {
          start: req.body.classHours.start,
          end: req.body.classHours.end
        },
        selectedDays: req.body.selectedDays
      };

      const result = await db.collection('classes').insertOne(newClass);
      console.log("Class created:", result);
      res.status(201).json({ message: "Class created successfully", classId: result.insertedId });
    } catch (error) {
      console.error("Error creating class:", error);
      res.status(400).json({ message: error.message });
    }
  });

  // Edit class (PUT request)
  router.put('/:id', async (req, res) => {
    try {
      const classId = new ObjectId(req.params.id);
      const updatedClass = {
        name: req.body.name,
        info: req.body.info,
        participants: req.body.participants, // Update participants
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        classHours: {
          start: req.body.classHours.start,
          end: req.body.classHours.end
        },
        selectedDays: req.body.selectedDays
      };

      const result = await db.collection('classes').updateOne(
        { _id: classId },
        { $set: updatedClass }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Class not found" });
      }

      res.json({ message: "Class updated successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Remove class (DELETE request)
  router.delete('/:id', async (req, res) => {
    try {
      const classId = new ObjectId(req.params.id);
      const result = await db.collection('classes').deleteOne({ _id: classId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Class not found" });
      }

      res.json({ message: "Class deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return router;
};
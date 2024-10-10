const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

module.exports = (db) => {
  // Get all classes
  router.get("/", async (req, res) => {
    try {
      const classes = await db.collection("classes").find().toArray();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create a new class
  router.post("/", async (req, res) => {
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
          end: req.body.classHours.end,
        },
        selectedDays: req.body.selectedDays,
      };
      // Update students to include this class
      if (newClass.participants && newClass.participants.length > 0) {
        await db
          .collection("students")
          .updateMany(
            { student_id: { $in: newClass.participants } },
            { $addToSet: { class_signed_up: newClass.name } }
          );
      }

      const result = await db.collection("classes").insertOne(newClass);
      console.log("Class created:", result);
      res.status(201).json({
        message: "Class created successfully",
        classId: result.insertedId,
      });
    } catch (error) {
      console.error("Error creating class:", error);
      res.status(400).json({ message: error.message });
    }
  });

  // Remove class (DELETE request)
  router.delete("/:id", async (req, res) => {
    try {
      const classId = new ObjectId(req.params.id);
      const result = await db.collection("classes").deleteOne({ _id: classId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Class not found" });
      }

      res.json({ message: "Class deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Update class (PUT request)
  router.put("/:id", async (req, res) => {
    try {
      const classId = new ObjectId(req.params.id);
      const updatedClass = {
        name: req.body.name,
        info: req.body.info,
        participants: req.body.participants,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        classHours: req.body.classHours,
        selectedDays: req.body.selectedDays,
      };

      // Get the current class data
      const currentClass = await db
        .collection("classes")
        .findOne({ _id: classId });

      // Find students to remove
      const studentsToRemove = currentClass.participants.filter(
        (id) => !updatedClass.participants.includes(id)
      );

      const result = await db
        .collection("classes")
        .updateOne({ _id: classId }, { $set: updatedClass });

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Class not found" });
      }

      // Update students' class_signed_up array for added students
      await db
        .collection("students")
        .updateMany(
          { student_id: { $in: updatedClass.participants } },
          { $addToSet: { class_signed_up: updatedClass.name } }
        );

      // Remove the class from students who were removed
      await db
        .collection("students")
        .updateMany(
          { student_id: { $in: studentsToRemove } },
          { $pull: { class_signed_up: updatedClass.name } }
        );

      const updatedClassData = await db
        .collection("classes")
        .findOne({ _id: classId });
      res.json({
        message: "Class updated successfully",
        class: updatedClassData,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return router;
};

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import StudentSearch from '../student/StudentSearch';

const EditClassModal = ({ classData, onSave, onClose }) => {
    console.log("Class Data", classData);
    console.log("Class Data Participants", classData.participants);

    // Initialize state with selected students
    const [selectedStudents, setSelectedStudents] = useState([]);

    // Fetch full student data for the participants
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/students");
                const allStudents = await response.json();

                // Filter students to only include those in the class participants
                const classStudents = allStudents.filter(student =>
                    classData.participants.includes(student.student_id)
                );

                setSelectedStudents(classStudents);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, [classData.participants]);

    // Helper function to format date strings
    const formatDate = useCallback((dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }, []);

    // Initialize state with formatted class data
    const [editedClass, setEditedClass] = useState(() => ({
        ...classData,
        startDate: formatDate(classData.startDate),
        endDate: formatDate(classData.endDate),
        classHours: {
            start: classData.classHours.start,
            end: classData.classHours.end
        }
    }));

    // Handle form input changes
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setEditedClass(prev => {
            if (name.includes('.')) {
                const [objName, key] = name.split('.');
                return {
                    ...prev,
                    [objName]: { ...prev[objName], [key]: value }
                };
            }
            return { ...prev, [name]: value };
        });
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedClassData = {
                ...editedClass,
                participants: selectedStudents.map(s => s.student_id),
                startDate: new Date(editedClass.startDate).toISOString(),
                endDate: new Date(editedClass.endDate).toISOString(),
            };

            const response = await fetch(`http://localhost:5001/api/classes/${classData._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedClassData),
            });

            if (response.ok) {
                const updatedClass = await response.json();
                onSave(updatedClass);
            } else {
                alert("Failed to update class");
            }
        } catch (error) {
            console.error("Error updating class:", error);
            alert("An error occurred while updating the class");
        }
    };

    // Render form fields
    const renderField = useCallback((label, name, type = "text", value) => (
        <div className="mb-4" key={name}>
            <label className="block mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
        </div>
    ), [handleChange]);

    const handleRemoveStudent = (studentToRemove) => {
        setSelectedStudents(selectedStudents.filter(student => student.student_id !== studentToRemove.student_id));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Edit Class</h2>
                <form onSubmit={handleSubmit}>
                    {renderField("Name", "name", "text", editedClass.name)}
                    <div className="mb-4">
                        <label className="block mb-2">Info</label>
                        <textarea
                            name="info"
                            value={editedClass.info}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Students List
                        </label>
                        <StudentSearch
                            selectedStudents={selectedStudents}
                            setSelectedStudents={setSelectedStudents}
                        />
                    </div>
                    {renderField("Start Date", "startDate", "date", editedClass.startDate)}
                    {renderField("End Date", "endDate", "date", editedClass.endDate)}
                    {renderField("Class Hours Start", "classHours.start", "time", editedClass.classHours.start)}
                    {renderField("Class Hours End", "classHours.end", "time", editedClass.classHours.end)}
                    <div className="flex justify-end space-x-2">
                        <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditClassModal;

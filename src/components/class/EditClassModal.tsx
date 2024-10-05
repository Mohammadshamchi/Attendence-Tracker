import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

function EditClassModal({ classData, onSave, onClose }) {
    const [editedClass, setEditedClass] = useState({
        ...classData,
        startDate: formatDate(classData.startDate),
        endDate: formatDate(classData.endDate),
        classHours: {
            start: classData.classHours.start,
            end: classData.classHours.end
        }
    });

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedClass(prev => {
            if (name.includes('.')) {
                const [objName, key] = name.split('.');
                return {
                    ...prev,
                    [objName]: {
                        ...prev[objName],
                        [key]: value
                    }
                };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedClassData = {
                ...editedClass,
                startDate: new Date(editedClass.startDate).toISOString(),
                endDate: new Date(editedClass.endDate).toISOString(),
                classHours: {
                    start: editedClass.classHours.start,
                    end: editedClass.classHours.end
                }
            };

            const response = await fetch(`http://localhost:5001/api/classes/${classData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Edit Class</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={editedClass.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
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
                        <label className="block mb-2">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={editedClass.startDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={editedClass.endDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Class Hours Start</label>
                        <input
                            type="time"
                            name="classHours.start"
                            value={editedClass.classHours.start}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Class Hours End</label>
                        <input
                            type="time"
                            name="classHours.end"
                            value={editedClass.classHours.end}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    {/* Add more fields as needed */}
                    <div className="flex justify-end space-x-2">
                        <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditClassModal;
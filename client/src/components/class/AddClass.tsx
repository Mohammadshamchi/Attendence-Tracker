import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import StudentSearch from '../student/StudentSearch';
import { toast } from "sonner"

type StudentData = {
    student_id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    notes: string;
};

const DaySelector = ({ selectedDays, setSelectedDays }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDay = (day) => {
        setSelectedDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                className="w-full p-2 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedDays.length > 0
                    ? `Selected: ${selectedDays.join(', ')}`
                    : 'Select days'}
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <div key={day} className="flex items-center p-2 hover:bg-gray-100">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={selectedDays.includes(day)}
                                onChange={() => toggleDay(day)}
                            />
                            {day}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function AddClass({ onSubmit }) {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [className, setClassName] = useState('');
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [toDate, setToDate] = useState("");
    const [fromTime, setFromTime] = useState('12:00');
    const [toTime, setToTime] = useState('14:00');
    const [notes, setNotes] = useState('');
    const [selectedStudents, setSelectedStudents] = useState<StudentData[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    interface FormErrors {
        className?: string;
        fromDate?: string;
        toDate?: string;
        fromTime?: string;
        toTime?: string;
        selectedDays?: string;
    }

    interface NewClass {
        name: string;
        info: string;
        participants: string[];
        startDate: string;
        endDate: string;
        classHours: {
            start: string;
            end: string;
        };
        selectedDays: string[];
    }

    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};
        if (!className.trim()) errors.className = "Class name is required";
        if (!fromDate) errors.fromDate = "Start date is required";
        if (!toDate) errors.toDate = "End date is required";
        if (!fromTime) errors.fromTime = "Start time is required";
        if (!toTime) errors.toTime = "End time is required";
        if (selectedDays.length === 0) errors.selectedDays = "At least one day must be selected";

        // Additional validations
        if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
            errors.toDate = "End date must be after start date";
        }
        if (fromTime && toTime && fromTime >= toTime) {
            errors.toTime = "End time must be after start time";
        }

        return errors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm();
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const newClass: NewClass = {
                    name: className.trim(),
                    info: notes.trim(),
                    participants: selectedStudents.map(s => s.student_id),
                    startDate: fromDate,
                    endDate: toDate,
                    classHours: {
                        start: fromTime,
                        end: toTime
                    },
                    selectedDays: selectedDays
                };

                const response = await axios.post('http://localhost:5001/api/classes', newClass);

                if (response.status === 201) {
                    toast.success("Class has been created successfully!");
                    // Reset form fields here
                    resetForm();
                } else {
                    toast.error(`Failed to create class. Server responded with status: ${response.status}`);
                }
            } catch (error) {
                handleApiError(error);
            }
        } else {
            const errorFields = Object.keys(errors).join(', ');
            toast.error(`Please correct the following fields: ${errorFields}`);
        }
    };

    const handleApiError = (error: unknown) => {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                toast.error(`Server error: ${axiosError.response.status} - ${axiosError.response.data}`);
            } else if (axiosError.request) {
                toast.error('No response received from the server. Please check your internet connection.');
            } else {
                toast.error(`Error setting up the request: ${axiosError.message}`);
            }
        } else {
            toast.error('An unexpected error occurred. Please try again later.');
        }
        console.error('Error creating class:', error);
    };

    const resetForm = () => {
        // Reset all form fields here
        setClassName('');
        setFromDate('');
        setToDate('');
        setFromTime('');
        setToTime('');
        setSelectedDays([]);
        setSelectedStudents([]);
        setNotes('');
        setErrors({});
    };
    return (
        <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-3">Class Name</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Abstract Class"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={className}
                        onChange={e => setClassName(e.target.value)}
                        required
                    />
                    {errors.className && <p className="text-red-500 text-xs mt-1">{errors.className}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Days of the Week
                    </label>
                    <DaySelector selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
                </div>

                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            From
                        </label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={e => setFromDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        {errors.className && <p className="text-red-500 text-xs mt-1">{errors.className}</p>}
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            to
                        </label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={e => setToDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        {errors.className && <p className="text-red-500 text-xs mt-1">{errors.className}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Students List
                    </label>
                    <StudentSearch
                        selectedStudents={selectedStudents}
                        setSelectedStudents={setSelectedStudents}
                    />
                </div>

                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            From
                        </label>
                        <input
                            type="time"
                            value={fromTime}
                            onChange={e => setFromTime(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        {errors.className && <p className="text-red-500 text-xs mt-1">{errors.className}</p>}
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            to
                        </label>
                        <input
                            type="time"
                            value={toTime}
                            onChange={e => setToTime(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        {errors.className && <p className="text-red-500 text-xs mt-1">{errors.className}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Anything for Notes
                    </label>
                    <textarea
                        placeholder="Value"
                        rows={3}
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

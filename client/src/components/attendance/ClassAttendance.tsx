'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Info, X, Check } from "lucide-react"


interface Student {
    _id: string
    first_name: string
    last_name: string
    attendance_history: boolean[]
}

export default function ClassAttendance({ className }) {
    const [students, setStudents] = useState<Student[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/students/class/${className}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                const data = await response.json();
                setStudents(data);
            } catch (err) {
                setError('Failed to fetch students. Please try again later.');
                console.error('Error fetching students:', err);
            }
        };

        if (className) {
            fetchStudents();
        }
    }, [className]);
    const toggleAttendance = (studentId: string, day: number) => {
        setStudents(students.map(student =>
            student._id === studentId
                ? { ...student, attendance_history: student.attendance_history.map((att, index) => index === day ? !att : att) }
                : student
        ))
    }

    const addStudent = async () => {
        const newStudent = {
            _id: Date.now().toString(), // Temporary ID
            first_name: `New`,
            last_name: `Student`,
            class_signed_up: [className], // Add the student to this class
            attendance_history: new Array(5).fill(false)
        };

        // Here you would typically make an API call to add the student to the backend
        // For now, we'll just add it to the local state
        setStudents([...students, newStudent]);
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Class Info</h1>
                </div>
                <Button onClick={addStudent}>Add Student</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Student Name</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead className="text-right">More Info</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student._id}>
                            <TableCell className="font-medium">{`${student.first_name} ${student.last_name}`}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    {student.attendance_history.map((present, index) => (
                                        <button
                                            key={index}
                                            onClick={() => toggleAttendance(student._id, index)}
                                            className={`w-6 h-6 rounded-full flex items-center justify-center ${present ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                        >
                                            {present ? <Check size={14} /> : <X size={14} />}
                                        </button>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Info className="inline-block" size={20} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
import { useEffect, useRef, useState } from 'react';
import { initialStudents, StudentData, ClassData, initialClasses } from "../../utils/FakeData"; // Assuming your data is in a separate file


const StudentSearch = ({ selectedStudents, setSelectedStudents }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<StudentData[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            setIsOpen(false);
            return;
        }

        const results = initialStudents.filter(student =>
            student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
        setIsOpen(results.length > 0);
    }, [searchTerm]);

    const toggleStudent = (student: StudentData) => {
        setSelectedStudents(prev =>
            prev.some(s => s.student_id === student.student_id)
                ? prev.filter(s => s.student_id !== student.student_id)
                : [...prev, student]
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pr-8 border border-gray-300 rounded-md"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>
            {isOpen && searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {searchResults.map(student => (
                        <div
                            key={student.student_id}
                            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => toggleStudent(student)}
                        >
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={selectedStudents.some(s => s.student_id === student.student_id)}
                                readOnly
                            />
                            {student.first_name} {student.last_name} ({student.student_id})
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default StudentSearch
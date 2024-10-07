import { useEffect, useRef, useState } from 'react';
import { ClassData, initialClasses } from "../../utils/FakeData"; // Assuming your data is in a separate file


const ClassSearch = ({ selectedClass, setSelectedClass }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<ClassData[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:5001/api/classes");
            const data = await response.json();
            setClasses(data);
        }
        console.log('All User Page');
        fetchData();
    }, [])


    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            setIsOpen(false);
            return;
        }

        const results = classes.filter(c => {

            return (c.name.toLowerCase().includes(searchTerm.toLowerCase()))

        }
        );
        setSearchResults(results);
        setIsOpen(results.length > 0);
    }, [searchTerm]);



    const toggleClass = (eachClass: ClassData) => {
        setSelectedClass(prev =>
            prev.some(c => c.eachClass === eachClass.name)
                ? prev.filter(c => c.eachClass !== eachClass.name)
                : [...prev, eachClass]
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
                placeholder="Search Classes..."
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
                    {searchResults.map(eachClass => (
                        <div
                            key={eachClass._id}
                            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => toggleClass(eachClass)}
                        >
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={selectedClass.some(c => c.name === eachClass.name)}
                                readOnly
                            />
                            {eachClass.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default ClassSearch
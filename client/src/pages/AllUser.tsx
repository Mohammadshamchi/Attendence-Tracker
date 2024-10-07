import UserCard from "@/components/common/UserCard";
import { useEffect, useState } from "react";


export default function AllUser() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:5001/api/students");
            const data = await response.json();
            console.log(data)
            setStudents(data);
        }
        console.log('All User Page');
        fetchData();


    }, [])




    return (
        <div className="all-user">
            {students.map((student, index) => (
                <UserCard key={index} name={student.first_name} phone={student.phone_number} />

            ))}
        </div>
    );
}
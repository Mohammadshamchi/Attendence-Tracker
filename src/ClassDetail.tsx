import { useState } from "react";
import { initialClasses } from "./FakeData";
import PageInfo from "./components/PageInfo";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import "./App.css";



function ClassDetail() {
    const [classes, setClasses] = useState(initialClasses);



    return (
        <div >
            <PageInfo />
            <Table>
                <TableCaption>A list of This Class Students.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Student List</TableHead>
                        <TableHead>Attendance</TableHead>

                        <TableHead className="text-right">More Info</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
<<<<<<< HEAD
                        <TableCell className="font-medium">Student 1</TableCell>
                        <TableCell>✅✅✅❌✅</TableCell>
                        <TableCell className="text-right">
                            <button className="btn btn-primary">View</button>
=======
                        <TableCell className="font-medium">Student1</TableCell>
                        <TableCell>
                            ✅✅✅❌✅
                        </TableCell>
                        <TableCell className="text-right">
                            <button>View</button>

>>>>>>> fb973c9314457194c07542080cb317c60c39d537
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default ClassDetail;

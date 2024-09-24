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
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Student List</TableHead>
                        <TableHead>Attendance</TableHead>

                        <TableHead className="text-right">More Info</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Student 1</TableCell>
                        <TableCell>✅✅✅❌✅</TableCell>
                        <TableCell className="text-right">
                            <button className="btn btn-primary">View</button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default ClassDetail;

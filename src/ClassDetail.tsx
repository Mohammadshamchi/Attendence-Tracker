import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { Button } from "@/components/ui/button";

import "./App.css";

function ClassDetail() {
    const location = useLocation();
    const [classData, setClassData] = useState(location.state?.classData || {});

    useEffect(() => {
        if (location.state?.classData) {
            setClassData(location.state.classData);
        }
    }, [location]);
    useEffect(() => {
        console.log("Class Data:", classData);
    }, [classData]);


    return (
        <div className="max-w-5xl mx-auto px-4 mt-8">
            <div className="flex justify-between items-start mb-6">
                <PageInfo title={classData.name || "Class Title111"} subtitle={classData.info || "Class Title111"} />
                <div className="flex-grow flex justify-end">
                    <Button variant="destructive">Delete Class</Button>
                </div>
            </div>
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
                        <TableCell className="font-medium">Student 1</TableCell>
                        <TableCell>✅✅✅❌✅</TableCell>
                        <TableCell className="text-right">
                            <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">
                            <Button>Add to class</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default ClassDetail;
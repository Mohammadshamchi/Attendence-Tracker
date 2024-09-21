import React from "react";
import { useState } from "react";
import { initialClasses } from "./FakeData";
import { Calendar } from "@/components/ui/calendar"
import PageInfo from "./components/PageInfo";
import ClassInfoCard from "./components/ClassInfoCard";

import "./App.css";



function Dashboard() {
    const [classes, setClasses] = useState(initialClasses);
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    console.log(classes);

    return (
        <div className="App">
            <PageInfo />
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
            <ClassInfoCard classInfo={classes} />
            <ClassInfoCard classInfo={classes} />
        </div>
    );
}

export default Dashboard;

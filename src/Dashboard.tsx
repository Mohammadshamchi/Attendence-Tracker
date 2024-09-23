import React from "react";
import { useState, useEffect } from "react";
import { initialClasses, ClassData } from "./FakeData";
import { Calendar } from "@/components/ui/calendar"
import PageInfo from "./components/PageInfo";
import ClassInfoCard from "./components/ClassInfoCard";
import { getCurrentFormattedDate } from "./dateUtils.ts";
import "./App.css";

function Dashboard() {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date())
  const formattedDate = getCurrentFormattedDate();

  useEffect(() => {
    setClasses(initialClasses);
  }, []);

  console.log("Classes:", classes); // Add this line to check the classes state

  return (
    <div className="App">
      <PageInfo title="Dashboard" subtitle={formattedDate} />
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      {classes.length > 0 ? (
        classes.map((classItem) => (
          <ClassInfoCard key={classItem.id} classInfo={classItem} />
        ))
      ) : (
        <p>No classes available.</p>
      )}
    </div>
  );
}

export default Dashboard;
import React from "react";
import { useState, useEffect } from "react";
import { initialClasses, ClassData } from "../utils/FakeData.ts";
import { Calendar } from "@/components/ui/calendar"
import PageInfo from "../components/common/PageInfo.tsx";
import ClassInfoCard from "../components/class/ClassInfoCard.tsx";
import { getCurrentFormattedDate } from "../utils/dateUtils.ts";
import "../styles/App.css";

function Dashboard() {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date())
  const formattedDate = getCurrentFormattedDate();

  useEffect(() => {
    setClasses(initialClasses);
  }, []);


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
          // if selected date is in range of classItem.startDate and classItem.endDate
          // then show the classItem
          (date ?? "new Date()") >= classItem.startDate && (date ?? "new Date()") <= classItem.endDate && (
            <ClassInfoCard key={classItem.id} classInfo={classItem} />
          )
        ))
      ) : (
        <p>No classes available.</p>
      )}
    </div>
  );
}

export default Dashboard;
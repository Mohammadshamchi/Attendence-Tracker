import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar"
import PageInfo from "../components/common/PageInfo";
import ClassInfoCard from "../components/class/ClassInfoCard";
import { getCurrentFormattedDate } from "../utils/dateUtils";
import "../styles/App.css";

interface ClassItem {
  _id: string;
  name: string;
  info: string;
  participants: any[];
  startDate: string;
  endDate: string;
}

function Dashboard() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [date, setDate] = useState<Date>(new Date())
  const formattedDate = getCurrentFormattedDate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5001/api/classes");
      const data = await response.json();
      setClasses(data);
    }
    console.log('All User Page');
    fetchData();
  }, [])

  const isDateInRange = (classItem: ClassItem, selectedDate: Date) => {
    const startDate = new Date(classItem.startDate);
    const endDate = new Date(classItem.endDate);
    return selectedDate >= startDate && selectedDate <= endDate;
  }

  return (
    <div className="App">
      <PageInfo title="Dashboard" subtitle={formattedDate} />
      <Calendar
        mode="single"
        selected={date}
        onSelect={(newDate) => newDate && setDate(newDate)}
        className="rounded-md border"
      />

      {classes.length > 0 ? (
        classes.map((classItem, index) => (
          isDateInRange(classItem, date) && (
            <ClassInfoCard key={classItem._id} classInfo={classItem} />
          )
        ))
      ) : (
        <p>No classes available.</p>
      )}
    </div>
  );
}

export default Dashboard;

### These are my updated code : 
``` 
interface ClassData {
  id: number;
  name: string;
  info: string;
  participants: string[];
  startDate: Date;
  endDate: Date;
  classHours: {
    start: string;
    end: string;
  };
}

export const initialClasses: ClassData[] = [
  {
    id: 1,
    name: "Introduction to React",
    info: "Learn the basics of React framework",
    participants: ["Alice", "Bob", "Charlie"],
    startDate: new Date(2024, 8, 1), // September 1, 2024
    endDate: new Date(2024, 11, 15), // December 15, 2024
    classHours: {
      start: "10:00",
      end: "12:00"
    }
  },
  {
    id: 2,
    name: "Advanced JavaScript",
    info: "Deep dive into JavaScript concepts",
    participants: ["David", "Eve", "Frank"],
    startDate: new Date(2024, 8, 5), // September 5, 2024
    endDate: new Date(2024, 11, 20), // December 20, 2024
    classHours: {
      start: "14:00",
      end: "16:00"
    }
  },
  // Add more classes as needed
];
export type { ClassData };


import React from "react";
import { useState } from "react";
import { initialClasses } from "./FakeData";
import { Calendar } from "@/components/ui/calendar"
import PageInfo from "./components/PageInfo";
import ClassInfoCard from "./components/ClassInfoCard";
import { getCurrentFormattedDate } from "./dateUtils.ts";
import "./App.css";

function Dashboard() {
  const [classes, setClasses] = useState(initialClasses);
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const formattedDate = getCurrentFormattedDate();

  console.log(classes);

  return (
    <div className="App">
      <PageInfo title="Dashboard" subtitle={formattedDate} />
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      {classes.map((classItem) => {
        return <ClassInfoCard key={classItem.id} classInfo={classItem} />;
      })}
    </div>
  );
}

export default Dashboard;

import { useState } from "react";
import { initialClasses } from "./FakeData";
import PageInfo from "./components/PageInfo";
import ClassInfoCard from "./components/ClassInfoCard";
import { getCurrentFormattedDate } from "./dateUtils.ts";

import "./App.css";

function ClassesPage() {
    const [classes, setClasses] = useState(initialClasses);
    const formattedDate = getCurrentFormattedDate();
    console.log(classes);

    return (
        <div className="">
            <PageInfo title="All Classes" subtitle={formattedDate} />
            {classes.map((classItem) => {
                return <ClassInfoCard key={classItem.id} classInfo={classItem} />;
            })}
        </div>
    );
}

export default ClassesPage;
```
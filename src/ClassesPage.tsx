import { useState } from "react";
import { initialClasses } from "./FakeData";
import PageInfo from "./components/PageInfo";
import ClassInfoCard from "./components/ClassInfoCard";
import { getCurrentFormattedDate } from "./dateUtils.ts";

import "./App.css";



function ClassesPage() {
    const [classes, setClasses] = useState(initialClasses);
    const formattedDate = getCurrentFormattedDate();


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

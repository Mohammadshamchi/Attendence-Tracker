import { useState } from "react";
import { initialClasses } from "./FakeData";
import PageInfo from "./components/PageInfo";
import ClassInfoCard from "./components/ClassInfoCard";

import "./App.css";



function ClassesPage() {
    const [classes, setClasses] = useState(initialClasses);

    console.log(classes);

    return (
        <div className="">
            <PageInfo />
            <ClassInfoCard classInfo={classes} />
            <ClassInfoCard classInfo={classes} />
        </div>
    );
}

export default ClassesPage;

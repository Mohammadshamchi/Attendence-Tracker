import { useState } from "react";
import "./App.css";
import { initialClasses } from "./FakeData";
import ClassesPage from "./ClassesPage";
import Dashboard from "./Dashboard";
import StudentsPage from "./StudentsPage";
import UserCard from "./UserCard";







function App() {
  const [classes, setClasses] = useState(initialClasses);

  console.log(classes);

  return (
    <div className="App">
      {/* <Dashboard />
      <ClassesPage />
      <StudentsPage /> */}
      <UserCard />

    </div>
  );
}

export default App;

import { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { initialClasses } from "./utils/FakeData";
import ClassesPage from "./pages/ClassesPage";
import Dashboard from "./pages/Dashboard";
import ClassDetail from "./pages/ClassDetail";
import UserCard from "./components/common/UserCard";
import AddClass from './components/class/AddClass';
import AddStudent from "./components/student/AddStudent";






function App() {
  const [classes, setClasses] = useState(initialClasses);


  return (
    <>
      <div className="App">
        <BrowserRouter>
          <nav className="navigation-header">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/classess">All Classes</Link>
              </li>
              <li>
                <Link to="/classdetail">Class Detail </Link>
              </li>
              <li>
                <Link to="/studentcard">Student Card </Link>
              </li>
              <li>
                <Link to="/addclass">Add Class </Link>
              </li>
              <li>
                <Link to="/addstudent">Add Student </Link>
              </li>
            </ul>
            <hr />
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/classess" element={<ClassesPage />}></Route>
            <Route path="/classdetail" element={<ClassDetail />}></Route>
            <Route path="/studentcard" element={<UserCard />}></Route>
            <Route path="/addclass" element={<AddClass />}></Route>
            <Route path="/addstudent" element={<AddStudent />}></Route>
            <Route path="*" element={<p>404 page here</p>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

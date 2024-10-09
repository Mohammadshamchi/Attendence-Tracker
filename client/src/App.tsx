import { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { initialClasses } from "./utils/FakeData";
import ClassesPage from "./pages/ClassesPage";
import Dashboard from "./pages/Dashboard";
import ClassDetail from "./pages/ClassDetail";
import AllUser from "./pages/AllUser";
import AddClass from './components/class/AddClass';
import AddStudent from "./components/student/AddStudent";
import { Toaster } from "@/components/ui/sonner"







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
                <Link to="/alluser">All Students </Link>
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
            <Route path="/alluser" element={<AllUser />}></Route>
            <Route path="/addclass" element={<AddClass />}></Route>
            <Route path="/addstudent" element={<AddStudent />}></Route>
            <Route path="*" element={<p>404 page here</p>}></Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </>
  );
}

export default App;

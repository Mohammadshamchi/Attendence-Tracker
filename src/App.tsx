import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { initialClasses } from "./FakeData";
import ClassesPage from "./ClassesPage";
import Dashboard from "./Dashboard";
import ClassDetail from "./ClassDetail";
import UserCard from "./UserCard";






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
            </ul>
            <hr />
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/classess" element={<ClassesPage />}></Route>
            <Route path="/classdetail" element={<ClassDetail />}></Route>
            <Route path="/studentcard" element={<UserCard />}></Route>
            <Route path="*" element={<p>404 page here</p>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

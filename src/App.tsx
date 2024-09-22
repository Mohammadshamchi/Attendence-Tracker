import { useState } from "react";
import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
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
    <>
    <div className="App">
      <BrowserRouter>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/classess">All Classes</Link>
            </li>
            <li>
              <Link to="/studentpage">Students Page </Link>
            </li>
            <li>
              <Link to="/studentcard">Student Card </Link>
            </li>
            <li>
              <Link to="/non-existing-page">Non existing page</Link> (should trigger 404)
            </li>
          </ul>
        </nav>
          <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/classess" element={<ClassesPage/>}></Route>
              <Route path="/studentpage" element={ <StudentsPage />}></Route>
              <Route path="/studentcard" element={<UserCard />}></Route>
              <Route path="*" element={<p>404 page here</p>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;

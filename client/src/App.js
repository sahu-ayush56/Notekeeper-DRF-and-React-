import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.css";
import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";
export default function App() {
  return (
    <Router>
      <div className="App">
      <div className = "container-sm">
        <Header />
          <Routes>
            <Route exact path="/" element={<NotesListPage />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Routes>
      </div>
      </div>
    </Router>
  );
}

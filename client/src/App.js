import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.css";
import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./utils/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import SignupPage from "./pages/SignupPage";
export default function App() {
  return (
    <Router>
      <div className="App">
      <AuthProvider>
      <div className = "container-sm">
        <Header />
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignupPage />} />
            <Route path="/notes" element={<PrivateRoute><NotesListPage /></PrivateRoute>} />
            <Route path="/note/:id" element={<PrivateRoute><NotePage /></PrivateRoute>} />
          </Routes>
      </div>
      </AuthProvider>
      </div>
    </Router>
  );
}

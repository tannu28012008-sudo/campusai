import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("home");

  if (page === "login") {
    return <Login onLogin={() => setPage("dashboard")} />;
  }

  if (page === "dashboard") {
    return <Dashboard />;
  }

  return (
    <main className="app">
      <nav className="navbar">
        <div className="logo">
          Campus<span>AI</span>
        </div>
        <div className="badge">AI-Powered Campus</div>
      </nav>

      <section className="hero">
      <h1 className="hero-title">
      <span className="hero-line">Your Campus.</span>
      <span className="hero-line purple-text">Understood.</span>
      </h1>

        <p>
          Everything is announced. Almost nothing is understood.
          CampusAI turns scattered campus information into clear,
          personalized actions.
        </p>

        <div className="buttons">
          <button onClick={() => setPage("login")}>
            View Dashboard
          </button>

          <button
            className="secondary"
            onClick={() => setPage("login")}
          >
            Ask CampusAI
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
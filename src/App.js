import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Google from "./components/Google";
import Home from "./components/Home";
import Leaflet from "./components/Leaflet";
import Shell from "./components/Shell";

function App() {

  const [selectedProject, setSelectedProject] = useState({ id: 99, timestamp: Date.now() });

  const handleGoTo = (id) => {
    setSelectedProject({ id, timestamp: Date.now() });
  }
  return (
    <Router>
      <Shell goTo={handleGoTo}>
        <Routes>
          <Route exact path="/google" element={<Google selectedProject={selectedProject} />} />
          <Route exact path="/leaflet" element={<Leaflet selectedProject={selectedProject} />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </ Shell>
    </Router>
  )
}

export default App
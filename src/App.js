import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Google from "./components/Google";
import Home from "./components/Home";
import Leaflet from "./components/Leaflet";
import Cesium from "./components/Cesium";
import Shell from "./components/Shell";
import Mapbox from "./components/Mapbox";

function App() {

  const [selectedProject, setSelectedProject] = useState({ id: 99, timestamp: Date.now() });

  const handleGoTo = (id) => {
    setSelectedProject({ id, timestamp: Date.now() });
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shell goTo={handleGoTo} >  <Outlet /></Shell>} >
          <Route index element={<Home />} />
          <Route path="google" element={<Google selectedProject={selectedProject} />} />
          <Route path="leaflet" element={<Leaflet selectedProject={selectedProject} />} />
        </Route>
        <Route exact path="/cesium" element={<Cesium />} />
        <Route exact path="/mapbox" element={<Mapbox />} />
      </Routes>
    </Router>
  )
}

export default App
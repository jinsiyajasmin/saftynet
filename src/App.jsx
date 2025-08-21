import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import ISO9001Page from "../pages/ISO9001Page";
import Home from "./Home";
import Navbar from "./Navbar"; // ✅ import your Navbar component
import ISO45001View from "../pages/ISO45001View";
import ISO14001Page from "../pages/ISO14001Page";
import ISO50001Page from "../pages/ISO50001Page";
import ISO14068Page from "../pages/ISO14068Page";
import ISO27001Page from "../pages/ISO27001Pages";

export default function App() {
  return (
    <div className="dark">
      <Router>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Home />

              </>
            }
          />

          {/* ISO 9001 Page */}
          <Route
            path="/iso9001"
            element={
              <>
                <Navbar />

                <ISO9001Page />
                <Footer />
              </>
            }
          />
          <Route
            path="/iso45001"
            element={
              <>
                <Navbar />

                <ISO45001View />
                <Footer />
              </>
            }
          />
          <Route
            path="/iso14001"
            element={
              <>
                <Navbar />

                <ISO14001Page/>
                <Footer />
              </>
            }
          />
           <Route
            path="/iso50001"
            element={
              <>
                <Navbar />

                <ISO50001Page/>
                <Footer />
              </>
            }
          />
           <Route
            path="/iso14068"
            element={
              <>
                <Navbar />

                <ISO14068Page/>
                <Footer />
              </>
            }
          />
           <Route
            path="/iso27001"
            element={
              <>
                <Navbar />

                <ISO27001Page/>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IsoCards from "./IsoCards";
import CompaniesSection from "./CompaniesSection";
import Footer from "./Footer";
import ISO9001Page from "./ISO9001Page";
import Home from "./Home";

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
                <IsoCards />
                <CompaniesSection />
                <Footer />
              </>
            }
          />

          {/* ISO 9001 Page */}
          <Route
            path="/iso9001"
            element={
              <>
                <ISO9001Page />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

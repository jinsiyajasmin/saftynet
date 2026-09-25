"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function IsoPageShell({ children }) {
  return (
    <div className="dark">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

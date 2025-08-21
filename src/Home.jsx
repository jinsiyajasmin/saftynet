import React, { useState } from "react";
import { motion } from "framer-motion";
import IsoCards from "./IsoCards";
import CompaniesSection from "./CompaniesSection";
import Footer from "./Footer";
import Navbar from "./Navbar";  // ✅ import your Navbar component


export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (


    <div className="dark">
      <div className="relative h-[650px] bg-[#0d1117] text-white transition-colors duration-300 overflow-hidden">


        {/* 🔹 Animated Background Grid (unchanged) */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:80px_80px] opacity-30"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:20px_20px] opacity-10"></div>

          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:160px_160px] opacity-20"
            animate={{ backgroundPosition: ["0px 0px", "160px 160px"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          ></motion.div>

          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/20 rounded-full blur-sm"
                style={{
                  left: `${(i % 4) * 25 + 12.5}%`,
                  top: `${Math.floor(i / 4) * 50 + 25}%`,
                }}
                animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="fixed top-0 left-0 w-full z-50 bg-[#0f1419]/95 backdrop-blur-sm border-b border-gray-800/50"
          style={{ height: "120px" }}
        >
          <Navbar />
        </motion.div>


        {/* 🔹 Mobile Menu (kept for now) */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden flex flex-col items-center bg-blue-800 py-4 gap-4"
          >
            <a href="#">Services</a>
            <a href="#">ISO Management System</a>
            <a href="#">NettForm App</a>
            <a href="#">Competent Person & SSIP</a>
            <a href="#">Audits & Inspections</a>
            <a href="#">Training</a>
            <a href="#">Resources</a>
            <a href="#">About Us</a>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition">
              Get a Quote
            </button>
          </motion.div>
        )}



        {/* Hero Section */}
        <main className="px-10 pt-[220px] pb-24 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Your <span className="text-indigo-400">Trusted Partner</span> in ISO Consultancy <br />
            and Business Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Simplifying ISO management systems and empowering businesses with risk mitigation SaaS solutions and expert consultancy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex gap-4 flex-wrap justify-center"
          >
            {/* Gradient Button */}
            <button className="relative px-8 py-3 rounded-xl text-white font-medium 
               bg-gradient-to-r from-indigo-500 to-blue-600 
               shadow-lg shadow-blue-500/30
               transform transition-transform duration-300
               hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40">
              Get a Free Consultation
            </button>

            {/* Learn More Button */}
            <button className="relative px-8 py-3 border border-indigo-400 text-indigo-400 rounded-xl 
               overflow-hidden group font-medium">
              <span className="relative z-10">Learn More</span>
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                 -translate-x-full group-hover:translate-x-full
                 transition-transform duration-[1500ms] ease-in-out"
              />
            </button>
          </motion.div>
        </main>
      </div>

      {/* ✅ IsoCards is now INSIDE the main return */}
      <IsoCards />
      <CompaniesSection />
      <Footer />

      {/* Footer */}
    </div>
  );
}

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import CyberLab from './components/CyberLab';
import Projects from './components/Projects';
import Research from './components/Research';
import Certifications from './components/Certifications';
import Education from './components/Education';
import BugBounty from './components/BugBounty';
import Contact from './components/Contact';
import GlowingDotsBackground from './components/GlowingDotsBackground';
import Footer from './components/Footer';
import CinematicIntro from './components/CinematicIntro';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router>
      <div className="bg-background text-white font-sans min-h-screen flex flex-col relative">
        {/* Fullscreen Cinematic Intro & Splash Sequence */}
        <AnimatePresence mode="wait">
          {showIntro && (
            <CinematicIntro key="intro" onEnter={() => setShowIntro(false)} />
          )}
        </AnimatePresence>

        <GlowingDotsBackground />
        
        {/* Portfolio Main Content Container */}
        <motion.div
          key={showIntro ? 'intro-active' : 'intro-complete'}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex flex-col relative z-10"
        >
          <Navbar />
          <main className="flex-1 overflow-x-hidden relative z-10">
            <Routes>
              <Route path="/" element={<>
                <Hero />
                <About />
                <Experience />
                <Skills />
                <CyberLab />
                <Projects />
                <Research />
                <Certifications />
                <Education />
                <BugBounty />
                <Contact />
              </>} />
            </Routes>
          </main>
          <Footer />
        </motion.div>
      </div>
    </Router>
  );
}

export default App;

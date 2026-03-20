import React, { useState, useEffect ,useRef  } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import "./App.css";
import { useMotionValue, useSpring } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, -80]);
  const yImage = useTransform(scrollY, [0, 500], [0, -120]);

const shape1Y = useTransform(scrollY, [0, 600], [0, -200]);
const shape1X = useTransform(scrollY, [0, 600], [0, 80]);
const shape1Rotate = useTransform(scrollY, [0, 600], [15, 120]);

const shape2Y = useTransform(scrollY, [0, 600], [0, 250]);
const shape2X = useTransform(scrollY, [0, 600], [0, -120]);
const shape2Rotate = useTransform(scrollY, [0, 600], [-20, -140]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);


// 3D tilt motion values
const rotateX = useMotionValue(0);
const rotateY = useMotionValue(0);

const smoothX = useSpring(rotateX, { stiffness: 150, damping: 20 });
const smoothY = useSpring(rotateY, { stiffness: 150, damping: 20 });



// Mouse position tracking
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 20 });
const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 20 });


const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();

  // Position relative to hero
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Move light
  mouseX.set(x);
  mouseY.set(y);

  // 3D tilt based on hero dimensions
  const tiltX = (x / rect.width - 0.5) * 20;
  const tiltY = (y / rect.height - 0.5) * 20;

  rotateX.set(-tiltY);
  rotateY.set(tiltX);
};

const handleMouseLeave = () => {
  rotateX.set(0);
  rotateY.set(0);
};

const [showSocials, setShowSocials] = useState(false);

const handleNavClick = (e, targetId) => {
  e.preventDefault();
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
  setMenuOpen(false);
};

// section pop-up animation
const sectionAnimation = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.175, 0.885, 0.32, 1.25] // highly visible springy easeOutBack
    }
  }
};

  return (
    <div className="app">


      {/* NAVBAR */}<nav className="navbar">
  <div className="nav-container">

    <a
      href="#home"
      className="nav-logo"
      onClick={(e) => handleNavClick(e, "home")}
    >
      K
    </a>

    <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
      <li><a href="#about" onClick={(e)=>handleNavClick(e,"about")}>About</a></li>
      <li><a href="#skills" onClick={(e)=>handleNavClick(e,"skills")}>Skills</a></li>
      <li><a href="#projects" onClick={(e)=>handleNavClick(e,"projects")}>Projects</a></li>
      <li><a href="#experience" onClick={(e)=>handleNavClick(e,"experience")}>Experience</a></li>
      <li><a href="#education" onClick={(e)=>handleNavClick(e,"education")}>Education</a></li>
      <li><a href="#contact" onClick={(e)=>handleNavClick(e,"contact")}>Contact</a></li>
    </ul>

    {/* Hamburger (only visible on mobile) */}
    <div
      className={`hamburger ${menuOpen ? "open" : ""}`}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>

  </div>
</nav>

      {/* Splash */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ x: [0, -3, 3, -2, 2, 0] }}
              transition={{ duration: 0.3, repeat: 4 }}
            >
              <motion.h1
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 2 }}
                className="splash-title"
              >
                KAMAL
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* HERO */}
     <section
  className="hero" id="home"
   onMouseMove={handleMouseMove}
   onMouseLeave={handleMouseLeave} >

   <motion.div
  className="cursor-light"
  style={{
    left: smoothMouseX,
    top: smoothMouseY
  }}
/>

  <div className="grid-bg" />


  <motion.div
  className="glass glass-1"
  style={{
    y: shape1Y,
    x: shape1X,
    rotate: shape1Rotate
  }}
/>

<motion.div
  className="glass glass-2"
  style={{
    y: shape2Y,
    x: shape2X,
    rotate: shape2Rotate
  }}
/>



  <motion.img
    src="/kamal-avatar.png"
    alt="Kamal"
    className="hero-img"
    style={{
      y: yImage,
      rotateX: smoothX,
      rotateY: smoothY,
      transformPerspective: 1000
    }}
  />

  <motion.h1
    style={{
      y: yText,
      rotateX: smoothX,
      rotateY: smoothY,
      transformPerspective: 1000
    }}
    className="hero-title"
  >
    KAMAL
  </motion.h1>

  <p className="hero-sub">
    Software Developer 
  </p>

</section>



      {/* ABOUT */}
      <motion.section
  className="section"
  id="about"
  variants={sectionAnimation}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
>

<div className="container">

<h2>About</h2>

<p>
Software Developer with proven experience in web development,
mobile application development, React.js, programming, and
database management.
</p>

</div>

</motion.section>

      {/* SKILLS */}
     <motion.section
  className="section dark"
  id="skills"
  variants={sectionAnimation}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
>
        <div className="container">
          <h2>Skills</h2>
          <div className="grid">
            {["MERN Stack", "C & C++", "Flutter", "HTML & CSS","C#", "AWS", "Kotlin","Android Development"].map((s) => (
              <div key={s} className="card">{s}</div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PROJECTS */}
<motion.section
  className="section"
  id="projects"
  variants={sectionAnimation}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
>
  <div className="container">
    <h2>Projects</h2>

    <div className="grid">
      {[
        {
          title: "Movie Review Website ",
          desc: "Website for movie reviews with user authentication.",
          github: "https://github.com/kamal4ksk/movie-review-website"
        },
        {
          title: "Resume Website",
          desc: "A personal portfolio website showcasing projects and skills.",
          github: "https://github.com/kamal4ksk/RESUME-"
        },
        {
          title: "Pet Shop Management System",
          desc: "A Desktop Application for managing pet shop inventory and sales.",
          github: "https://github.com/kamal4ksk/Pet-Shop-Management-System"
        },
        {
          title: "Portfolio Website",
          desc: "A responsive portfolio website.",
          github: "https://github.com/kamal4ksk/portfolio-"
        }
      ].map((project, index) => (
        <a
          key={index}
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="card project-card"
        >
          <h3>{project.title}</h3>
          <p>{project.desc}</p>
          <span className="github-link">View on GitHub →</span>
        </a>
      ))}
    </div>
  </div>
</motion.section>

      {/* EXPERIENCE */}
     <motion.section
  className="section dark"
  id="experience"
  variants={sectionAnimation}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
>
        <div className="container">
          <h2>Experience</h2>
          <div className="timeline">
             <div className="timeline-item">
              <h3>PYTHON AND MACHINE LEARNING Intern</h3>
              <p>Learned Python and Machine Learning concepts and built small projects.</p>
              <p>ATMIOS TECHNOLOGIES AND SOFTWARE SOLUTIONS, KOCHI - 26.04.2023 to 26.05.2023</p>
            </div>
            <div className="timeline-item">
              <h3>MERN STACK Intern</h3>
              <p>Built scalable React applications.</p>
              <p>CELLAR INNOVATIVE DEVELOPERS, ALUVA - 23.04.2024 to 23.05.2024</p>
            </div>
            <div className="timeline-item">
              <h3>Futter Intern</h3>
              <p>Built scalable mobile applications using Flutter and Dart.</p>
              <p>CELLAR INNOVATIVE DEVELOPERS, ALUVA - 10.02.2025 to 10.03.2025</p>
            </div>
          </div>
        </div>
      </motion.section> 
      

      {/* EDUCATION */}
      <motion.section
  className="section"
  id="education"
  variants={sectionAnimation}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
>
        <div className="container">
          <h2>Education</h2>
          <div className="card">
            <h3>Bachelor’s Degree</h3>
            <p>B VOC Software Development and System Adminstration  (2022-2025)</p>
            <p>Mahathma Gandhi University </p>
          </div>
          <div className="card">
            <h3>Post Graduation Degree</h3>
            <p>M VOC Software Application Development  (2025-2027)</p>
            <p>Cochin University and Science and Technology</p>
          </div>
        </div>
      </motion.section>

{/* CONTACT */}
<motion.section
  className="section"
  id="contact"
  variants={sectionAnimation}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
>  <div className="contact-center">

    <div className="button-container">

      <button
        className="btn"
        onClick={() => setShowSocials(!showSocials)}
      >
        LET'S CONNECT
      </button>

      {[
        { icon: "fab fa-github", link: "https://github.com/kamal4ksk" },
        { icon: "fab fa-linkedin", link: "https://linkedin.com/in/kamal-ksk" },
        { icon: "fab fa-facebook-f", link: "https://www.facebook.com/kamalskumarksk" },
        { icon: "fab fa-instagram", link: "https://instagram.com/kam4l_7" },
        { icon: "fa-brands fa-x-twitter", link: "https://x.com/Kamal85191783" }
      ].map((item, i, arr) => {

        const spacing = isMobile ? 60 : 80;
        const offsetX = (i - (arr.length - 1) / 2) * spacing - (isMobile ? 20 : 35);
        return (
          <motion.a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            initial={false}
            animate={{
              x: showSocials ? offsetX : 0,
              y: showSocials ? -110 : 0,
              opacity: showSocials ? 1 : 0,
              scale: showSocials ? 1 : 0.3
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: showSocials ? i * 0.05 : 0
            }}
          >
            <i className={item.icon}></i>
          </motion.a>
        );
      })}

    </div>
  </div>
</motion.section>
    </div>
  );
}
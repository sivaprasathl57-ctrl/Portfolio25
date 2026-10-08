// src/data/portfolio.ts

export interface SocialLink {
  name: string;
  url: string;
  icon?: string; // optional icon name for Lucide
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
  credentialId?: string;
  verifyUrl?: string;
}

export interface Achievement {
  label: string;
  value: string; // keep as string for easy edit
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  domain: string;
  period: string;
  dates: string;
  location: string;
  type: string;
  credentialId?: string;
  certificateUrl?: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  badgeColor?: string;
}

export const personalData = {
  name: "Siva Prasath L",
  tagline: "Cybersecurity • VAPT • Red Team • Security Research",
  role: "Cybersecurity Student",
  positions: [
    "Ethical Hacking",
    "VAPT",
    "Security Research",
    "Python",
    "DevSecOps",
  ],
  education: {
    degree: "B.E. Computer Science & Engineering (Cyber Security)",
    institution: "Sri Shakthi Institute of Engineering and Technology",
    years: "2024–2028",
    location: "Tamil Nadu, India",
    hsc: {
      school: "Lakshmi Matric Higher Secondary School",
      location: "Manaparai / Trichy, Tamil Nadu",
      aggregate: "80%",
      year: "2024",
    },
    sslc: {
      school: "Saraswathi Vidhyalaya Matriculation Higher Secondary School",
      location: "Manaparai / Trichy, Tamil Nadu",
      aggregate: "79%",
      year: "2022",
    },
  },
  location: "Tiruchirappalli, Tamil Nadu, India",
  contact: {
    email: "sivaprasathl57@gmail.com",
    phone: "+91 8667845880",
    showPhone: true,
  },
  socialLinks: [
    { name: "GitHub", url: "https://github.com/sivaprasathl57-ctrl", icon: "github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/siva-prasath-l-b80843344", icon: "linkedin" },
    { name: "TryHackMe", url: "https://tryhackme.com/p/lsivaprasath25", icon: "globe" },
    { name: "picoCTF", url: "https://picoctf.org/profile?userid=Sivaprasath123", icon: "globe" },
  ],
  resumeUrl: "./Details/Resume.pdf",
  logoUrl: "/hero_shield_perfect.png",
  skills: {
    tools: [
      "Kali Linux",
      "Burp Suite",
      "Nmap",
      "Wireshark",
      "Metasploit",
      "John the Ripper",
    ],
    concepts: [
      "VAPT",
      "Reconnaissance",
      "Web Security",
      "Network Security",
      "Vulnerability Assessment",
      "Privilege Escalation",
      "CTF Methodology",
      "Security Research",
    ],
    programming: ["Python", "Java", "Bash", "SQL", "HTML", "CSS", "JavaScript"],
    devops: ["Git", "GitHub", "Jenkins", "Docker", "AWS", "CI/CD", "Security Automation"],
  },
  ctfStats: {
    tryHackMe: "150+ rooms/challenges",
    picoCTF: "100+ challenges",
    other: "Multiple CTF competitions",
    achievements: [
      { label: "SudoForce – 3rd place (college INT CTF)", value: "" },
    ],
  },
  projects: [
    {
      id: "cyverion",
      title: "CYVERION",
      category: "VAPT / DevSecOps / Security Automation",
      description:
        "Security‑focused development & deployment platform concept integrating vulnerability assessment, secure‑code recommendations, automated fixes, testing and DevSecOps workflows.",
      technologies: ["Python", "VAPT", "Git", "CI/CD", "DevSecOps", "Security Automation"],
      github: "https://github.com/sivaprasathl57-ctrl/cyverion",
    },
    {
      id: "exam-evaluator",
      title: "AI Exam Answer Sheet Evaluator",
      category: "AI / Education / Automation",
      description:
        "Intelligent examination evaluation system using OCR, NLP‑based semantic analysis and visual understanding for handwritten answer sheets.",
      technologies: ["Python", "OCR", "NLP", "VLM", "Computer Vision", "Automation"],
    },
    {
      id: "voice-firewall",
      title: "Voice‑Triggered Firewall Control",
      category: "Network Security / Linux / Automation",
      description:
        "Security automation project enabling firewall operations through voice‑based commands in a controlled Linux environment.",
      technologies: ["Python", "Linux", "iptables", "UFW", "Networking", "Voice Processing"],
    },
    {
      id: "mini-nessus",
      title: "Mini Nessus",
      category: "Vulnerability Assessment",
      description:
        "Lightweight vulnerability scanning platform using network discovery and Nmap‑based security assessment with a web dashboard.",
      technologies: ["Python", "Flask", "Nmap", "Vulnerability Assessment", "Web Dashboard"],
    },
    {
      id: "cybercrime-portal",
      title: "Cybercrime Investigation Portal",
      category: "Cybersecurity / Digital Investigation",
      description:
        "Investigation platform assisting investigators with case management, evidence analysis, image verification and workflow automation.",
      technologies: ["Python", "FastAPI", "PostgreSQL", "OpenCV", "Machine Learning"],
    },
  ],
  certifications: [
    { name: "TryHackMe Pre‑Security", issuer: "TryHackMe", year: 2025 },
    { name: "Certified Phishing Specialist", issuer: "Cyber Academy", year: 2025 },
    { name: "Ransomware Protection", issuer: "Cyber Academy", year: 2025 },
  ],
  achievements: [
    { label: "TryHackMe rooms/challenges", value: "50+" },
    { label: "picoCTF challenges", value: "60+" },
    { label: "Certificates", value: "20+" },
    { label: "Badges", value: "3+" },
    { label: "SudoForce – 3rd place (college INT CTF)", value: "" },
  ],
  experiences: [
    {
      id: "info-croft",
      role: "Cyber Security Intern",
      company: "INFO CROFT",
      domain: "Cyber Security & Threat Assessment",
      period: "Sep 2025 – Oct 2025",
      dates: "18-09-2025 to 18-10-2025",
      location: "India (MSME Recognized)",
      type: "Internship",
      credentialId: "DS25-008",
      certificateUrl: "/Certi/Info_Croft_Cyber_Security_Internship_Certificate.pdf",
      description:
        "Completed an intensive cyber security internship under MSME recognition, actively working on real-time cybersecurity projects, threat surface identification, and hands-on vulnerability analysis.",
      responsibilities: [
        "Evaluated live cybersecurity project workflows to identify security gaps and misconfigurations.",
        "Conducted vulnerability assessments and simulated reconnaissance across targeted environments.",
        "Demonstrated proactive problem-solving and in-depth understanding of offensive and defensive cyber tactics.",
        "Created structured technical reports and remediation steps for practical security flaws."
      ],
      skills: ["Cyber Security", "VAPT", "Threat Assessment", "Vulnerability Discovery", "Network Security", "Linux", "Real-Time Projects"],
      badgeColor: "border-cyan-500/40 text-cyan-300 bg-cyan-950/50"
    },
    {
      id: "unessa-foundation",
      role: "Python Development Intern",
      company: "Unessa Foundation",
      domain: "Software Engineering & Automation",
      period: "Jan 2026 – Present",
      dates: "January 2026",
      location: "Remote",
      type: "Internship",
      credentialId: "azv8cwtbhoc",
      certificateUrl: "/Certi/SIVA PRASATH. L__Hired_Certificate.pdf",
      description:
        "Selected through Internshala for a Python Development role focused on engineering automation scripts, backend components, and workflow tooling.",
      responsibilities: [
        "Developing modular Python scripts for data processing, system automation, and testing.",
        "Integrating secure API endpoints and optimizing backend script execution speed.",
        "Collaborating with team members using Git for version control and issue tracking."
      ],
      skills: ["Python", "Automation", "Git", "REST APIs", "Backend Engineering", "Linux"],
      badgeColor: "border-purple-500/40 text-purple-300 bg-purple-950/50"
    }
  ]
};


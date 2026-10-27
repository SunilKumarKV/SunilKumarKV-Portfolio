import { FEATURED_PRODUCTS } from './featuredProjects';

/**
 * Master Real-Data File: Sunil Kumar K V Portfolio
 * Single source of truth containing verified professional background,
 * enterprise operational milestones, academic credentials, and categorized competencies.
 */

export const portfolioData = {
  featuredProducts: FEATURED_PRODUCTS,
  profile: {
    name: "Sunil Kumar K V",
    brandName: "SunilCraft",
    title: "Full-Stack Developer & Systems Automation Specialist",
    shortTitle: "Full-Stack Developer",
    tagline: "Bridging 3+ years of enterprise operational rigor with modern React architecture and workflow automation.",
    bio: "Full-Stack Developer and Systems Automation Specialist with 3+ years of enterprise operations experience at Reliance Retail Ltd. (SAP MM), transitioned into modern web architecture. Specializes in building high-performance web applications using React.js, JavaScript (ES6+), and Tailwind CSS, backed by automated workflows with n8n and REST APIs.",
    location: "Bengaluru, KA, India",
    email: "sunilkumarkv9535@gmail.com",
    phone: "+91 8550032158",
    github: "https://github.com/SunilKumarKV",
    linkedin: "https://www.linkedin.com/in/sunilkumarkv44",
    availability: "Available for Full-Time Engineering Roles & Strategic Contracts",
    metrics: [
      { label: "Enterprise Experience", value: "3+ Years", detail: "Reliance Retail Ltd. (SAP MM)" },
      { label: "Inventory Discrepancy", value: "-15%", detail: "Audit & reconciliation accuracy" },
      { label: "SKU Clearance Rate", value: "+10-12%", detail: "Replenishment automation" },
      { label: "Excellence Awards", value: "4x", detail: "2x Star of Month, 2x Best Support" },
    ],
  },

  professionalExperience: [
    {
      id: "reliance-retail",
      company: "Reliance Retail Ltd.",
      role: "SAP MM & Commercial Associate",
      location: "Bangalore, India",
      period: "September 2022 – November 2025",
      duration: "3+ Years",
      type: "Full-time Enterprise Operations",
      summary: "Managed enterprise inventory systems, commercial operations, and multi-channel financial reconciliation, establishing a solid foundation in business-critical data precision and systematic problem-solving.",
      stats: [
        {
          value: "-15%",
          label: "Inventory Discrepancies",
          detail: "Achieved via proactive inventory auditing & tracking",
        },
        {
          value: "+10–12%",
          label: "Aged-SKU Clearance",
          detail: "Driven by custom reporting automation",
        },
        {
          value: "Multi-Channel",
          label: "POS / UPI / NEFT",
          detail: "Daily commercial reconciliation & audit balancing",
        },
      ],
      responsibilities: [
        "Monitored and reconciled real-time enterprise stock movements in SAP MM, minimizing audit variances.",
        "Automated recurring aged-SKU reporting to accelerate stock clearance and eliminate operational latency.",
        "Audited and balanced daily store commercial transactions across digital and POS payment streams.",
      ],
      awards: [
        { title: "Support Star of the Month", count: "2x", note: "Awarded for operational excellence & defect prevention" },
        { title: "Best Support Person", count: "2x", note: "Awarded for exemplary cross-functional audit coordination" },
      ],
      engineeringBridge: "Bridge to Software Engineering: Demonstrates a proven track record of handling high-stakes business data, building tools that eliminate operational drag, and maintaining production-grade reliability.",
      technologies: [
        "SAP MM",
        "Commercial Ops",
        "Inventory Optimization",
        "Reporting Automation",
        "Financial Reconciliation",
      ],
    },
  ],

  education: [
    {
      id: "mca",
      degree: "Master of Computer Applications (MCA)",
      institution: "Bangalore University",
      campus: "Jnana Bharathi Campus",
      location: "Bangalore, India",
      period: "2025 - 2027",
      status: "Currently Pursuing",
      description: "Advanced post-graduate coursework in distributed computing, modern software architectures, advanced data structures, and enterprise web engineering.",
      focusAreas: [
        "Distributed Systems & Cloud Architectures",
        "Advanced Data Structures & Algorithms",
        "Full-Stack Web Engineering",
        "Database Architecture & Optimization",
      ],
    },
    {
      id: "bca",
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Bangalore North University",
      campus: "Bangalore North",
      location: "Bangalore, India",
      period: "2018 - 2022",
      status: "Completed",
      description: "Undergraduate degree establishing rigorous foundations in core computer science, software programming, systems architecture, and relational database management.",
      focusAreas: [
        "C & Java Programming",
        "Operating Systems & Computer Networks",
        "Relational Database Management (RDBMS / SQL)",
        "Object-Oriented Software Design",
      ],
    },
  ],

  certifications: [
    {
      id: "web-dev-bootcamp",
      title: "Complete Web Development Bootcamp",
      issuer: "Udemy",
      date: "Verified",
      skills: ["React.js", "Node.js", "Express", "REST APIs", "MongoDB", "Tailwind CSS", "Full-Stack Deployment"],
    },
    {
      id: "javascript-bootcamp",
      title: "JavaScript Bootcamp (ES6+ & Modern Architecture)",
      issuer: "Udemy",
      date: "Verified",
      skills: ["ES6+ Modern Syntax", "Asynchronous Programming", "Event Loop", "DOM Engine", "Functional & OOP Patterns"],
    },
  ],

  skills: {
    frontend: {
      categoryName: "Frontend Architecture",
      skills: [
        "React.js",
        "Hooks",
        "Redux / Context API",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Vite",
      ],
    },
    backend: {
      categoryName: "Backend & Automation",
      skills: [
        "Node.js",
        "Core Java",
        "n8n Workflows",
        "Webhooks",
        "REST APIs",
      ],
    },
    coreCS: {
      categoryName: "Core CS & Systems",
      skills: [
        "C",
        "Operating Systems",
        "Data Structures & Algorithms (DSA)",
        "Git & GitHub",
      ],
    },
    enterpriseOps: {
      categoryName: "Enterprise Ops & Management",
      skills: [
        "SAP MM",
        "SAP CRM",
        "Inventory Optimization",
        "Commercial Operations",
        "Financial Reconciliation",
      ],
    },
  },
};

export default portfolioData;

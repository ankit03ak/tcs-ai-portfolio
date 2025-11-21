const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Project = require("../models/Project");

const projects = [
  {
    title: "BudgetIQ - AI Powered Expense Tracker",
    slug: "budgetiq-ai-expense-tracker",
    shortDescription:
      "Full-stack AI-powered expense tracker built with Next.js, Supabase, Prisma, and Clerk for auth.",
    fullDescription:
      "BudgetIQ is an AI-powered expense tracker that helps users manage their finances with smart features like receipt scanning and dynamic dashboards. Built with Next.js, Supabase, Prisma, and Clerk, it supports secure authentication, modern UI with Tailwind CSS, and insightful visualizations using Recharts. I built this project to practice real-world SaaS-style architecture, background jobs, and email workflows.",
    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Prisma",
      "Supabase",
      "Clerk",
      "Recharts",
      "Inngest",
      "Resend"
    ],
    role: "Full-stack developer",
    timeline: "2024",
    githubUrl: "https://github.com/ankit03ak/expense-tracker",
    liveUrl: "https://budget-iq-gray.vercel.app/",
    featured: true,
    sortOrder: 1,
    highlightPoints: [
      "AI-powered receipt scanning and smart expense categorization",
      "Secure authentication with Clerk and role-based access",
      "Interactive dashboard with charts and spending insights via Recharts"
    ],
    tags: ["Full-stack", "AI", "Finance", "Dashboard"]
  },
  {
    title: "Social Media Platform",
    slug: "social-media-platform",
    shortDescription:
      "Real-time social media platform with messaging, profiles, and scalable MERN backend.",
    fullDescription:
      "A full-stack social media application where users can create posts, connect with others, and chat in real time. The app supports authentication, user profiles, likes/comments, and live messaging using Socket.IO. The backend is deployed on Render, and the frontend is on Vercel, giving a realistic production-style deployment setup.",
    techStack: ["React", "Node.js", "Express", "Socket.IO", "MongoDB", "Render", "Tailwind CSS"],
    role: "Full-stack developer",
    timeline: "2024",
    githubUrl: "https://github.com/ankit03ak/deploy-social-media",
    liveUrl: "https://deploy-social-media-ui1.vercel.app/",
    featured: true,
    sortOrder: 2,
    highlightPoints: [
      "Implemented real-time messaging with Socket.IO",
      "Designed user profiles, posts, likes, and comments flow",
      "Deployed backend on Render and frontend on Vercel for scalability"
    ],
    tags: ["Full-stack", "Real-time", "Social Media"]
  },
  {
    title: "Netflix-Inspired Streaming Platform",
    slug: "netflix-inspired-streaming-platform",
    shortDescription:
      "Full-stack Netflix-style streaming platform with JWT auth and Cloudinary media storage.",
    fullDescription:
      "A Netflix-inspired video streaming platform built with React, Node.js, and MongoDB. It includes user authentication using JWT, protected routes, and a movie management dashboard. Media assets are stored and delivered using Cloudinary, and the UI follows a familiar Netflix-like browsing experience.",
    techStack: ["React", "Node.js", "Express", "JWT", "Cloudinary", "MongoDB"],
    role: "Full-stack developer",
    timeline: "2024",
    githubUrl: "https://github.com/ankit03ak/full-stack-netflixClone",
    liveUrl: "https://deploy-netflix-ui01.vercel.app/",
    featured: true,
    sortOrder: 3,
    highlightPoints: [
      "Implemented JWT-based authentication and protected routes",
      "Integrated Cloudinary for reliable media storage and delivery",
      "Designed a Netflix-style layout with hero banner and content rows"
    ],
    tags: ["Full-stack", "Streaming", "Clone"]
  },
  {
    title: "Live Cricket Score App",
    slug: "live-cricket-score-app",
    shortDescription:
      "Real-time cricket score tracking web app with live user count and socket-based updates.",
    fullDescription:
      "A real-time cricket score application where users can see live scores and track concurrent users on the site. Built with React and Vite on the frontend and Node.js with Socket.IO on the backend, it demonstrates handling real-time updates and broadcasting events efficiently.",
    techStack: ["React", "Vite", "Socket.IO", "Node.js", "Express", "Axios"],
    role: "Full-stack developer",
    timeline: "2024",
    githubUrl: "https://github.com/ankit03ak/live-cricket-score",
    liveUrl: "https://live-cric-score.vercel.app/",
    featured: false,
    sortOrder: 4,
    highlightPoints: [
      "Implemented real-time score updates via WebSockets",
      "Added live user count tracking to show active viewers",
      "Optimized frontend with Vite for fast development and builds"
    ],
    tags: ["Full-stack", "Real-time", "Sports"]
  },
  {
    title: "Chauhan Ready Made Center - Clothing Catalog Website",
    slug: "chauhan-ready-made-center",
    shortDescription:
      "Product catalog website for a local clothing shop with clean, responsive UI.",
    fullDescription:
      "A clothing catalog website built for a local shop, allowing customers to browse available products with details such as price, size, color, and availability. The project focuses on a clean, mobile-friendly UI and simple navigation so non-technical users can explore the catalog easily.",
    techStack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Cloudinary"],
    role: "Frontend-focused full-stack developer",
    timeline: "2024",
    githubUrl: "https://github.com/ankit03ak/clothShop-for-friend",
    liveUrl: "https://chauhan-vastralaya.vercel.app/",
    featured: false,
    sortOrder: 5,
    highlightPoints: [
      "Built a real client-facing project for a local business",
      "Designed clear product cards with essential details",
      "Ensured responsive layout for mobile and desktop users"
    ],
    tags: ["Frontend", "Business", "E-commerce"]
  },
  {
    title: "AI Chat App",
    slug: "ai-chat-app",
    shortDescription:
      "A modern chat UI with emoji picker, toasts, and playful, animated interface.",
    fullDescription:
      "A front-end focused AI chat interface with a fun, love-themed UI. It includes an emoji picker, toast notifications, and smooth UX details such as click-outside-to-close emoji picker and subtle gradient/faded background effects. This project highlights my ability to build polished, interactive UIs.",
    techStack: ["React", "Tailwind CSS", "Emoji Picker", "Sonner", "JavaScript"],
    role: "Frontend developer",
    timeline: "2024",
    githubUrl: "https://github.com/ankit03ak/chatbot",
    liveUrl: "https://chatwithme-two.vercel.app/",
    featured: false,
    sortOrder: 6,
    highlightPoints: [
      "Implemented a custom emoji picker with click-outside-to-close behavior",
      "Used toast notifications (Sonner) for smooth feedback",
      "Designed a playful, animated chat interface with gradients and floating elements"
    ],
    tags: ["Frontend", "UI/UX", "Chat"]
  }
];

const seedProjects = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI is not set in .env");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    console.log("🧹 Clearing existing projects...");
    await Project.deleteMany({});

    console.log("🌱 Inserting seed projects...");
    await Project.insertMany(projects);

    console.log("✅ Seeded projects successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding projects:", error);
    process.exit(1);
  }
};

seedProjects();

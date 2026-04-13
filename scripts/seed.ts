import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const adapter = new PrismaBetterSqlite3({
  url: `file:${path.resolve("./prisma/dev.db")}`,
});

const prisma = new PrismaClient({ adapter } as any);

const projects = [
  {
    year: "2025",
    title: "School Website",
    description: "A modern, responsive website for a local school, featuring event management, news updates, and an integrated blog using Next.js and MDX for content management.",
    tags: JSON.stringify(["Next.js", "Tailwind CSS", "MDX", "Education", "Responsive Design"]),
    imgSrc: "./School Website.png",
    liveSiteUrl: "https://escl.openwindowbd.com/",
    sourceCodeUrl: null,
    layout: "2-col",
    order: 1,
  },
  {
    year: "2025",
    title: "Task Management Extension for Chrome",
    description: "A Chrome extension that helps users manage their tasks efficiently with features like task categorization, deadlines, and reminders, built using React and Tailwind CSS.",
    tags: JSON.stringify(["Chrome Extension", "React", "Tailwind CSS", "Productivity", "Task Manager"]),
    imgSrc: "./Task Management extension for chrome.png",
    sourceCodeUrl: "#",
    liveSiteUrl: "https://technomenia.com/",
    layout: "1-col",
    order: 2,
  },
  {
    year: "2023",
    title: "WordPress Newspaper Website",
    description: "A dynamic news website built with WordPress, featuring custom post types, categories, and a user-friendly interface for easy content management and reader engagement.",
    tags: JSON.stringify(["WordPress", "PHP", "MySQL", "News Portal", "Responsive Design"]),
    imgSrc: "./News site.jpg.png",
    sourceCodeUrl: "#",
    liveSiteUrl: "https://bhorerdut.com/",
    layout: "1-col",
    order: 3,
  },
  {
    year: "2024",
    title: "Complete School Management Apps",
    description: "A comprehensive school management system with modules for student information, attendance, grading, and fee management, built with a focus on usability and scalability.",
    tags: JSON.stringify(["React", "Next.js", "Tailwind CSS", "School ERP", "Full Stack"]),
    imgSrc: "./School Management apps.jpg.png",
    sourceCodeUrl: "#",
    liveSiteUrl: "https://escl.openwindowbd.com/login/",
    layout: "1-col",
    order: 4,
  },
  {
    year: "2025",
    title: "WordPress E-commerce Site",
    description: "E-commerce website built on WordPress with custom themes and plugins, optimized for performance and SEO, providing a seamless shopping experience.",
    tags: JSON.stringify(["WordPress", "WooCommerce", "PHP", "E-commerce", "SEO Optimization"]),
    imgSrc: "./Wordpress ecommerce site.jpg.png",
    sourceCodeUrl: "#",
    liveSiteUrl: "https://technomenia.com/",
    layout: "1-col",
    order: 5,
  },
  {
    year: "2023",
    title: "Task Management App",
    description: "A full-stack task management application with user authentication, real-time database sync using Firebase, and drag-and-drop functionality.",
    tags: JSON.stringify(["React", "Firebase", "Tailwind CSS", "Authentication", "Drag-and-Drop"]),
    imgSrc: "./Wordpress ecommerce web.jpg.png",
    sourceCodeUrl: "https://github.com/rafijuljisan/Chrome-Task-Extension",
    liveSiteUrl: null,
    layout: "1-col",
    order: 6,
  },
  {
    year: "2024",
    title: "Next.js Portfolio Site",
    description: "A modern, fast, and responsive personal portfolio website built using Next.js, React, and Tailwind CSS to showcase projects and skills.",
    tags: JSON.stringify(["Next.js", "React", "Tailwind CSS", "Portfolio", "Responsive Design"]),
    imgSrc: "./Next JS Portfolio site.jpg.png",
    sourceCodeUrl: "#",
    liveSiteUrl: "https://jisan.technomenia.com",
    layout: "1-col",
    order: 7,
  },
  {
    year: "2024",
    title: "Consultancy Management App",
    description: "A comprehensive web application for consultancy firms to manage clients, appointments, payments, and visa processing statuses.",
    tags: JSON.stringify(["Laravel", "React", "MySQL", "Management System", "Dashboard"]),
    imgSrc: "./Consultancy Management apps.jpg.png",
    sourceCodeUrl: "#",
    liveSiteUrl: "https://app.openwindowbd.com/",
    layout: "1-col",
    order: 8,
  },
  {
    year: "2023",
    title: "Education Consultancy Website",
    description: "A professional, responsive website for an education consultancy, showcasing services, partner universities, and student testimonials.",
    tags: JSON.stringify(["WordPress", "Elementor", "Responsive Design", "Consultancy", "Landing Page"]),
    imgSrc: "./Education Consultancy Website.jpg.png",
    sourceCodeUrl: "#",
    liveSiteUrl: "https://openwindowbd.com",
    layout: "1-col",
    order: 9,
  },
  {
    year: "2025",
    title: "Finance Management Dashboard",
    description: "A data-driven finance dashboard to track income, expenses, and investments, featuring charts and downloadable reports.",
    tags: JSON.stringify(["React", "Tailwind CSS", "Chart.js", "Finance", "Dashboard UI"]),
    imgSrc: "./Finance management.jpg.png",
    sourceCodeUrl: "#",
    liveSiteUrl: "https://ac.openwindowbd.com",
    layout: "1-col",
    order: 10,
  },
  {
    year: "2026",
    title: "Banglar Somachar News Portal Website",
    description: "A modern, responsive website for a Bangladeshi cultural organization showcasing events, news, and community resources.",
    tags: JSON.stringify(["Laravel", "Vue Js", "Responsive Design", "Cultural Organization", "Landing Page"]),
    imgSrc: "./BDSomacharsite.png",
    sourceCodeUrl: "#",
    liveSiteUrl: "https://banglarsomachar.com/",
    layout: "1-col",
    order: 11,
  },
  {
    year: "2024",
    title: "Automatic Recent Tab Loader for Chrome",
    description: "A Google Chrome extension to improve productivity by automatically reloading recent or pinned tabs at user-defined intervals.",
    tags: JSON.stringify(["Chrome Extension", "JavaScript", "Automation", "Productivity", "Browser API"]),
    imgSrc: "./Automatic Recent Tab Loader for Chrome.png",
    sourceCodeUrl: "https://github.com/rafijuljisan/Recent-Tab-Loader-Plugin",
    liveSiteUrl: null,
    layout: "1-col",
    order: 12,
  },
  {
    year: "2024",
    title: "Automatic Photocard Download Plugin",
    description: "A custom plugin for WordPress to automatically generate and allow users to download photocards based on user data.",
    tags: JSON.stringify(["WordPress", "PHP", "Plugin Development", "Automation", "Media Tools"]),
    imgSrc: "./Automatic Photocard downlooad plugin.jpg.png",
    sourceCodeUrl: "#",
    liveSiteUrl: "https://bhorerdut.com",
    layout: "1-col",
    order: 13,
  },
  {
    year: "2026",
    title: "Education Consultancy Website Design",
    description: "A modern, responsive website for an education consultancy, showcasing services, partner universities, and student testimonials.",
    tags: JSON.stringify(["Laravel", "Vue Js", "Responsive Design", "Consultancy", "Landing Page"]),
    imgSrc: "./opnewwebsite.jpg",
    sourceCodeUrl: "#",
    liveSiteUrl: "https://web.openwindowbd.com",
    layout: "1-col",
    order: 14,
  },
];

async function main() {
  // Seed admin user
  const hashed = await bcrypt.hash("Admin@1234", 10);
  await prisma.user.upsert({
    where: { email: "rafijuljisan@gmail.com" },
    update: {},
    create: {
      email: "rafijuljisan@gmail.com",
      password: hashed,
    },
  });
  console.log("✅ Admin user ready");

  // Clear existing projects first to avoid duplicates
  await prisma.project.deleteMany({});
  console.log("🗑️  Cleared existing projects");

  // Insert all projects
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  console.log(`✅ Seeded ${projects.length} projects successfully!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
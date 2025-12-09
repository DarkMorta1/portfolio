import { NextRequest, NextResponse } from "next/server"
// @ts-expect-error @vercel/kv provides types at runtime in the deployed env
import { kv } from "@vercel/kv"

export const runtime = "nodejs"

// Allow using Upstash vars directly if KV_* are not set
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

const KV_KEY = "portfolio:data"

const DEFAULT_DATA = {
  hero: {
    name: "Ojash Osti",
    title: "Software Engineer & Developer",
    subtitle: "Turning Ideas into Digital Reality",
    description:
      "I'm passionate about building innovative software solutions that solve real-world problems. With a strong foundation in modern technologies, I'm constantly learning and growing as a developer.",
    profileImage: "/images/ojash-new-profile.jpg",
  },
  about: {
    bio: "I'm Ojash Osti, a dedicated software engineering student with a passion for creating elegant, efficient, and user-friendly applications. My journey in technology began with a curiosity about how digital systems work, which has evolved into a deep appreciation for software development.",
    education:
      "I'm currently pursuing my degree in Software Engineering at Nepal College of Information Technology (NCIT), where I've gained a strong foundation in computer science principles, software design patterns, and modern development practices. Beyond my formal education, I'm constantly expanding my knowledge through self-directed learning, online courses, and hands-on projects.",
    achievements: [
      {
        icon: "GraduationCap",
        title: "Education",
        description: "Software Engineering Student at NCIT",
        color: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20",
      },
      {
        icon: "Briefcase",
        title: "Experience",
        description: "Project-based Learning",
        color: "bg-green-500/10 text-green-500 dark:bg-green-500/20",
      },
      {
        icon: "Award",
        title: "Certifications",
        description: "Web Development, UI/UX Design, AWS Cloud",
        color: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20",
      },
      {
        icon: "Heart",
        title: "Interests",
        description: "AI, Mobile Apps, Cloud Computing",
        color: "bg-red-500/10 text-red-500 dark:bg-red-500/20",
      },
    ],
    timeline: [
      {
        year: "2023",
        title: "Started Software Engineering at NCIT College",
        description:
          "Began formal education in software engineering at Nepal College of Information Technology (NCIT), focusing on modern development practices and computer science fundamentals.",
      },
      {
        year: "2022",
        title: "Web Development Certification",
        description: "Completed comprehensive web development certification covering frontend and backend technologies.",
      },
      {
        year: "2021",
        title: "First Coding Project",
        description: "Developed my first significant coding project, a task management application using JavaScript and HTML/CSS.",
      },
    ],
    certifications: [
      {
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        description:
          "Foundational understanding of AWS Cloud concepts, services, security, architecture, pricing, and support.",
        tags: ["Cloud Computing", "AWS Services", "Security"],
        color: "bg-orange-500/10 text-orange-500",
      },
      {
        title: "Web Development",
        issuer: "Full Stack Certification",
        description: "Comprehensive certification covering modern web development technologies, frameworks, and best practices.",
        tags: ["React", "Node.js", "JavaScript"],
        color: "bg-blue-500/10 text-blue-500",
      },
      {
        title: "UI/UX Design",
        issuer: "Design Principles",
        description: "Understanding of user interface design principles, user experience best practices, and design thinking.",
        tags: ["Figma", "Prototyping", "User Research"],
        color: "bg-purple-500/10 text-purple-500",
      },
    ],
  },
  projects: [
    {
      id: "1",
      title: "Chess Master",
      description:
        "An interactive chess game web application with firebase login, move validation, game history, and multiplayer functionality.",
      technologies: ["React", "TypeScript", "Chess.js", "Socket.io", "Node.js", "CSS3"],
      github: "https://github.com/DarkMorta1/chess2",
      demo: "#",
      featured: true,
      image: "/images/projects/chess-master.jpg",
    },
    {
      id: "2",
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application with product listings, cart functionality, and secure checkout.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      github: "https://github.com/DarkMorta1/ecommerce-",
      demo: "#",
      featured: true,
      image: "/images/projects/ecommerce.jpg",
    },
    {
      id: "3",
      title: "Weather Dashboard",
      description:
        "A responsive weather application that provides real-time weather data and forecasts for locations worldwide.",
      technologies: ["JavaScript", "React", "CSS", "Weather API"],
      github: "https://github.com/DarkMorta1/weather-report",
      demo: "",
      featured: false,
      image: "/images/projects/weather-dashboard.jpg",
    },
    {
      id: "4",
      title: "Online Math Solver Platform",
      description:
        "An intelligent math problem-solving platform with step-by-step solutions, graphing capabilities, and support for various mathematical topics from algebra to calculus.",
      technologies: ["React", "Node.js", "JavaScript", "Express", "MathJax", "Chart.js", "MongoDB"],
      github: "https://github.com/DarkMorta1/Math-solver",
      demo: "",
      featured: false,
      image: "/images/projects/math-solver.jpg",
    },
  ],
  skills: {
    categories: [
      {
        id: "frontend",
        title: "Frontend",
        icon: "Layout",
        color: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20",
        skills: [
          { name: "HTML", level: 90 },
          { name: "CSS", level: 85 },
          { name: "JavaScript", level: 85 },
          { name: "React", level: 80 },
          { name: "Next.js", level: 75 },
          { name: "Tailwind CSS", level: 90 },
        ],
      },
      {
        id: "backend",
        title: "Backend",
        icon: "Server",
        color: "bg-green-500/10 text-green-500 dark:bg-green-500/20",
        skills: [
          { name: "Node.js", level: 80 },
          { name: "Express", level: 75 },
          { name: "Python", level: 70 },
          { name: "Django", level: 65 },
          { name: "RESTful APIs", level: 85 },
        ],
      },
      {
        id: "databases",
        title: "Databases",
        icon: "Database",
        color: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20",
        skills: [
          { name: "MongoDB", level: 80 },
          { name: "MySQL", level: 75 },
          { name: "PostgreSQL", level: 70 },
          { name: "Firebase", level: 85 },
        ],
      },
      {
        id: "programming",
        title: "Programming",
        icon: "Code",
        color: "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20",
        skills: [
          { name: "JavaScript", level: 90 },
          { name: "TypeScript", level: 80 },
          { name: "Python", level: 75 },
          { name: "Java", level: 70 },
          { name: "C++", level: 65 },
        ],
      },
      {
        id: "devops",
        title: "DevOps",
        icon: "Terminal",
        color: "bg-red-500/10 text-red-500 dark:bg-red-500/20",
        skills: [
          { name: "Git", level: 85 },
          { name: "Docker", level: 70 },
          { name: "CI/CD", level: 65 },
          { name: "AWS", level: 60 },
          { name: "Vercel", level: 80 },
        ],
      },
      {
        id: "other",
        title: "Other",
        icon: "Globe",
        color: "bg-teal-500/10 text-teal-500 dark:bg-teal-500/20",
        skills: [
          { name: "UI/UX Design", level: 75 },
          { name: "Responsive Design", level: 85 },
          { name: "SEO", level: 70 },
          { name: "Performance Optimization", level: 75 },
        ],
      },
    ],
  },
  contact: {
    email: "ostiojash2061@gmail.com",
    github: "https://github.com/DarkMorta1",
    linkedin: "https://www.linkedin.com/in/ojash-osti-83727a260/",
    resume: "/resume/Ojash_Osti_Resume.pdf",
  },
}

function checkAuth(request: NextRequest): boolean {
  const sessionToken = request.cookies.get("admin_session")
  return !!sessionToken
}

function missingEnv() {
  return !KV_URL || !KV_TOKEN
}

export async function GET() {
  try {
    if (missingEnv()) {
      console.error("KV env vars missing", { KV_URL: !!KV_URL, KV_TOKEN: !!KV_TOKEN })
      return NextResponse.json({ error: "KV is not configured (missing env vars)" }, { status: 500 })
    }

    let data = await kv.get<typeof DEFAULT_DATA>(KV_KEY)
    // Seed KV once if empty so admin forms are populated
    if (!data) {
      await kv.set(KV_KEY, DEFAULT_DATA)
      data = DEFAULT_DATA
    } else {
      // If skills missing/empty, hydrate with defaults without wiping other sections
      const needsSkills =
        !data.skills ||
        !Array.isArray(data.skills.categories) ||
        data.skills.categories.length === 0
      if (needsSkills) {
        data = { ...data, skills: DEFAULT_DATA.skills }
        await kv.set(KV_KEY, data)
      }
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error reading portfolio data:", error)
    return NextResponse.json({ error: "Failed to read data", detail: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    if (missingEnv()) {
      console.error("KV env vars missing", { KV_URL: !!KV_URL, KV_TOKEN: !!KV_TOKEN })
      return NextResponse.json({ error: "KV is not configured (missing env vars)" }, { status: 500 })
    }

    const updatedData = await request.json()
    await kv.set(KV_KEY, updatedData)
    return NextResponse.json({ success: true, message: "Data updated successfully" })
  } catch (error) {
    console.error("Error updating portfolio data:", error)
    return NextResponse.json({ error: "Failed to update data", detail: String(error) }, { status: 500 })
  }
}


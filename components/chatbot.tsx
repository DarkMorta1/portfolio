"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Bot, User, Sparkles, Zap, Code, Briefcase, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  hasLinks?: boolean
  quickActions?: QuickAction[]
}

interface QuickAction {
  label: string
  action: string
  icon?: React.ReactNode
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm Ojash's AI Assistant. I can help you explore his portfolio, skills, and projects. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
      quickActions: [
        { label: "View Skills", action: "skills", icon: <Zap className="h-3 w-3" /> },
        { label: "See Projects", action: "projects", icon: <Code className="h-3 w-3" /> },
        { label: "Experience", action: "experience", icon: <Briefcase className="h-3 w-3" /> },
        { label: "Contact", action: "contact", icon: <Mail className="h-3 w-3" /> },
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const isAtBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 50
    setShowScrollButton(!isAtBottom)
  }

  const suggestedQuestions = [
    "What technologies does Ojash know?",
    "Tell me about the Chess Master project",
    "What's his educational background?",
    "Show me his contact information",
    "Is he available for work?",
    "What makes him a good developer?",
  ]

  const getIntelligentResponse = (
    userMessage: string,
    context: string[],
  ): { text: string; hasLinks?: boolean; quickActions?: QuickAction[] } => {
    const message = userMessage.toLowerCase()

    // Greetings with personalized responses
    if (message.match(/\b(hello|hi|hey|good morning|good afternoon|good evening|howdy)\b/)) {
      const timeOfDay = new Date().getHours()
      let greeting = "Hello"
      if (timeOfDay < 12) greeting = "Good morning"
      else if (timeOfDay < 18) greeting = "Good afternoon"
      else greeting = "Good evening"

      return {
        text: `${greeting}! 🌟 I'm Ojash's AI assistant, and I'm here to help you discover his work and expertise. What aspect of his portfolio interests you most?`,
        quickActions: [
          { label: "Technical Skills", action: "skills", icon: <Zap className="h-3 w-3" /> },
          { label: "Featured Projects", action: "projects", icon: <Code className="h-3 w-3" /> },
          { label: "Get in Touch", action: "contact", icon: <Mail className="h-3 w-3" /> },
        ],
      }
    }

    // Skills and Technology - Enhanced
    if (message.match(/\b(skill|technology|tech|programming|language|framework|tool|stack|know|proficient)\b/)) {
      if (
        message.includes("frontend") ||
        message.includes("front-end") ||
        message.includes("ui") ||
        message.includes("react")
      ) {
        return {
          text: "🎨 **Ojash's Frontend Expertise:**\n\n**Core Technologies:**\n• React & Next.js - Building modern, performant SPAs\n• TypeScript - Type-safe development\n• Tailwind CSS - Rapid UI development\n• HTML5 & CSS3 - Solid web fundamentals\n• JavaScript ES6+ - Modern JS patterns\n\n**Advanced Skills:**\n• Component Architecture & Design Patterns\n• State Management (Context API, Hooks)\n• Responsive & Mobile-First Design\n• Performance Optimization\n• Accessibility (WCAG Standards)\n\nHe's passionate about creating beautiful, intuitive interfaces that users love!",
          quickActions: [
            { label: "Backend Skills", action: "backend skills" },
            { label: "View Projects", action: "projects" },
          ],
        }
      }
      if (
        message.includes("backend") ||
        message.includes("back-end") ||
        message.includes("server") ||
        message.includes("api")
      ) {
        return {
          text: "⚙️ **Ojash's Backend Capabilities:**\n\n**Server Technologies:**\n• Node.js & Express - RESTful API development\n• Python & Django - Robust web frameworks\n• API Design & Development\n• Authentication & Authorization (JWT, OAuth)\n• Server-Side Rendering (Next.js)\n\n**Database Expertise:**\n• MongoDB - NoSQL database design\n• PostgreSQL & MySQL - Relational databases\n• Firebase - Real-time applications\n• Database optimization & indexing\n\n**DevOps & Tools:**\n• Git & GitHub - Version control\n• Docker - Containerization\n• AWS - Cloud services\n• CI/CD pipelines\n\nHe builds scalable, secure backend systems!",
          quickActions: [
            { label: "See Full Stack Projects", action: "full stack projects" },
            { label: "Contact Info", action: "contact" },
          ],
        }
      }
      return {
        text: "💻 **Ojash's Complete Tech Stack:**\n\n**Frontend Excellence:**\n✨ React, Next.js, TypeScript, Tailwind CSS\n✨ HTML5, CSS3, JavaScript ES6+\n\n**Backend Power:**\n⚡ Node.js, Express, Python, Django\n⚡ RESTful APIs, Authentication\n\n**Database Management:**\n🗄️ MongoDB, PostgreSQL, MySQL, Firebase\n\n**Tools & DevOps:**\n🛠️ Git, Docker, AWS, Vercel, CI/CD\n\n**Design & UX:**\n🎨 Responsive Design, UI/UX Principles\n🎨 Figma, Prototyping\n\n**Certifications:**\n🏆 AWS Cloud Practitioner\n🏆 Web Development Professional\n\nHe's a well-rounded full-stack developer constantly learning new technologies!",
        quickActions: [
          { label: "View Projects", action: "projects" },
          { label: "Experience", action: "experience" },
        ],
      }
    }

    // Projects - Enhanced with more details
    if (message.match(/\b(project|work|portfolio|build|create|develop|application|app|made|built)\b/)) {
      if (message.includes("chess")) {
        return {
          text: "♟️ **Chess Master - Interactive Chess Platform**\n\n**Overview:**\nA sophisticated multiplayer chess game with AI opponent capabilities.\n\n**Key Features:**\n• Real-time multiplayer using Socket.io\n• AI opponent with difficulty levels\n• Move validation & game history\n• Timer & tournament modes\n• Replay & analysis features\n\n**Tech Stack:**\n• Frontend: React, TypeScript, CSS3\n• Backend: Node.js, Socket.io\n• Libraries: Chess.js for game logic\n\n**Achievements:**\n✅ 500+ moves validated per second\n✅ Real-time gameplay with <50ms latency\n✅ Support for 100+ concurrent games\n\n**GitHub:** Available for review",
          hasLinks: true,
          quickActions: [
            { label: "See Other Projects", action: "other projects" },
            { label: "GitHub Link", action: "github" },
          ],
        }
      }
      if (message.includes("math") || message.includes("solver")) {
        return {
          text: "🧮 **Online Math Solver Platform**\n\n**Overview:**\nAn intelligent educational platform for solving mathematical problems with step-by-step explanations.\n\n**Key Features:**\n• Step-by-step problem solving\n• Interactive graphing with Chart.js\n• Beautiful math notation with MathJax\n• Multiple math topics (Algebra, Calculus, Geometry)\n• Solution history & user accounts\n\n**Tech Stack:**\n• Frontend: React with responsive UI\n• Backend: Node.js, Express\n• Database: MongoDB for user data\n• Algorithms: Custom JavaScript parsers\n\n**Impact:**\n📚 Helps students understand problem-solving process\n📊 Visual representations for better learning\n🎯 Supports multiple difficulty levels\n\nThis project showcases Ojash's ability to combine technical skills with educational value!",
          hasLinks: true,
          quickActions: [
            { label: "E-Commerce Project", action: "ecommerce" },
            { label: "All Projects", action: "projects" },
          ],
        }
      }
      if (message.includes("ecommerce") || message.includes("e-commerce") || message.includes("shopping")) {
        return {
          text: "🛍️ **E-Commerce Platform**\n\n**Overview:**\nA full-featured online shopping platform with modern e-commerce capabilities.\n\n**Key Features:**\n• Product catalog with search & filters\n• Shopping cart & wishlist\n• Secure checkout with Stripe integration\n• User authentication & profiles\n• Admin dashboard for management\n• Order tracking & history\n\n**Tech Stack:**\n• Frontend: React, TypeScript\n• Backend: Node.js, Express\n• Database: MongoDB\n• Payment: Stripe API\n• Auth: JWT tokens\n\n**Features Implemented:**\n✅ Real-time inventory management\n✅ Email notifications\n✅ Responsive mobile design\n✅ SEO optimization\n\nA complete commercial-grade application!",
          hasLinks: true,
          quickActions: [
            { label: "Weather App", action: "weather app" },
            { label: "Contact Ojash", action: "contact" },
          ],
        }
      }
      return {
        text: "🚀 **Ojash's Featured Projects:**\n\n**1. Chess Master ♟️**\nInteractive multiplayer chess with AI opponent\n• Technologies: React, Node.js, Socket.io, Chess.js\n• Highlights: Real-time gameplay, move validation\n\n**2. E-Commerce Platform 🛍️**\nFull-stack online shopping solution\n• Technologies: React, Node.js, MongoDB, Stripe\n• Highlights: Payment integration, admin dashboard\n\n**3. Online Math Solver 🧮**\nEducational math problem-solving platform\n• Technologies: React, Node.js, MathJax, Chart.js\n• Highlights: Step-by-step solutions, graphing\n\n**4. Weather Dashboard 🌤️**\nReal-time weather data & forecasts\n• Technologies: React, Weather API\n• Highlights: Interactive maps, clean UI\n\nEach project demonstrates full-stack capabilities and problem-solving skills!",
        hasLinks: true,
        quickActions: [
          { label: "View on GitHub", action: "github" },
          { label: "Technical Skills", action: "skills" },
        ],
      }
    }

    // Contact Information - Enhanced
    if (message.match(/\b(contact|reach|email|phone|call|message|connect|touch|hire)\b/)) {
      return {
        text: "📞 **Get in Touch with Ojash:**\n\n**Primary Contact:**\n📧 Email: ostiojash2061@gmail.com\n📱 Phone: +977 9863439559\n📍 Location: Kathmandu, Nepal\n\n**Professional Networks:**\n💼 LinkedIn: Connect for professional networking\n💻 GitHub: View code repositories\n📘 Facebook: Social updates\n📸 Instagram: Personal posts\n\n**Best Ways to Reach:**\n• Email - For detailed inquiries (responds within 24 hours)\n• LinkedIn - For professional opportunities\n• Phone - For urgent matters (call or WhatsApp)\n\n**Office Hours:**\n🕐 Generally available: 9 AM - 6 PM NPT\n🌍 Flexible for international collaboration\n\nFeel free to reach out for:\n✅ Freelance projects\n✅ Collaboration opportunities\n✅ Technical discussions\n✅ Just to say hello! 😊",
        hasLinks: true,
        quickActions: [
          { label: "Send Email", action: "email" },
          { label: "View LinkedIn", action: "linkedin" },
        ],
      }
    }

    // Experience and Background - Enhanced
    if (message.match(/\b(experience|background|education|study|learn|university|college|ncit|student)\b/)) {
      return {
        text: "🎓 **Ojash's Background & Experience:**\n\n**Education:**\n🏫 Nepal College of Information Technology (NCIT)\n📚 Bachelor's in Software Engineering\n📅 Current Student (Expected Graduation: 2026)\n🏆 Focus: Modern Web Development & Software Engineering\n\n**Professional Experience:**\n💼 Freelance Web Developer (Feb 2024 - Present)\n• Building custom web applications\n• Client projects in e-commerce & education\n• Full-stack development & consulting\n\n**Notable Achievements:**\n🏅 NOSKATHON LITE Hackathon Participant (Jan 2025)\n🏅 Robotics & Automation Projects\n🏅 Active Open Source Contributor\n\n**Certifications:**\n✅ AWS Cloud Practitioner\n✅ Full Stack Web Development\n✅ UI/UX Design Principles\n\n**Learning Philosophy:**\n\"I believe in learning by doing. Every project is an opportunity to master new technologies and solve real-world problems.\"\n\n**Current Focus:**\n🎯 Advanced React patterns\n🎯 Cloud architecture (AWS)\n🎯 AI/ML integration in web apps",
        quickActions: [
          { label: "View Certifications", action: "certifications" },
          { label: "See Projects", action: "projects" },
        ],
      }
    }

    // Availability - Enhanced
    if (message.match(/\b(available|hire|work|job|opportunity|freelance|collaborate|availability)\b/)) {
      return {
        text: "✅ **Ojash's Current Availability:**\n\n**Open to Opportunities:**\n💼 Freelance Projects - Available\n🎯 Part-time Remote Work - Available\n🤝 Internship Positions - Interested\n👥 Open Source Collaboration - Always welcome!\n\n**Ideal Projects:**\n🌟 Modern web applications (React/Next.js)\n🌟 E-commerce solutions\n🌟 Educational platforms\n🌟 SaaS products\n🌟 API development & integration\n\n**Work Style:**\n• Agile/Scrum methodology\n• Clear communication & documentation\n• Code reviews & best practices\n• Test-driven development\n• CI/CD workflows\n\n**Availability Details:**\n📅 Can start: Immediately for part-time\n⏰ Hours: Flexible (15-30 hours/week)\n🌍 Remote: Preferred (open to hybrid in Kathmandu)\n💰 Rate: Competitive, project-based or hourly\n\n**Why Work With Ojash:**\n✨ Strong problem-solving skills\n✨ Clean, maintainable code\n✨ User-focused development\n✨ Fast learner & adaptable\n✨ Passionate about quality\n\n**Next Steps:**\nReady to discuss your project? Let's connect!",
        quickActions: [
          { label: "Contact Now", action: "contact" },
          { label: "View Resume", action: "resume" },
        ],
      }
    }

    // About Ojash - Enhanced
    if (message.match(/\b(about|who|tell me|describe|introduction|bio|yourself)\b/)) {
      return {
        text: '👨‍💻 **Meet Ojash Osti**\n\n**Who I Am:**\nA passionate software engineering student from Kathmandu, Nepal, with a mission to create innovative digital solutions that make a difference.\n\n**My Philosophy:**\n"Code is not just about making things work; it\'s about crafting elegant solutions that delight users and solve real problems."\n\n**What Drives Me:**\n🎯 Problem-solving mindset - Love tackling complex challenges\n📚 Continuous learning - Always exploring new technologies\n👥 User-focused approach - Building for people, not just machines\n✨ Clean code advocate - Maintainable, scalable solutions\n🌱 Growth mindset - Embracing challenges as opportunities\n\n**Beyond Coding:**\n• Tech community participant\n• Open-source contributor\n• Hackathon enthusiast\n• Mentor to junior developers\n• Tech blog reader & learner\n\n**Personal Interests:**\n🎮 Chess & strategy games\n📖 Technology & innovation trends\n🌐 Web3 & blockchain exploration\n🤖 AI & machine learning applications\n\n**Career Vision:**\nTo become a versatile software engineer who bridges the gap between innovative technology and user needs, creating products that positively impact lives.\n\n**Current Goals:**\n• Master cloud architecture (AWS/Azure)\n• Build AI-powered applications\n• Contribute to major open-source projects\n• Launch a successful SaaS product',
        quickActions: [
          { label: "View Skills", action: "skills" },
          { label: "See Projects", action: "projects" },
          { label: "Contact", action: "contact" },
        ],
      }
    }

    // Certifications
    if (message.match(/\b(certification|certificate|certified|credential|qualification)\b/)) {
      return {
        text: "🏆 **Ojash's Certifications & Credentials:**\n\n**Cloud Computing:**\n☁️ AWS Cloud Practitioner\n• Foundational AWS knowledge\n• Cloud concepts & architecture\n• Security & compliance\n• Pricing & support models\n\n**Web Development:**\n🌐 Full Stack Web Development\n• Frontend & backend technologies\n• Database management\n• Deployment & DevOps\n• Best practices & patterns\n\n**Design:**\n🎨 UI/UX Design Principles\n• User research & personas\n• Wireframing & prototyping\n• Design systems\n• Accessibility standards\n\n**Continuous Learning:**\nOjash is committed to ongoing education through:\n• Online courses (Udemy, Coursera)\n• Technical documentation\n• Conference talks & webinars\n• Peer learning & mentorship\n\n**Next Certifications:**\n📋 Planning to pursue:\n• AWS Solutions Architect\n• MongoDB Developer\n• React Advanced Patterns",
        quickActions: [
          { label: "View Education", action: "education" },
          { label: "Technical Skills", action: "skills" },
        ],
      }
    }

    // GitHub/Code
    if (message.match(/\b(github|code|repository|repo|git|source code)\b/)) {
      return {
        text: "💻 **Ojash's GitHub Profile:**\n\n**Profile:** github.com/DarkMorta1\n\n**Repository Highlights:**\n🔷 Chess Master - Interactive chess game\n🔷 E-Commerce Platform - Full-stack shopping app\n🔷 Math Solver - Educational platform\n🔷 Portfolio Website - This site you're viewing!\n\n**Coding Style:**\n• Clean, readable code\n• Comprehensive documentation\n• TypeScript for type safety\n• Git best practices\n• Regular commits & meaningful messages\n\n**Contribution Stats:**\n📊 Active contributor\n📊 Multiple languages (JS, TS, Python)\n📊 Focus on practical, real-world projects\n\n**Open Source:**\nOjash believes in giving back to the community and welcomes collaborations on interesting projects!",
        hasLinks: true,
        quickActions: [
          { label: "View Projects", action: "projects" },
          { label: "See Resume", action: "resume" },
        ],
      }
    }

    // Thank you
    if (message.match(/\b(thank|thanks|appreciate|helpful|great)\b/)) {
      return {
        text: "You're very welcome! 😊 I'm glad I could help you learn more about Ojash and his work.\n\nIs there anything else you'd like to know? I'm here to help with:\n\n• Technical skills & expertise\n• Project details & demos\n• Work experience & education\n• Contact information\n• Availability for opportunities\n\nOjash is always excited to connect with people who share his passion for technology and innovation. Feel free to reach out directly!",
        quickActions: [
          { label: "Contact Ojash", action: "contact" },
          { label: "View Portfolio", action: "projects" },
        ],
      }
    }

    // Default intelligent response
    const defaultResponses = [
      {
        text: "That's an interesting question! While I can provide general information about Ojash, for specific details about that topic, I'd recommend:\n\n1. Checking out his project portfolio\n2. Reviewing his skills section\n3. Reaching out to him directly\n\nWhat else would you like to know about his work, skills, or experience?",
        quickActions: [
          { label: "View Projects", action: "projects" },
          { label: "Contact Info", action: "contact" },
        ],
      },
      {
        text: "I'm here to help you discover Ojash's portfolio! Here are some things I can tell you about:\n\n• His technical skills & expertise\n• Featured projects & achievements\n• Education & work experience\n• Contact information\n• Availability for opportunities\n\nWhat interests you most?",
        quickActions: [
          { label: "Skills", action: "skills" },
          { label: "Projects", action: "projects" },
          { label: "Experience", action: "experience" },
        ],
      },
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleQuickAction = (action: string) => {
    setInputValue(action)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    // Update conversation context
    setConversationContext((prev) => [...prev.slice(-5), currentInput.toLowerCase()])

    // Handle quick action navigation
    if (currentInput === "email") {
      window.location.href = "mailto:ostiojash2061@gmail.com"
      setIsTyping(false)
      return
    }
    if (currentInput === "linkedin") {
      window.open("https://www.linkedin.com/in/ojash-osti-83727a260/", "_blank")
      setIsTyping(false)
      return
    }
    if (currentInput === "github") {
      window.open("https://github.com/DarkMorta1", "_blank")
      setIsTyping(false)
      return
    }
    if (currentInput === "resume") {
      const link = document.createElement("a")
      link.href = "/resume/Ojash_Osti_Resume.pdf"
      link.download = "Ojash_Osti_Resume.pdf"
      link.click()
      setIsTyping(false)
      return
    }
    if (["skills", "projects", "experience", "contact"].includes(currentInput)) {
      document.getElementById(currentInput)?.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => setIsOpen(false), 500)
      setIsTyping(false)
      return
    }

    // Simulate realistic typing delay
    const typingDelay = Math.min(currentInput.length * 50 + 1000, 3000)

    setTimeout(() => {
      const response = getIntelligentResponse(currentInput, conversationContext)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        hasLinks: response.hasLinks,
        quickActions: response.quickActions,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, typingDelay)
  }

  const formatMessage = (text: string) => {
    const parts = text.split("\n")
    return parts.map((part, index) => {
      // Bold headings with **
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2)
        return (
          <div key={index} className="font-bold text-foreground mb-2 text-base">
            {boldText}
          </div>
        )
      }
      // Bullet points with •
      if (part.startsWith("• ")) {
        const text = part.slice(2)
        if (text.includes("**")) {
          const [, boldPart, normalPart] = text.match(/\*\*(.*?)\*\*(.*)/) || []
          return (
            <div key={index} className="flex items-start mb-1 ml-2">
              <span className="text-primary mr-2">•</span>
              <span>
                {boldPart && <strong className="text-foreground">{boldPart}</strong>}
                <span className="text-muted-foreground">{normalPart}</span>
              </span>
            </div>
          )
        }
        return (
          <div key={index} className="flex items-start mb-1 ml-2">
            <span className="text-primary mr-2">•</span>
            <span className="text-muted-foreground">{text}</span>
          </div>
        )
      }
      // Emoji headers
      if (part.match(/^[🎨⚙️💻🗄️🛠️🎯📚📊✅♟️🧮🛍️🌤️🚀📞💼🏫🏅🎓☁️🌐🏆💻📋🔷]/u)) {
        return (
          <div key={index} className="font-bold text-foreground mb-2 text-base">
            {part}
          </div>
        )
      }
      // Regular text
      return part ? (
        <div key={index} className="mb-1 text-muted-foreground">
          {part}
        </div>
      ) : (
        <br key={index} />
      )
    })
  }

  return (
    <>
      {/* Enhanced Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full h-16 w-16 shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-primary"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Bot className="h-6 w-6" />
                <motion.div
                  className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
        </Button>
      </motion.div>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-28 right-6 z-50 w-[380px] md:w-[420px]"
          >
            <Card className="shadow-2xl border-primary/20 overflow-hidden">
              {/* Enhanced Header */}
              <CardHeader className="bg-gradient-to-r from-primary via-purple-600 to-primary text-primary-foreground p-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Bot className="h-6 w-6" />
                      <motion.div
                        className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                    <div>
                      <span className="font-bold">Ojash AI Assistant</span>
                      <p className="text-xs opacity-90 font-normal">Powered by Intelligence</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-400/20 text-green-100 border-none">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                {/* Enhanced Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-muted/20" onScroll={handleScroll}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[85%] ${message.isBot ? "" : "flex-row-reverse space-x-reverse"}`}
                      >
                        <div
                          className={`p-2 rounded-full ${message.isBot ? "bg-gradient-to-br from-primary to-purple-600 text-white" : "bg-muted"}`}
                        >
                          {message.isBot ? (
                            <Bot className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <div
                            className={`p-3 rounded-lg ${
                              message.isBot
                                ? "bg-background border border-border shadow-sm"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            <div className="text-sm">{message.isBot ? formatMessage(message.text) : message.text}</div>
                          </div>

                          {/* Quick Actions */}
                          {message.quickActions && message.quickActions.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {message.quickActions.map((action, idx) => (
                                <Button
                                  key={idx}
                                  variant="outline"
                                  size="sm"
                                  className="h-auto py-1 px-3 text-xs bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                                  onClick={() => handleQuickAction(action.action)}
                                >
                                  {action.icon && <span className="mr-1">{action.icon}</span>}
                                  {action.label}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Enhanced Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="p-2 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-background border border-border p-3 rounded-lg shadow-sm">
                          <div className="flex space-x-1">
                            <motion.div
                              className="w-2 h-2 bg-primary rounded-full"
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-primary rounded-full"
                              animate={{ y: [0, -8, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: 0.2,
                              }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-primary rounded-full"
                              animate={{ y: [0, -8, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: 0.4,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />

                  {/* Scroll to Bottom Button */}
                  <AnimatePresence>
                    {showScrollButton && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        onClick={scrollToBottom}
                        className="fixed bottom-32 right-8 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                      >
                        ↓
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Suggested Questions */}
                {messages.length === 1 && (
                  <div className="p-4 border-t border-border bg-muted/10">
                    <p className="text-xs text-muted-foreground mb-2 font-medium">💡 Try asking:</p>
                    <div className="space-y-1">
                      {suggestedQuestions.slice(0, 3).map((question, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => {
                            setInputValue(question)
                            handleSendMessage()
                          }}
                          className="block w-full text-left text-xs p-2 rounded-lg bg-background hover:bg-primary/10 hover:text-primary transition-colors duration-200 border border-border/50"
                        >
                          {question}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Input */}
                <div className="p-4 border-t border-border bg-background">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask me anything about Ojash..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 border-border/50 focus:border-primary"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      disabled={!inputValue.trim() || isTyping}
                      className="shrink-0 bg-gradient-to-br from-primary to-purple-600 hover:opacity-90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 text-center">
                    AI-powered assistant • Press Enter to send
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

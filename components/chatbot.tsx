"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User, Sparkles, ExternalLink } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  hasLinks?: boolean
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 👋 I'm Ojash's AI assistant. I can help you learn about his skills, projects, experience, and how to get in touch. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const suggestedQuestions = [
    "What are Ojash's technical skills?",
    "Tell me about his projects",
    "What's his educational background?",
    "How can I contact him?",
    "Is he available for work?",
    "What technologies does he specialize in?",
  ]

  const getIntelligentResponse = (userMessage: string, context: string[]): { text: string; hasLinks?: boolean } => {
    const message = userMessage.toLowerCase()
    const words = message.split(" ")

    // Advanced keyword matching with context awareness
    const skillKeywords = ["skill", "technology", "tech", "programming", "language", "framework", "tool", "stack"]
    const projectKeywords = ["project", "work", "portfolio", "build", "create", "develop", "application", "app"]
    const contactKeywords = ["contact", "reach", "email", "phone", "call", "message", "connect", "touch"]
    const experienceKeywords = ["experience", "background", "education", "study", "learn", "university", "college"]
    const availabilityKeywords = ["available", "hire", "work", "job", "opportunity", "freelance", "collaborate"]
    const aboutKeywords = ["about", "who", "tell me", "describe", "introduction", "bio"]

    // Check for greetings
    if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message.includes("good")) {
      const greetings = [
        "Hello! 😊 Great to meet you! I'm here to help you learn everything about Ojash. What interests you most - his technical skills, projects, or background?",
        "Hi there! 👋 Welcome to Ojash's portfolio! I can tell you about his expertise in web development, his exciting projects, or how to get in touch with him.",
        "Hey! 🌟 Nice to see you here! I'm Ojash's AI assistant and I'd love to help you discover his work. What would you like to explore first?",
      ]
      return { text: greetings[Math.floor(Math.random() * greetings.length)] }
    }

    // Skills and Technology
    if (skillKeywords.some((keyword) => message.includes(keyword))) {
      if (
        message.includes("frontend") ||
        message.includes("front-end") ||
        message.includes("ui") ||
        message.includes("react")
      ) {
        return {
          text: "🎨 Ojash is excellent with frontend technologies! He specializes in:\n\n• **React & Next.js** - Building modern, responsive web applications\n• **TypeScript** - Type-safe development for better code quality\n• **Tailwind CSS** - Creating beautiful, responsive designs\n• **HTML5 & CSS3** - Solid foundation in web standards\n• **JavaScript ES6+** - Modern JavaScript development\n\nHe's particularly passionate about creating intuitive user interfaces and smooth user experiences!",
        }
      }
      if (
        message.includes("backend") ||
        message.includes("back-end") ||
        message.includes("server") ||
        message.includes("api")
      ) {
        return {
          text: "⚙️ On the backend side, Ojash works with:\n\n• **Node.js & Express** - Building scalable server applications\n• **Python & Django** - Robust web development framework\n• **RESTful APIs** - Creating efficient data communication\n• **Database Management** - MongoDB, PostgreSQL, MySQL\n• **Authentication & Security** - Implementing secure user systems\n\nHe understands the importance of building reliable, secure backend systems!",
        }
      }
      return {
        text: "💻 Ojash has a comprehensive skill set in modern web development:\n\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS, JavaScript\n**Backend:** Node.js, Express, Python, Django\n**Databases:** MongoDB, PostgreSQL, MySQL, Firebase\n**Tools:** Git, Docker, AWS, Vercel\n**Design:** UI/UX principles, Responsive design\n\nHe's always learning new technologies and staying up-to-date with industry trends! Would you like to know more about any specific area?",
      }
    }

    // Projects
    if (projectKeywords.some((keyword) => message.includes(keyword))) {
      if (context.includes("projects") && message.includes("more")) {
        return {
          text: "🔍 Here are more details about Ojash's key projects:\n\n**Chess Master:**\n• Interactive multiplayer chess game with AI opponent\n• Real-time gameplay using Socket.IO and Node.js\n• Move validation and game history features\n\n**E-Commerce Platform:**\n• Full-stack application with payment integration\n• User authentication and admin dashboard\n• Real-time inventory management\n\n**Online Math Solver Platform:**\n• Built with React frontend and Node.js backend\n• Step-by-step mathematical solutions using JavaScript algorithms\n• Interactive graphing with Chart.js and MathJax rendering\n• MongoDB database for storing user problems and solutions\n\n**Weather Dashboard:**\n• Integration with multiple weather APIs\n• Interactive maps and forecasting\n• Responsive design for all devices\n\nEach project showcases different aspects of his full-stack development skills!",
        }
      }
      return {
        text: "🚀 Ojash has worked on several impressive projects that demonstrate his full-stack capabilities:\n\n• **Chess Master** - Interactive multiplayer chess game with AI opponent and real-time features using React and Node.js\n• **E-Commerce Platform** - Complete online shopping solution with React, Node.js, and Stripe integration\n• **Online Math Solver Platform** - Intelligent math problem-solving platform built with React, Node.js, and JavaScript algorithms\n• **Weather Dashboard** - Real-time weather app with beautiful UI and forecasting features\n\nEach project shows his ability to handle both frontend and backend development. Would you like more details about any specific project?",
        hasLinks: true,
      }
    }

    // Contact Information
    if (contactKeywords.some((keyword) => message.includes(keyword))) {
      return {
        text: "📞 Here's how you can reach Ojash:\n\n**Email:** ostiojash2061@gmail.com\n**Phone:** +977 9863439559\n**Location:** Kathmandu, Nepal\n\n**Social Media:**\n• LinkedIn: Professional updates and networking\n• GitHub: Code repositories and contributions\n• Facebook & Instagram: Personal updates\n\nHe's very responsive to emails and LinkedIn messages. Feel free to reach out for collaborations, job opportunities, or just to say hello! 😊",
        hasLinks: true,
      }
    }

    // Experience and Background
    if (experienceKeywords.some((keyword) => message.includes(keyword))) {
      return {
        text: "🎓 Ojash's Background:\n\n**Education:**\n• Currently pursuing Software Engineering degree at NCIT\n• Strong foundation in computer science principles\n• Continuous learning through online courses and certifications\n\n**Experience:**\n• Active freelancer in web development (Feb 2024 - Present)\n• Participated in NOSKATHON LITE hackathon (January 2025)\n• Robotics & Automation projects experience\n• Focus on modern web development practices\n• Active in coding communities and open-source\n\n**Certifications:**\n• AWS Cloud Practitioner\n• Web Development\n• UI/UX Design principles\n\nHe believes in learning by doing and constantly challenges himself with new technologies!",
      }
    }

    // Availability
    if (availabilityKeywords.some((keyword) => message.includes(keyword))) {
      return {
        text: "✅ Great news! Ojash is currently available for:\n\n• **Freelance Projects** - Web development and consulting\n• **Internship Opportunities** - Gaining industry experience\n• **Collaboration** - Open-source projects and partnerships\n• **Part-time Work** - Flexible arrangements while studying\n\nHe's particularly interested in:\n🌟 Modern web applications\n🌟 E-commerce solutions\n🌟 Educational platforms\n🌟 Mathematical and scientific applications\n🌟 Mobile-responsive designs\n\nReady to discuss your project? Contact him directly!",
      }
    }

    // About Ojash
    if (aboutKeywords.some((keyword) => message.includes(keyword))) {
      return {
        text: "👨‍💻 About Ojash Osti:\n\nOjash is a passionate software engineering student from Kathmandu, Nepal, with a love for creating innovative digital solutions. He's known for:\n\n• **Problem-solving mindset** - Enjoys tackling complex challenges\n• **Continuous learning** - Always exploring new technologies\n• **User-focused approach** - Prioritizes great user experiences\n• **Clean code advocate** - Believes in maintainable, efficient code\n\nWhen he's not coding, he enjoys staying updated with tech trends, contributing to open-source projects, and connecting with fellow developers. His goal is to build software that makes a positive impact!",
      }
    }

    // Specific technology questions
    if (message.includes("react") || message.includes("next")) {
      return {
        text: "⚛️ Ojash loves working with React and Next.js! He uses them to build:\n\n• **Single Page Applications** with smooth user interactions\n• **Server-Side Rendered** apps for better SEO and performance\n• **Static Site Generation** for fast-loading websites\n• **Full-stack applications** with API routes\n\nHe's particularly skilled at component architecture, state management, and performance optimization. His portfolio website is actually built with Next.js!",
      }
    }

    if (message.includes("database") || message.includes("data")) {
      return {
        text: "🗄️ Ojash works with various databases depending on project needs:\n\n• **MongoDB** - For flexible, document-based storage\n• **PostgreSQL** - For complex relational data\n• **MySQL** - For traditional web applications\n• **Firebase** - For real-time applications\n\nHe understands database design principles, optimization techniques, and how to choose the right database for each project!",
      }
    }

    // Math solver specific questions
    if (message.includes("math") || message.includes("solver") || message.includes("calculator")) {
      return {
        text: "🧮 Ojash's Math Solver Platform is one of his most impressive projects! It features:\n\n• **React Frontend** - Interactive and responsive user interface\n• **Node.js Backend** - Robust server handling mathematical computations\n• **JavaScript Algorithms** - Custom-built mathematical parsing and solving logic\n• **Step-by-step solutions** for complex mathematical problems\n• **Chart.js Integration** - Beautiful graphing and visualization capabilities\n• **MathJax Rendering** - Professional mathematical notation display\n• **MongoDB Database** - Storing user problems, solutions, and history\n• **Multiple math topics** - Algebra, Calculus, Geometry, Statistics\n• **Educational focus** - Helps students understand the problem-solving process\n\nThis project showcases his full-stack development skills while combining technical expertise with educational value!",
      }
    }

    // Thank you responses
    if (message.includes("thank") || message.includes("thanks")) {
      return {
        text: "You're very welcome! 😊 I'm glad I could help you learn more about Ojash. If you have any other questions about his skills, projects, or experience, feel free to ask. And don't forget - he's always happy to connect with new people in the tech community!",
      }
    }

    // Default intelligent response based on context
    const contextResponses = [
      "That's a great question! Ojash is always excited to discuss his work and experience. For more detailed information, I'd recommend checking out his projects section or reaching out to him directly.",
      "I'd love to help you with that! Ojash has extensive experience in web development and would be happy to discuss your specific needs. Feel free to contact him through the form or social media links.",
      "Interesting! Ojash is passionate about technology and innovation. He's always open to discussing new ideas and potential collaborations. Would you like his contact information?",
      "That sounds like something Ojash would be excited to talk about! He loves connecting with people who share his passion for technology. You can reach him through email or LinkedIn for a more detailed conversation.",
    ]

    return { text: contextResponses[Math.floor(Math.random() * contextResponses.length)] }
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

    // Simulate more realistic typing delay
    const typingDelay = Math.min(currentInput.length * 50 + 1000, 3000)

    setTimeout(() => {
      const response = getIntelligentResponse(currentInput, conversationContext)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        hasLinks: response.hasLinks,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, typingDelay)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  const formatMessage = (text: string) => {
    // Convert markdown-like formatting to JSX
    const parts = text.split("\n")
    return parts.map((part, index) => {
      if (part.startsWith("• **") && part.includes("**")) {
        const [, boldText, rest] = part.match(/• \*\*(.*?)\*\*(.*)/) || []
        return (
          <div key={index} className="flex items-start mb-1">
            <span className="text-primary mr-2">•</span>
            <span>
              <strong className="text-foreground">{boldText}</strong>
              <span className="text-muted-foreground">{rest}</span>
            </span>
          </div>
        )
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2)
        return (
          <div key={index} className="font-semibold text-foreground mb-2">
            {boldText}
          </div>
        )
      }
      if (part.startsWith("🌟") || part.startsWith("•")) {
        return (
          <div key={index} className="text-muted-foreground mb-1">
            {part}
          </div>
        )
      }
      return part ? (
        <div key={index} className="mb-1">
          {part}
        </div>
      ) : (
        <br key={index} />
      )
    })
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
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
                <MessageCircle className="h-6 w-6" />
                <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-primary-foreground/80 animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96"
          >
            <Card className="shadow-2xl border-primary/20 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground p-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5" />
                    <span>Ojash's AI Assistant</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs">Online</span>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/20">
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
                        <div className={`p-2 rounded-full ${message.isBot ? "bg-primary/10" : "bg-muted"}`}>
                          {message.isBot ? (
                            <Bot className="h-4 w-4 text-primary" />
                          ) : (
                            <User className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.isBot ? "bg-background border border-border" : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <div className="text-sm">{message.isBot ? formatMessage(message.text) : message.text}</div>
                          {message.hasLinks && message.isBot && (
                            <div className="mt-2 pt-2 border-t border-border/50">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-1 text-xs text-primary hover:text-primary/80"
                                onClick={() =>
                                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                                }
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View Contact Info
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div className="bg-background border border-border p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                {messages.length === 1 && (
                  <div className="p-4 border-t border-border bg-muted/10">
                    <p className="text-xs text-muted-foreground mb-2">Popular questions:</p>
                    <div className="space-y-1">
                      {suggestedQuestions.slice(0, 4).map((question, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleSuggestedQuestion(question)}
                          className="block w-full text-left text-xs p-2 rounded bg-background hover:bg-muted transition-colors duration-200 border border-border/50"
                        >
                          {question}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-border bg-background">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask me anything about Ojash..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      disabled={!inputValue.trim() || isTyping}
                      className="shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

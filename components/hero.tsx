"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, ChevronRight, Download, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePortfolioData } from "@/hooks/use-portfolio-data"

export default function Hero() {
  const { data } = usePortfolioData()

  const heroData =
    data?.hero || {
      name: "Ojash Osti",
      title: "Software Engineer & Developer",
      subtitle: "Turning Ideas into Digital Reality",
      description:
        "I'm passionate about building innovative software solutions that solve real-world problems. With a strong foundation in modern technologies, I'm constantly learning and growing as a developer.",
      profileImage: "/images/ojash-new-profile.jpg",
    }

  const contactData = data?.contact || {}
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Particle animation
  useEffect(() => {
    const particles = document.querySelectorAll(".particle") as NodeListOf<HTMLElement>

    particles.forEach((particle, i) => {
      // Random position
      const x = Math.random() * 100
      const y = Math.random() * 100

      // Random size
      const size = Math.random() * 5 + 2

      // Random color
      const hue = Math.random() * 60 + 240 // Blue to purple range

      // Set styles
      particle.style.left = `${x}%`
      particle.style.top = `${y}%`
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.backgroundColor = `hsl(${hue}, 70%, 60%)`

      // Animation
      particle.style.animation = `float ${Math.random() * 3 + 3}s ease-in-out infinite`
      particle.style.animationDelay = `${Math.random() * 5}s`
    })
  }, [])

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: contactData.github || "https://github.com/DarkMorta1",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: contactData.linkedin || "https://www.linkedin.com/in/ojash-osti-83727a260/",
      label: "LinkedIn",
    },
    { icon: <Mail className="h-5 w-5" />, href: `mailto:${contactData.email || "ostiojash2061@gmail.com"}`, label: "Email" },
  ]

  const handleResumeDownload = () => {
    // Use the actual resume file path
    const resumeUrl = contactData.resume || "/resume/Ojash_Osti_Resume.pdf"
    const link = document.createElement("a")
    link.href = resumeUrl
    link.download = "Ojash_Osti_Resume.pdf"
    link.target = "_blank" // Open in new tab as fallback
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/80 dark:from-background dark:via-background/90 dark:to-background/70" />

      {/* Particles */}
      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="particle animate-float" />
        ))}
      </div>

      {/* Gradient circle */}
      <div
        className="absolute -z-10 rounded-full opacity-30 blur-3xl animate-gradient bg-gradient-to-r from-primary/40 via-purple-500/40 to-primary/40"
        style={{
          width: "70vw",
          height: "70vw",
          maxWidth: "900px",
          maxHeight: "900px",
          left: `calc(${mousePosition.x / 20}px - 35vw)`,
          top: `calc(${mousePosition.y / 20}px - 35vw)`,
          transition: "left 0.5s ease-out, top 0.5s ease-out",
        }}
      />

      <div className="container px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-flex items-center mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 mr-2 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Software Engineer & Developer</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6"
          >
            Hi, I'm{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent animate-gradient bg-300%">
                {heroData.name}
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-primary to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-xl md:text-3xl font-medium text-muted-foreground mb-6"
          >
            {heroData.subtitle?.split(" ").slice(0, 3).join(" ") || "Turning Ideas into"}{" "}
            <span className="text-primary font-semibold">
              {heroData.subtitle?.split(" ").slice(3).join(" ") || "Digital Reality"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed"
          >
            {heroData.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <Button asChild size="lg" className="group relative overflow-hidden">
              <Link href="#projects">
                <span className="relative z-10 flex items-center">
                  View My Work
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </Button>
            <Button onClick={handleResumeDownload} variant="outline" size="lg" className="group bg-transparent">
              <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
              Download Resume
            </Button>
            <Button asChild variant="ghost" size="lg" className="group">
              <Link href="#contact">
                <span className="group-hover:text-primary transition-colors duration-300 flex items-center">
                  Get In Touch
                  <ChevronRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="flex items-center space-x-4"
          >
            <span className="text-sm text-muted-foreground">Connect with me:</span>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary/20 text-foreground hover:text-primary transition-all duration-300 group"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="group-hover:animate-pulse">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="relative"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-primary/20 glow">
              {/* Zoomed out profile image */}
              <div
                className="absolute inset-0 hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: `url('${heroData.profileImage || "/images/ojash-new-profile.jpg"}')`,
                  backgroundSize: "85%",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>

            {/* Enhanced Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <span className="text-primary text-xl font-bold">JS</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 flex items-center justify-center"
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
            >
              <span className="text-purple-500 text-lg font-bold">TS</span>
            </motion.div>
            <motion.div
              className="absolute top-1/2 -right-6 w-14 h-14 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 flex items-center justify-center"
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
            >
              <span className="text-blue-500 text-xl font-bold">React</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <Link href="#about">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-12 w-12 border border-primary/20 backdrop-blur-sm bg-background/50 hover:bg-primary/10 transition-all duration-300 group animate-bounce"
          >
            <ArrowDown className="h-5 w-5 text-primary group-hover:animate-pulse" />
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}

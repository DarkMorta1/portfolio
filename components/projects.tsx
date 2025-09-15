"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Code, Layers, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const projects = [
    {
      title: "Chess Master",
      description:
        "An interactive chess game web application with AI opponent, move validation, game history, and multiplayer functionality.",
      technologies: ["React", "TypeScript", "Chess.js", "Socket.io", "Node.js", "CSS3"],
      github: "https://github.com/DarkMorta1/chess-master",
      demo: "#",
      featured: true,
    },
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce application with product listings, cart functionality, and secure checkout.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      github: "https://github.com/DarkMorta1/ecommerce-platform",
      demo: "#",
      featured: true,
    },
    {
      title: "Weather Dashboard",
      description:
        "A responsive weather application that provides real-time weather data and forecasts for locations worldwide.",
      technologies: ["JavaScript", "React", "CSS", "Weather API"],
      github: "https://github.com/DarkMorta1/weather-dashboard",
      demo: "https://your-weather-app.vercel.app",
    },
    {
      title: "Online Math Solver Platform",
      description:
        "An intelligent math problem-solving platform with step-by-step solutions, graphing capabilities, and support for various mathematical topics from algebra to calculus.",
      technologies: ["React", "Node.js", "JavaScript", "Express", "MathJax", "Chart.js", "MongoDB"],
      github: "https://github.com/DarkMorta1/math-solver",
      demo: "https://your-math-solver.vercel.app",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <Badge variant="outline" className="px-4 py-1 mb-4 border-primary/20 text-primary">
            <Code className="mr-1 h-3 w-3" /> My Work
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">Featured Projects</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8"></div>
          <p className="text-muted-foreground text-center max-w-2xl">
            Here are some of the projects I've worked on. Each project represents my skills, problem-solving abilities,
            and passion for creating meaningful applications.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="mb-20">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 mb-20 last:mb-0 items-center`}
              >
                <motion.div className="w-full lg:w-1/2" whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                  <div className="relative overflow-hidden rounded-xl border-2 border-primary/10 aspect-video glow">
                    {/* Project image with cropped person */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-primary/10">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                        <div className="flex gap-4">
                          <Button asChild size="sm" variant="secondary" className="backdrop-blur-sm bg-background/70">
                            <Link href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              GitHub
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="w-full lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none">
                      Featured Project
                    </Badge>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-6">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="backdrop-blur-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Other Projects */}
        <motion.div style={{ y, opacity }} className="mt-16">
          <div className="flex items-center justify-center mb-10">
            <div className="h-px bg-border flex-grow" />
            <h3 className="text-xl font-bold px-4">Other Noteworthy Projects</h3>
            <div className="h-px bg-border flex-grow" />
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="overflow-hidden h-full flex flex-col border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="relative h-48 w-full overflow-hidden group">
                      {/* Project image with cropped person */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Layers className="h-5 w-5 mr-2 text-primary" />
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="bg-muted/50">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-4">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Card className="max-w-2xl border-primary/10 bg-muted/30 backdrop-blur-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Interested in working together?</h3>
                <p className="text-muted-foreground">I'm always open to new opportunities and collaborations.</p>
              </div>
              <Button asChild className="ml-auto whitespace-nowrap">
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

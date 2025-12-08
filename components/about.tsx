"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, GraduationCap, Briefcase, Award, Heart } from "lucide-react"
import { usePortfolioData } from "@/hooks/use-portfolio-data"

export default function About() {
  const { data } = usePortfolioData()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const aboutData =
    data?.about || {
      bio: `I'm Ojash Osti, a dedicated software engineering student with a passion for creating elegant, efficient, and user-friendly applications. My journey in technology began with a curiosity about how digital systems work, which has evolved into a deep appreciation for software development.`,
      education: `I'm currently pursuing my degree in Software Engineering at Nepal College of Information Technology (NCIT), where I've gained a strong foundation in computer science principles, software design patterns, and modern development practices. Beyond my formal education, I'm constantly expanding my knowledge through self-directed learning, online courses, and hands-on projects.`,
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
          description:
            "Developed my first significant coding project, a task management application using JavaScript and HTML/CSS.",
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
          description:
            "Comprehensive certification covering modern web development technologies, frameworks, and best practices.",
          tags: ["React", "Node.js", "JavaScript"],
          color: "bg-blue-500/10 text-blue-500",
        },
        {
          title: "UI/UX Design",
          issuer: "Design Principles",
          description:
            "Understanding of user interface design principles, user experience best practices, and design thinking.",
          tags: ["Figma", "Prototyping", "User Research"],
          color: "bg-purple-500/10 text-purple-500",
        },
      ],
    }

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.1),transparent_70%)]" />

      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <Badge variant="outline" className="px-4 py-1 mb-4 border-primary/20 text-primary">
            <CalendarDays className="mr-1 h-3 w-3" /> My Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">About Me</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div style={{ y, opacity }} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="absolute -top-4 -left-4 -right-4 -bottom-4 rounded-2xl bg-gradient-to-tr from-primary/20 to-purple-500/20 -z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute -top-4 -left-4 -right-4 -bottom-4 rounded-2xl border border-primary/20 -z-10"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-xl border border-primary/20 glow"
            >
              {/* Zoomed out profile image */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/images/ojash-new-profile.jpg')",
                  backgroundSize: "85%",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-center bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-xl font-bold mb-1 text-white">Ojash Osti</h3>
                <p className="text-sm text-white/80">Software Engineering Student</p>
              </div>
            </motion.div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-primary/10 text-primary p-2 rounded-md mr-3">
                  <GraduationCap className="h-5 w-5" />
                </span>
                Who I Am
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{aboutData.bio}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-primary/10 text-primary p-2 rounded-md mr-3">
                  <Briefcase className="h-5 w-5" />
                </span>
                Education & Background
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{aboutData.education}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              {aboutData.achievements.map((item, index) => {
                const Icon =
                  item.icon === "GraduationCap"
                    ? GraduationCap
                    : item.icon === "Briefcase"
                      ? Briefcase
                      : item.icon === "Award"
                        ? Award
                        : Heart
                return (
                <motion.div key={index} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <Card className="border-primary/10 hover:border-primary/30 transition-colors duration-300">
                    <CardContent className="p-4">
                      <div className={`p-2 rounded-md ${item.color} mb-3 inline-block`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">My Journey</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-muted rounded-full" />

            {/* Timeline items */}
            <div className="space-y-12">
              {aboutData.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex items-center justify-center">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                      <span className="text-xs font-bold text-white">{item.year}</span>
                    </div>
                  </div>

                  <div className={`mt-6 md:w-5/12 ${index % 2 === 0 ? "ml-auto pl-4" : "mr-auto pr-4 md:text-right"}`}>
                    <Card className="border-primary/10 overflow-hidden">
                      <CardContent className="p-4">
                        <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                      <div className={`h-1 w-full bg-gradient-to-r from-primary to-purple-600`} />
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
            <Award className="h-6 w-6 mr-2 text-primary" />
            Certifications & Achievements
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }} className="group">
              <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500 mr-4">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">AWS Cloud Practitioner</h4>
                      <p className="text-sm text-muted-foreground">Amazon Web Services</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Foundational understanding of AWS Cloud concepts, services, security, architecture, pricing, and
                    support.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Cloud Computing
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      AWS Services
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Security
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }} className="group">
              <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500 mr-4">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Web Development</h4>
                      <p className="text-sm text-muted-foreground">Full Stack Certification</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive certification covering modern web development technologies, frameworks, and best
                    practices.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      React
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Node.js
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      JavaScript
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }} className="group">
              <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500 mr-4">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">UI/UX Design</h4>
                      <p className="text-sm text-muted-foreground">Design Principles</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Understanding of user interface design principles, user experience best practices, and design
                    thinking.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Figma
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Prototyping
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      User Research
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

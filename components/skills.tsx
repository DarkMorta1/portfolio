"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Database, Globe, Layout, Server, Terminal, Zap, Cpu, Cloud, Shield } from "lucide-react"
import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePortfolioData } from "@/hooks/use-portfolio-data"

export default function Skills() {
  const { data } = usePortfolioData()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const skillCategories =
    data?.skills?.categories?.map((cat: any) => ({
      ...cat,
      icon:
        cat.icon === "Layout"
          ? <Layout className="h-6 w-6" />
          : cat.icon === "Server"
            ? <Server className="h-6 w-6" />
            : cat.icon === "Database"
              ? <Database className="h-6 w-6" />
              : cat.icon === "Terminal"
                ? <Terminal className="h-6 w-6" />
                : cat.icon === "Globe"
                  ? <Globe className="h-6 w-6" />
                  : <Code className="h-6 w-6" />,
    })) || [
      {
        id: "frontend",
        title: "Frontend",
        icon: <Layout className="h-6 w-6" />,
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
        icon: <Server className="h-6 w-6" />,
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
        icon: <Database className="h-6 w-6" />,
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
        icon: <Code className="h-6 w-6" />,
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
        icon: <Terminal className="h-6 w-6" />,
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
        icon: <Globe className="h-6 w-6" />,
        color: "bg-teal-500/10 text-teal-500 dark:bg-teal-500/20",
        skills: [
          { name: "UI/UX Design", level: 75 },
          { name: "Responsive Design", level: 85 },
          { name: "SEO", level: 70 },
          { name: "Performance Optimization", level: 75 },
        ],
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
    <section id="skills" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/5 to-transparent" />
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
            <Zap className="mr-1 h-3 w-3" /> My Expertise
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">Technical Skills</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8"></div>
          <p className="text-muted-foreground text-center max-w-2xl">
            I've developed a diverse set of skills throughout my journey as a software engineering student. Here are
            some of the technologies and tools I'm proficient with.
          </p>
        </motion.div>

        <Tabs defaultValue="frontend" className="w-full">
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-muted/50 backdrop-blur-sm">
                {skillCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <span className={`p-1 rounded-md ${category.color} hidden md:inline-block`}>{category.icon}</span>
                    <span>{category.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>
          </div>

          {skillCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div
                  variants={item}
                  className="bg-card rounded-lg p-6 border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30"
                >
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-md ${category.color} mr-4`}>{category.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold">{category.title} Technologies</h3>
                      <p className="text-sm text-muted-foreground">
                        My expertise in {category.title.toLowerCase()} development
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div
                            className="skill-progress"
                            style={{ "--skill-percent": `${skill.level}%` } as React.CSSProperties}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={item} className="flex flex-col gap-6">
                  <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-3 flex items-center">
                        <Cpu className="h-5 w-5 mr-2 text-primary" /> Core Competencies
                      </h4>
                      <p className="text-muted-foreground mb-4">
                        My strongest skills in the {category.title.toLowerCase()} development area include:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.skills
                          .filter((skill) => skill.level >= 80)
                          .map((skill, i) => (
                            <Badge key={i} className="bg-primary/10 hover:bg-primary/20 text-primary border-none">
                              {skill.name}
                            </Badge>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-3 flex items-center">
                        <Cloud className="h-5 w-5 mr-2 text-primary" /> Currently Learning
                      </h4>
                      <p className="text-muted-foreground mb-4">I'm currently expanding my knowledge in these areas:</p>
                      <div className="flex flex-wrap gap-2">
                        {["GraphQL", "Vue.js", "AWS Lambda", "Kubernetes"].map((skill, i) => (
                          <Badge key={i} variant="outline" className="hover:bg-muted transition-colors">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div style={{ y, opacity }} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Shield className="h-6 w-6" />,
              title: "Problem Solving",
              description: "Analytical thinking and creative problem-solving approach to technical challenges.",
              color: "bg-blue-500/10 text-blue-500",
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: "Fast Learner",
              description: "Quickly adapt to new technologies and programming languages.",
              color: "bg-amber-500/10 text-amber-500",
            },
            {
              icon: <Globe className="h-6 w-6" />,
              title: "Team Collaboration",
              description: "Effective communication and collaboration in diverse team environments.",
              color: "bg-green-500/10 text-green-500",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-primary/10 h-full hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`p-3 rounded-md ${item.color} self-start mb-4`}>{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

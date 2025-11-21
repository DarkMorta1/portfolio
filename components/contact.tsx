"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Send, CheckCircle, MessageSquare } from "lucide-react"
import { Toaster, toast } from "react-hot-toast"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim()) newErrors.name = "Name is required"
    if (!formState.email.trim()) newErrors.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(formState.email)) newErrors.email = "Email is invalid"
    if (!formState.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      if (!formRef.current) throw new Error("Form ref not found")

      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })
      toast.success("Message sent!")
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error("Send Email Error:", error)
      toast.error("Failed to send message. Please try again or email directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const contactInfo = [
    { icon: <Phone className="h-5 w-5" />, title: "Phone", value: "9863439559", href: "tel:9863439559", color: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20" },
    { icon: <Mail className="h-5 w-5" />, title: "Email", value: "ostiojash2061@gmail.com", href: "mailto:ostiojash2061@gmail.com", color: "bg-green-500/10 text-green-500 dark:bg-green-500/20" },
    { icon: <MapPin className="h-5 w-5" />, title: "Location", value: "Kathmandu, Nepal", href: "#", color: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20" },
  ]

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "https://www.facebook.com/ojash.osti", label: "Facebook", color: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-500" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/ostiojash/", label: "Instagram", color: "bg-pink-500/10 hover:bg-pink-500/20 text-pink-500" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/ojash-osti-83727a260/", label: "LinkedIn", color: "bg-blue-600/10 hover:bg-blue-600/20 text-blue-600" },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative overflow-hidden">
      <Toaster />
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="flex flex-col items-center mb-16">
          <Badge variant="outline" className="px-4 py-1 mb-4 border-primary/20 text-primary"><MessageSquare className="mr-1 h-3 w-3" /> Let's Connect</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">Get In Touch</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8"></div>
          <p className="text-muted-foreground text-center max-w-2xl">Have a question or want to work together? Feel free to reach out to me using the contact form or through any of the provided contact methods.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div style={{ y, opacity }} className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <motion.a key={index} href={item.href} className="flex items-start hover:text-primary transition-colors p-4 rounded-lg hover:bg-muted/50" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <div className={`p-3 rounded-md ${item.color} mr-4`}>{item.icon}</div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-muted-foreground">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-bold mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full ${social.color} transition-all duration-300`} aria-label={social.label} whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} viewport={{ once: true }} className="mt-8 p-6 bg-muted/30 rounded-lg border border-primary/10">
              <h4 className="text-xl font-bold mb-4">Let's Work Together</h4>
              <p className="text-muted-foreground mb-4">I'm currently available for freelance work and internship opportunities. If you have a project that you want to get started, think you need my help with something, or just want to say hello, then get in touch.</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <span>Available for new opportunities</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4 }} viewport={{ once: true }}>
            <Card className="border-primary/10 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary to-purple-600" />
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center"><Send className="h-5 w-5 mr-2 text-primary" /> Send Me a Message</h3>

                {isSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="p-4 rounded-full bg-green-500/10 mb-4">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                    <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Your name" value={formState.name} onChange={handleChange} className={`${errors.name ? "border-red-500" : "border-input"} focus:border-primary transition-colors`} />
                      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="Your email" value={formState.email} onChange={handleChange} className={`${errors.email ? "border-red-500" : "border-input"} focus:border-primary transition-colors`} />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" name="message" placeholder="Your message" rows={5} value={formState.message} onChange={handleChange} className={`${errors.message ? "border-red-500" : "border-input"} focus:border-primary transition-colors`} />
                      {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                    </div>

                    <Button type="submit" className="w-full group relative overflow-hidden" disabled={isSubmitting}>
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" /> Send Message
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

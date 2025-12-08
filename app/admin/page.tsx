"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Save, Loader2 } from "lucide-react"
import { toast } from "sonner"
import HeroEditor from "@/components/admin/hero-editor"
import AboutEditor from "@/components/admin/about-editor"
import ProjectsEditor from "@/components/admin/projects-editor"
import SkillsEditor from "@/components/admin/skills-editor"
import ContactEditor from "@/components/admin/contact-editor"

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/check")
      if (response.ok) {
        const result = await response.json()
        if (result.authenticated) {
          setAuthenticated(true)
          loadData()
        } else {
          router.push("/admin/login")
        }
      } else {
        router.push("/admin/login")
      }
    } catch (error) {
      router.push("/admin/login")
    }
  }

  const loadData = async () => {
    try {
      const response = await fetch("/api/portfolio")
      if (response.ok) {
        const portfolioData = await response.json()
        setData(portfolioData)
      }
    } catch (error) {
      toast.error("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!data) return

    setSaving(true)
    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success("Data saved successfully!")
      } else {
        toast.error("Failed to save data")
      }
    } catch (error) {
      toast.error("An error occurred while saving")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
    } catch (error) {
      router.push("/admin/login")
    }
  }

  if (!authenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Failed to load data</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your portfolio content</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="mt-6">
            <HeroEditor data={data.hero} onChange={(hero) => setData({ ...data, hero })} />
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <AboutEditor data={data.about} onChange={(about) => setData({ ...data, about })} />
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <ProjectsEditor
              data={data.projects}
              onChange={(projects) => setData({ ...data, projects })}
            />
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <SkillsEditor data={data.skills} onChange={(skills) => setData({ ...data, skills })} />
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <ContactEditor data={data.contact} onChange={(contact) => setData({ ...data, contact })} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}




"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2 } from "lucide-react"

interface ProjectsEditorProps {
  data: any[]
  onChange: (data: any[]) => void
}

export default function ProjectsEditor({ data, onChange }: ProjectsEditorProps) {
  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Project description",
      technologies: [],
      github: "",
      demo: "",
      featured: false,
      image: "",
    }
    onChange([...data, newProject])
  }

  const removeProject = (id: string) => {
    onChange(data.filter((p) => p.id !== id))
  }

  const updateProject = (id: string, field: string, value: any) => {
    onChange(
      data.map((p) => {
        if (p.id === id) {
          return { ...p, [field]: value }
        }
        return p
      })
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Manage your projects</CardDescription>
          </div>
          <Button onClick={addProject}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((project) => (
          <Card key={project.id}>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold">{project.title || `Project ${project.id}`}</h4>
                <Button variant="destructive" size="sm" onClick={() => removeProject(project.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={project.title || ""}
                  onChange={(e) => updateProject(project.id, "title", e.target.value)}
                  placeholder="Project title"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={project.description || ""}
                  onChange={(e) => updateProject(project.id, "description", e.target.value)}
                  placeholder="Project description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Technologies (comma-separated)</Label>
                <Input
                  value={(project.technologies || []).join(", ") || ""}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "technologies",
                      e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                    )
                  }
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input
                  value={project.github || ""}
                  onChange={(e) => updateProject(project.id, "github", e.target.value)}
                  placeholder="https://github.com/username/repo"
                />
              </div>
              <div className="space-y-2">
                <Label>Demo URL (optional)</Label>
                <Input
                  value={project.demo || ""}
                  onChange={(e) => updateProject(project.id, "demo", e.target.value)}
                  placeholder="https://demo-url.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={project.image || ""}
                  onChange={(e) => updateProject(project.id, "image", e.target.value)}
                  placeholder="/images/projects/project.jpg"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={project.featured || false}
                  onCheckedChange={(checked) => updateProject(project.id, "featured", checked)}
                />
                <Label>Featured Project</Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}




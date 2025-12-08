"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ContactEditorProps {
  data: any
  onChange: (data: any) => void
}

export default function ContactEditor({ data, onChange }: ContactEditorProps) {
  const updateField = (field: string, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Edit your contact details and social links</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email || ""}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub URL</Label>
          <Input
            id="github"
            type="url"
            value={data.github || ""}
            onChange={(e) => updateField("github", e.target.value)}
            placeholder="https://github.com/username"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input
            id="linkedin"
            type="url"
            value={data.linkedin || ""}
            onChange={(e) => updateField("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/username"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="resume">Resume URL</Label>
          <Input
            id="resume"
            value={data.resume || ""}
            onChange={(e) => updateField("resume", e.target.value)}
            placeholder="/resume/resume.pdf"
          />
        </div>
      </CardContent>
    </Card>
  )
}



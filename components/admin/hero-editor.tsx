"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface HeroEditorProps {
  data: any
  onChange: (data: any) => void
}

export default function HeroEditor({ data, onChange }: HeroEditorProps) {
  const updateField = (field: string, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>Edit the main hero section of your portfolio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={data.name || ""}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={data.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Your professional title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={data.subtitle || ""}
            onChange={(e) => updateField("subtitle", e.target.value)}
            placeholder="Your subtitle"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={data.description || ""}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Your description"
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profileImage">Profile Image URL</Label>
          <Input
            id="profileImage"
            value={data.profileImage || ""}
            onChange={(e) => updateField("profileImage", e.target.value)}
            placeholder="/images/profile.jpg"
          />
        </div>
      </CardContent>
    </Card>
  )
}



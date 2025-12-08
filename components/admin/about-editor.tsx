"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface AboutEditorProps {
  data: any
  onChange: (data: any) => void
}

export default function AboutEditor({ data, onChange }: AboutEditorProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const addAchievement = () => {
    const newAchievement = {
      icon: "Award",
      title: "New Achievement",
      description: "Description here",
      color: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20",
    }
    updateField("achievements", [...(data.achievements || []), newAchievement])
  }

  const removeAchievement = (index: number) => {
    updateField("achievements", data.achievements.filter((_: any, i: number) => i !== index))
  }

  const updateAchievement = (index: number, field: string, value: string) => {
    const updated = [...data.achievements]
    updated[index] = { ...updated[index], [field]: value }
    updateField("achievements", updated)
  }

  const addTimelineItem = () => {
    const newItem = {
      year: "2024",
      title: "New Timeline Item",
      description: "Description here",
    }
    updateField("timeline", [...(data.timeline || []), newItem])
  }

  const removeTimelineItem = (index: number) => {
    updateField("timeline", data.timeline.filter((_: any, i: number) => i !== index))
  }

  const updateTimelineItem = (index: number, field: string, value: string) => {
    const updated = [...data.timeline]
    updated[index] = { ...updated[index], [field]: value }
    updateField("timeline", updated)
  }

  const addCertification = () => {
    const newCert = {
      title: "New Certification",
      issuer: "Issuer Name",
      description: "Description here",
      tags: [],
      color: "bg-blue-500/10 text-blue-500",
    }
    updateField("certifications", [...(data.certifications || []), newCert])
  }

  const removeCertification = (index: number) => {
    updateField("certifications", data.certifications.filter((_: any, i: number) => i !== index))
  }

  const updateCertification = (index: number, field: string, value: any) => {
    const updated = [...data.certifications]
    updated[index] = { ...updated[index], [field]: value }
    updateField("certifications", updated)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bio & Education</CardTitle>
          <CardDescription>Edit your bio and education information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={data.bio || ""}
              onChange={(e) => updateField("bio", e.target.value)}
              placeholder="Your bio"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            <Textarea
              id="education"
              value={data.education || ""}
              onChange={(e) => updateField("education", e.target.value)}
              placeholder="Your education background"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Manage your achievements</CardDescription>
            </div>
            <Button onClick={addAchievement} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {(data.achievements || []).map((achievement: any, index: number) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">Achievement {index + 1}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeAchievement(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Icon (e.g., GraduationCap, Briefcase, Award, Heart)</Label>
                  <Input
                    value={achievement.icon || ""}
                    onChange={(e) => updateAchievement(index, "icon", e.target.value)}
                    placeholder="Icon name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={achievement.title || ""}
                    onChange={(e) => updateAchievement(index, "title", e.target.value)}
                    placeholder="Title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={achievement.description || ""}
                    onChange={(e) => updateAchievement(index, "description", e.target.value)}
                    placeholder="Description"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Color Classes</Label>
                  <Input
                    value={achievement.color || ""}
                    onChange={(e) => updateAchievement(index, "color", e.target.value)}
                    placeholder="bg-blue-500/10 text-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>Manage your timeline items</CardDescription>
            </div>
            <Button onClick={addTimelineItem} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {(data.timeline || []).map((item: any, index: number) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">Timeline Item {index + 1}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeTimelineItem(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    value={item.year || ""}
                    onChange={(e) => updateTimelineItem(index, "year", e.target.value)}
                    placeholder="Year"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={item.title || ""}
                    onChange={(e) => updateTimelineItem(index, "title", e.target.value)}
                    placeholder="Title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={item.description || ""}
                    onChange={(e) => updateTimelineItem(index, "description", e.target.value)}
                    placeholder="Description"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Manage your certifications</CardDescription>
            </div>
            <Button onClick={addCertification} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {(data.certifications || []).map((cert: any, index: number) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">Certification {index + 1}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeCertification(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={cert.title || ""}
                    onChange={(e) => updateCertification(index, "title", e.target.value)}
                    placeholder="Certification title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issuer</Label>
                  <Input
                    value={cert.issuer || ""}
                    onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                    placeholder="Issuer name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={cert.description || ""}
                    onChange={(e) => updateCertification(index, "description", e.target.value)}
                    placeholder="Description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tags (comma-separated)</Label>
                  <Input
                    value={(cert.tags || []).join(", ") || ""}
                    onChange={(e) =>
                      updateCertification(
                        index,
                        "tags",
                        e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                      )
                    }
                    placeholder="Tag1, Tag2, Tag3"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Color Classes</Label>
                  <Input
                    value={cert.color || ""}
                    onChange={(e) => updateCertification(index, "color", e.target.value)}
                    placeholder="bg-blue-500/10 text-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}




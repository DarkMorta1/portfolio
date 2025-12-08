"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface SkillsEditorProps {
  data: any
  onChange: (data: any) => void
}

export default function SkillsEditor({ data, onChange }: SkillsEditorProps) {
  const updateCategory = (categoryId: string, field: string, value: any) => {
    onChange({
      ...data,
      categories: data.categories.map((cat: any) => {
        if (cat.id === categoryId) {
          return { ...cat, [field]: value }
        }
        return cat
      }),
    })
  }

  const addSkill = (categoryId: string) => {
    const newSkill = { name: "New Skill", level: 50 }
    updateCategory(
      categoryId,
      "skills",
      [...(data.categories.find((c: any) => c.id === categoryId)?.skills || []), newSkill]
    )
  }

  const removeSkill = (categoryId: string, skillIndex: number) => {
    const category = data.categories.find((c: any) => c.id === categoryId)
    if (category) {
      updateCategory(
        categoryId,
        "skills",
        category.skills.filter((_: any, i: number) => i !== skillIndex)
      )
    }
  }

  const updateSkill = (categoryId: string, skillIndex: number, field: string, value: any) => {
    const category = data.categories.find((c: any) => c.id === categoryId)
    if (category) {
      const updatedSkills = [...category.skills]
      updatedSkills[skillIndex] = { ...updatedSkills[skillIndex], [field]: value }
      updateCategory(categoryId, "skills", updatedSkills)
    }
  }

  return (
    <div className="space-y-6">
      {data.categories.map((category: any) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle>{category.title}</CardTitle>
            <CardDescription>Manage skills in the {category.title} category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Category Title</Label>
              <Input
                value={category.title || ""}
                onChange={(e) => updateCategory(category.id, "title", e.target.value)}
                placeholder="Category title"
              />
            </div>
            <div className="space-y-2">
              <Label>Icon Name (e.g., Layout, Server, Database)</Label>
              <Input
                value={category.icon || ""}
                onChange={(e) => updateCategory(category.id, "icon", e.target.value)}
                placeholder="Icon name"
              />
            </div>
            <div className="space-y-2">
              <Label>Color Classes</Label>
              <Input
                value={category.color || ""}
                onChange={(e) => updateCategory(category.id, "color", e.target.value)}
                placeholder="bg-blue-500/10 text-blue-500"
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Skills</Label>
                <Button onClick={() => addSkill(category.id)} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>
              {category.skills.map((skill: any, skillIndex: number) => (
                <Card key={skillIndex}>
                  <CardContent className="pt-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h5 className="font-medium">Skill {skillIndex + 1}</h5>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSkill(category.id, skillIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Skill Name</Label>
                      <Input
                        value={skill.name || ""}
                        onChange={(e) => updateSkill(category.id, skillIndex, "name", e.target.value)}
                        placeholder="Skill name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Level: {skill.level}%</Label>
                      <Slider
                        value={[skill.level || 50]}
                        onValueChange={(values) => updateSkill(category.id, skillIndex, "level", values[0])}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}



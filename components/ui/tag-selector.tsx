"use client"

import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { type ModelTag } from "@/types/model"

const TAG_OPTIONS: Array<{ value: ModelTag; label: string }> = [
  { value: "misc", label: "Miscellaneous" },
  { value: "tom", label: "Theory of Machines" },
  { value: "ht", label: "Heat Transfer" },
  { value: "th", label: "Thermal" },
  { value: "civ", label: "Civil Engineering" },
  { value: "fld", label: "Fluid Mechanics" },
  { value: "sld", label: "Solid Modeling" },
]

interface TagSelectorProps {
  value?: ModelTag
  onValueChange: (value: ModelTag) => void
}

export function TagSelector({ value, onValueChange }: TagSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a tag" />
      </SelectTrigger>
      <SelectContent>
        {TAG_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <Badge variant={option.value}>{option.label}</Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 
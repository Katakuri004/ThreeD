"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Badge } from "./badge"
import { type ModelTag } from "@/app/models/[id]/page"

const TAG_OPTIONS: Array<{ value: ModelTag; label: string }> = [
  { value: "tom", label: "Theory of Machines" },
  { value: "ht", label: "Heat Transfer" },
  { value: "th", label: "Thermal" },
  { value: "civ", label: "Civil Engineering" },
  { value: "fld", label: "Fluid Mechanics" },
  { value: "sld", label: "Solid Modeling" },
  { value: "misc", label: "Miscellaneous" },
]

interface TagSelectorProps {
  value?: ModelTag
  onValueChange: (value: ModelTag) => void
}

export function TagSelector({ value, onValueChange }: TagSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category">
          {value && (
            <div className="flex items-center gap-2">
              <Badge variant={value}>{TAG_OPTIONS.find(tag => tag.value === value)?.label}</Badge>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {TAG_OPTIONS.map((tag) => (
            <SelectItem key={tag.value} value={tag.value}>
              <div className="flex items-center gap-2">
                <Badge variant={tag.value}>{tag.label}</Badge>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
} 
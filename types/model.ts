export type ModelTag = "misc" | "tom" | "ht" | "th" | "civ" | "fld" | "sld"

export type ModelStatus = "DRAFT" | "IN_PROGRESS" | "COMPLETED" | "PUBLIC" | "PRIVATE"

export const TAG_LABELS: Record<ModelTag, string> = {
    misc: "Miscellaneous",
    tom: "Theory of Machines",
    ht: "Heat Transfer",
    th: "Thermal",
    civ: "Civil Engineering",
    fld: "Fluid Mechanics",
    sld: "Solid Modeling"
}

export interface Model {
    id: string
    title: string
    description: string
    category: ModelTag
    fileUrl: string
    thumbnail: string
    status: ModelStatus
    likes: number
    downloads: number
    createdAt: Date
    updatedAt: Date
    userId: string
    author: string
    gradient: string
    tag: ModelTag
    date: string
} 
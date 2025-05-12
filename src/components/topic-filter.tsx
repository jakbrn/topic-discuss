"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

interface TopicFilterProps {
  categories: string[]
  activeCategory?: string
}

export default function TopicFilter({ categories, activeCategory }: TopicFilterProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleCategoryClick = (category?: string) => {
    if (category) {
      router.push(`${pathname}?category=${category}`)
    } else {
      router.push(pathname)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant={!activeCategory ? "default" : "outline"} size="sm" onClick={() => handleCategoryClick()}>
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

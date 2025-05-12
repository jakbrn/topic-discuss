import TopicCard from '@/components/topic-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import TopicFilter from '@/components/topic-filter'
import { Topic } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function TopicsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const payload = await getPayload({ config })

  const category = searchParams.category

  const { docs: topics, totalDocs } = await payload.find({
    collection: 'topics',
    sort: '-createdAt',
    limit: 12,
    ...(category
      ? {
          where: {
            category: { equals: category },
          },
        }
      : {}),
  })

  // Get all unique categories for the filter
  const { docs: categories } = await payload.find({
    collection: 'topics',
    limit: 0,
    pagination: false,
  })

  const uniqueCategories = Array.from(new Set(categories.map((topic: Topic) => topic.category)))

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Topics</h1>
          <p className="text-muted-foreground">Browse and join discussions on various topics</p>
        </div>
        <Button asChild>
          <Link href="/topics/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Topic
          </Link>
        </Button>
      </div>

      <TopicFilter categories={uniqueCategories} activeCategory={category} />

      {topics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic: Topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No topics found</h3>
          <p className="text-muted-foreground mt-1">
            {category
              ? `No topics found in the "${category}" category.`
              : 'No topics have been created yet.'}
          </p>
        </div>
      )}
    </div>
  )
}

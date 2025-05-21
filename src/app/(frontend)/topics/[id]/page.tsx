import { notFound } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import ChatSection from '@/components/chat-section'
import OnlineUsers from '@/components/online-users'
import { Message, Topic, User } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'

interface TopicPageProps {
  params: {
    id: string
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const payload = await getPayload({ config })

  try {
    const topic = (await payload.findByID({
      collection: 'topics',
      id: params.id,
      depth: 1,
    })) as Topic

    const { docs: messages } = await payload.find({
      collection: 'messages',
      where: {
        topic: { equals: params.id },
      },
      sort: 'createdAt',
      depth: 1,
    })

    const creator = topic.createdBy as User

    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{topic.title}</h1>
            <Badge>{topic.category}</Badge>
          </div>

          <p className="text-muted-foreground mb-4">{topic.description}</p>

          <div className="flex items-center text-sm text-muted-foreground">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage
                src={(creator?.avatar as string) || '/placeholder.svg'}
                alt={creator?.name}
              />
              <AvatarFallback>{creator?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>
              Created by {creator?.name}{' '}
              {formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ChatSection topicId={params.id} initialMessages={messages as Message[]} />
          </div>
          <div className="lg:col-span-1">
            <OnlineUsers topicId={params.id} />
          </div>
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}

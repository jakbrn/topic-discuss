import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import type { Topic } from "@/types"
import { formatDistanceToNow } from "date-fns"

interface TopicCardProps {
  topic: Topic
}

export default function TopicCard({ topic }: TopicCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{topic.title}</CardTitle>
          <Badge variant={topic.featured ? "default" : "secondary"}>{topic.category}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{topic.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-sm text-muted-foreground">
          <MessageSquare className="mr-1 h-4 w-4" />
          <span>{topic.messageCount || 0} messages</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          Created {formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true })}
        </div>
        <Button asChild size="sm">
          <Link href={`/topics/${topic.id}`}>Join Discussion</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

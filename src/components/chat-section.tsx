'use client'

import type React from 'react'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Message } from '@/payload-types'

interface ChatSectionProps {
  topicId: string
  initialMessages: Message[]
}

export default function ChatSection({ topicId, initialMessages }: ChatSectionProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'You must be logged in to send messages.',
        variant: 'destructive',
      })
      router.push('/auth/login')
      return
    }

    if (!newMessage.trim()) return

    setIsSubmitting(true)
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-muted/50 flex items-center justify-between">
        <h2 className="font-semibold">Discussion</h2>
        <div className="flex items-center gap-2">
          {/* <span
            className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
          ></span> */}
          <span className="text-sm text-muted-foreground">
            {/* {isConnected ? 'Connected' : 'Disconnected'} */}
          </span>
        </div>
      </div>

      <div className="h-[500px] overflow-y-auto p-4 space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => {
            const sender = message.createdBy as any
            const isCurrentUser = user && sender?.id === user.id

            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex max-w-[80%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <Avatar className={`h-8 w-8 ${isCurrentUser ? 'ml-2' : 'mr-2'}`}>
                    <AvatarImage src={sender?.avatar || '/placeholder.svg'} alt={sender?.name} />
                    <AvatarFallback>{sender?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={`rounded-lg p-3 ${isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                    >
                      {message.content}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {sender?.name} •{' '}
                      {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No messages yet. Be the first to start the discussion!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="resize-none min-h-[80px]"
            // disabled={!isConnected}
          />
          {/* <Button type="submit" disabled={isSubmitting || !newMessage.trim() || !isConnected}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send'
            )}
          </Button> */}
        </form>
      </div>
    </div>
  )
}

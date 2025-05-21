'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface OnlineUser {
  id: string
  name: string
  avatar?: string
}

interface OnlineUsersProps {
  topicId: string
}

export default function OnlineUsers({ topicId }: OnlineUsersProps) {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Online Users</h3>
        <Badge variant="outline">{onlineUsers.length}</Badge>
      </div>

      {onlineUsers.length > 0 ? (
        <div className="space-y-3">
          {onlineUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm truncate">{user.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No users online</p>
      )}
    </div>
  )
}

import { Message, Topic } from '@/payload-types'

// Topic API functions
export async function createTopic(data: Partial<Topic>): Promise<Topic> {
  const response = await fetch('/api/topics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create topic')
  }

  return response.json()
}

// Message API functions
export async function sendMessage(data: Partial<Message>): Promise<Message> {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  return response.json()
}

// Auth API functions
export async function register(data: { name: string; email: string; password: string }) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to register')
  }

  return response.json()
}

export async function login(data: { email: string; password: string }) {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to login')
  }

  return response.json()
}

export async function logout() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Failed to logout')
  }

  return response.json()
}

export async function getCurrentUser() {
  const response = await fetch('/api/users/me')

  if (!response.ok) {
    return null
  }

  return response.json()
}

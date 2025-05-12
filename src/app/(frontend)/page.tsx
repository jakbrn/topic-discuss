import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Home() {
  const payload = await getPayload({ config })

  return (
    <section className="py-12 md:py-24 lg:py-32 flex flex-col items-center text-center space-y-6">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
        Join the conversation on <span className="text-primary">TopicDiscuss</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-[600px]">
        Discover topics that interest you and engage in meaningful discussions with a community of
        like-minded individuals.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/topics">Browse Topics</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/auth/register">Sign Up</Link>
        </Button>
      </div>
    </section>
  )
}

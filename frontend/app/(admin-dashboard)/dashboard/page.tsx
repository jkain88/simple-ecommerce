'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Banknote } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function Dashboard() {
  const { data: session } = useSession()
  return (
    <div>
      <div className="mt-20">
        <p className="text-3xl font-semibold">
          Hi there, {session?.user.email}
        </p>
        <p className="mt-2">
          Here&apos;s some information we gathered about your store
        </p>

        <div className="mt-10 flex gap-16">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Sales</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Banknote size={50} />
              <p className="text-xl">₱100.00</p>
            </CardContent>
          </Card>

          <Card className="w-96">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Banknote size={50} />
              <p className="text-xl">28</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

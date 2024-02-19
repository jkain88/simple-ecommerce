'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  NavigationMenuList,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'
import { Banknote } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import Link from 'next/link'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

export default function Dashboard() {
  const { data: session } = useSession()
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/dashboard/login' })
  }

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ]

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.number.int({ min: 0, max: 15 })),
        backgroundColor: 'black',
        borderColor: 'black',
        // pointRadius: 4,
        pointBackgroundColor: 'black',
        fill: false,
      },
    ],
  }

  const options = {
    // responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  }

  console.log('DATA', data)

  return (
    <div>
      <div className="mt-20">
        <div className="flex justify-between">
          <div>
            <p className="text-3xl font-semibold">
              Hi there, {session?.user.email}
            </p>
            <p className="mt-2">
              Here&apos;s some information we gathered about your store
            </p>
          </div>

          <NavigationMenu className="self-start">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {session?.user.email}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="h-32 space-y-4">
                  <p className="mx-4 mt-3 w-48 cursor-pointer rounded-lg p-2 hover:bg-gray-100">
                    Account Settings
                  </p>
                  <p
                    className="mx-4 w-48 cursor-pointer rounded-lg p-2 hover:bg-gray-100"
                    onClick={handleSignOut}
                  >
                    Logout
                  </p>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

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

          <Card className="w-96">
            <CardHeader>
              <CardTitle>Newly Registered Customers</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Banknote size={50} />
              <p className="text-xl">28</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Line
            className="mt-10 h-10 w-10 rounded-lg bg-white p-10 shadow-lg"
            options={options}
            data={data}
          />
        </div>
        {/* <div className="mt-20 bg-white">
          <div className="h-96"></div>
        </div> */}
      </div>
    </div>
  )
}

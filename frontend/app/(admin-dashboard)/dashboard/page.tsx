'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  NavigationMenuList,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'
import { Banknote, CalendarIcon } from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { useQuery } from '@tanstack/react-query'
import { Api } from '@/lib/Api'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ['dashboard-top-products'],
    queryFn: async () => {
      const api = new Api()
      return api.products.productsList({ page_size: 4 })
    },
  })

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
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  }

  return (
    <div className="container">
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

        <div className="mt-5 flex gap-5">
          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'w-[300px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter by order status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className=" mt-10 flex gap-16">
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
              <CardTitle>Customers</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Banknote size={50} />
              <p className="text-xl">28</p>
            </CardContent>
          </Card>
        </div>

        <div className="w- mt-10 h-64 rounded-lg bg-white p-5 shadow-xl">
          <Line className="" options={options} data={data} />
        </div>

        <div className="my-10 rounded-lg bg-white px-10 py-8 shadow-xl">
          <h1 className="text-3xl font-bold">Top Products</h1>
          <div className="mt-10 space-y-10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-lg font-semibold text-black">
                    Name
                  </TableHead>
                  <TableHead className="text-lg font-semibold text-black">
                    Units sold
                  </TableHead>
                  <TableHead className="text-lg font-semibold text-black">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {!isProductsLoading &&
                  products?.data.results.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-4">
                          <Image
                            width={100}
                            height={10}
                            src={product.images[0].image!}
                            alt={product.name}
                            className="h-20 w-20 rounded-lg"
                          />
                          <p>{product.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>Test</TableCell>
                      <TableCell>Test</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

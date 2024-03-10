'use client'

import { Api } from '@/lib/Api'
import { Spinner } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type ProductDetailProps = {
  params: {
    slug: string
  }
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', params.slug],
    queryFn: async () => {
      const api = new Api()
      const response = await api.products.productsDetailRead(params.slug)
      return response
    },
    enabled: !!params.slug,
  })

  console.log(params.slug)
  return (
    <div className="h-full">
      <div className="mt-10">
        <div
          className="flex cursor-pointer items-center gap-3 hover:text-gray-500"
          onClick={handleBack}
        >
          <ArrowLeft className="cursor-pointer " />
          <p className="text-lg font-semibold">Products</p>
        </div>
        <div className="mt-10">
          {isLoading ? (
            <div>
              <Spinner color="default" />
            </div>
          ) : (
            <h1 className="text-3xl font-semibold">{product?.data.name}</h1>
          )}
        </div>
      </div>
    </div>
  )
}

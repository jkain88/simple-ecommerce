import AddressDetailForm from '@/components/forms/AddressDetailForm'
import { addresses } from '@/constants/testData'

export default function AddressDetail({ params }: { params: { id: string } }) {
  const address = addresses.find((address) => address.id == parseInt(params.id))

  return (
    <div>
      <p>Address Detail</p>
      <AddressDetailForm address={address} />
    </div>
  )
}

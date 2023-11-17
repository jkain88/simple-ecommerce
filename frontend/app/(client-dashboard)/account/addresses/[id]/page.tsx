export default function AddressDetail({ params }: { params: { id: string } }) {
  console.log(typeof params.id)
  return (
    <div>
      <p>Address Detail</p>
    </div>
  )
}

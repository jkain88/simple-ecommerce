interface AccountLayout {
  children: React.ReactNode
}

export default function AccountLayout({ children }: AccountLayout) {
  return (
    <div className="col-span-3 grow rounded-lg bg-white px-14 py-10 shadow-xl">
      {children}
    </div>
  )
}

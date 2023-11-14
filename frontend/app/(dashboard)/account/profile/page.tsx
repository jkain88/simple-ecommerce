import ProfileForm from '@/components/forms/ProfileForm'
import { profileSchema } from '@/lib/form-validations/account'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Inputs = z.infer<typeof profileSchema>

export default function Profile() {
  return (
    <div className="divide-y-1">
      <p className="pb-3 text-3xl font-bold">My Profile</p>
      <ProfileForm />
    </div>
  )
}

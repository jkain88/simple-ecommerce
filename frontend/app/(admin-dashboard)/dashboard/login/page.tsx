import SignInForm from '@/components/forms/SignInForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function DashboardLogin() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your credentials to proceed</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm accountType="staff" />
        </CardContent>
      </Card>
    </div>
  )
}

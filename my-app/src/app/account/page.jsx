import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Dashboard from './dashboard'

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

        <div className="flex items-center gap-4">
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <Dashboard user={user} />
}
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AccountForm from './account-form'

import Link from "next/link"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "./ui/card"
import { Separator } from "./ui/separator"

export default function Data() {
  return (
    (<div
      className="grid min-h-screen items-start gap-4 px-4 md:items-center md:gap-8 md:px-10">
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="">ARISE</span>
          </Link>
          <form className="flex-1">
            <div className="relative">
              <SearchIcon
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                placeholder="Search"
                type="search" />
            </div>
          </form>
          <Button
            className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800 dark:border-gray-800"
            size="icon"
            variant="outline">
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
        <div className="flex items-center gap-4 md:gap-2">
          <div className="flex items-center gap-2">
            {/* <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32" /> */}
            <div className="flex flex-col text-sm font-medium md:text-base">
              <div>Dr. Samantha Hill</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Family Physician</div>
            </div>
          </div>
          <Button size="sm" variant="outline">
            <FileEditIcon className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div className="grid gap-1">
              <div className="font-semibold">Sophia Anderson</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">23 years, Female</div>
            </div>
            <Separator />
            <div className="grid gap-1">
              <div className="font-semibold">ID: #3102</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Member since: June 1, 2020</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Vital Signs</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="text-3xl font-bold">120/80</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Blood Pressure (mmHg)</div>
            </div>
            <div className="border-r border-gray-200 dark:border-gray-800 h-12" />
            <div className="flex flex-col items-center gap-1">
              <div className="text-3xl font-bold">72</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Heart Rate (bpm)</div>
            </div>
            <div className="border-r border-gray-200 dark:border-gray-800 h-12" />
            <div className="flex flex-col items-center gap-1">
              <div className="text-3xl font-bold">68.5</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Weight (kg)</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside grid gap-2 text-sm">
            <li>Diabetes</li>
            <li>Asthma</li>
            <li>High Cholesterol</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm">
            <li>Metformin - 500mg, 1 tablet, 2 times a day</li>
            <li>Albuterol - Inhaler, as needed for wheezing</li>
            <li>Atorvastatin - 20mg, 1 tablet, once daily</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Allergies</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm">
            <li>Peanuts</li>
            <li>Penicillin</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm">
            <li>
              <div className="font-semibold">Dr. Patel</div>
              <div>Cardiology Clinic</div>
              <div>June 30, 2022 - 10:00 AM</div>
            </li>
            <li>
              <div className="font-semibold">Dr. Lee</div>
              <div>Endocrinology Clinic</div>
              <div>July 15, 2022 - 9:30 AM</div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>)
  );
}


function Package2Icon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 9h18v10a2 2 0 1-2 2H5a2 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 1 7.24 3h9.52a2 1.8 1.1L21" />
      <path d="M12 3v6" />
    </svg>)
  );
}


function SearchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}


function ChevronRightIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>)
  );
}


function FileEditIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M4 13.5V4a2 2 0 1 2-2h8.5L20 7.5V20a2 1-2 2h-5.5" />
      <polyline points="14 2 8 20" />
      <path d="M10.42 12.61a2.1 2.1 0 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>)
  );
}



// export default async function Account() {
//   const cookieStore = cookies()
//   const supabase = createServerComponentClient({ cookies: () => cookieStore })

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   return <AccountForm user={user} />
// }
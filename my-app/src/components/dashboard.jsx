import Link from "next/link"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "./ui/dropdown-menu"
import { Separator } from "./ui/separator"
import { CardTitle, CardHeader, CardContent, Card } from "./ui/card"

export function Dashboard() {
  return (
    (<div className="grid min-h-screen w-full lg:grid-cols-[300px_1fr]">
      <div className="flex flex-col border-r bg-gray-100/40 dark:bg-gray-800/40">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="">Acme Hospital</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="#">
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#">
              <CalendarIcon className="h-4 w-4" />
              Appointments
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#">
              <FileTextIcon className="h-4 w-4" />
              Medical Records
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#">
              <PillIcon className="h-4 w-4" />
              Medications
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#">
              <MessageSquareIcon className="h-4 w-4" />
              Messages
              <Badge
                className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">3</Badge>
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <header
          className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search"
                  type="search" />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800 dark:border-gray-800"
                size="icon"
                variant="ghost">
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-2">
            <div className="grid gap-1.5">
              <h1 className="font-semibold text-2xl">Patient Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Summary of key health metrics, upcoming appointments, and medication reminders.
              </p>
            </div>
            <div className="grid gap-1.5 md:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <h2 className="font-semibold">Heart Rate</h2>
                <p className="text-4xl font-semibold">72 bpm</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="font-semibold">Blood Pressure</h2>
                <p className="text-4xl font-semibold">120/80 mmHg</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="font-semibold">Temperature</h2>
                <p className="text-4xl font-semibold">98.6°F</p>
              </div>
            </div>
            <Separator />
          </div>
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h2 className="font-semibold">Dermatology Consultation</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">With Dr. Aisha Johnson</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-gray-500 dark:text-gray-400">10:00 AM</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tomorrow</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h2 className="font-semibold">Physical Therapy Session</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">With Dr. Alex Smith</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-gray-500 dark:text-gray-400">3:00 PM</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Medication Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h2 className="font-semibold">Aspirin</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pain relief</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-gray-500 dark:text-gray-400">10:00 AM</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tomorrow</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h2 className="font-semibold">Metformin</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Diabetes</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-gray-500 dark:text-gray-400">3:00 PM</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
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


function HomeIcon(props) {
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
      <path d="m3 9 9-7 7v11a2 2 0 1-2 2H5a2 1-2-2z" />
      <polyline points="9 22 12 15" />
    </svg>)
  );
}


function CalendarIcon(props) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>)
  );
}


function FileTextIcon(props) {
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
      <path d="M14.5 2H6a2 2 0 0-2 2v16a2 2h12a2 2-2V7.5L14.5 2z" />
      <polyline points="14 2 8 20" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>)
  );
}


function PillIcon(props) {
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
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 7 7Z" />
      <path d="m8.5 8.5 7" />
    </svg>)
  );
}


function MessageSquareIcon(props) {
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
      <path d="M21 15a2 2 0 1-2 2H7l-4 4V5a2 1 2-2h14a2 2z" />
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

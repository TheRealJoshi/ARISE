import { Button } from "./ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "./ui/card"

export default function Scheduling() {
  return (
    (<div className="grid gap-4 md:grid-cols-[300px_1fr] xl:grid-cols-[350px_1fr]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button className="rounded-full" size="icon" variant="ghost">
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="font-semibold text-lg md:text-xl">
            Patient
            <span className="font-normal text-gray-500 dark:text-gray-400">#3102</span>
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <Button size="icon" variant="outline">
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button size="icon" variant="outline">
              <ChevronRightIcon className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Demographics</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm">
              <div>
                <div className="font-medium">Name</div>
                <div>Sophia Anderson</div>
              </div>
              <div>
                <div className="font-medium">Gender</div>
                <div>Female</div>
              </div>
              <div>
                <div className="font-medium">Date of birth</div>
                <div>1988-06-23</div>
              </div>
              <div>
                <div className="font-medium">Phone</div>
                <div>+1 888 8888 8888</div>
              </div>
              <div>
                <div className="font-medium">Email</div>
                <div>sophia@example.com</div>
              </div>
              <div>
                <div className="font-medium">Address</div>
                <div>1234 Main St. Anytown, CA 12345</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Medical history</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm">
              <div>
                <div className="font-medium">Allergies</div>
                <div>Penicillin</div>
              </div>
              <div>
                <div className="font-medium">Medications</div>
                <div>Aspirin</div>
              </div>
              <div>
                <div className="font-medium">Conditions</div>
                <div>Asthma</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Vital signs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div>
                <div className="font-medium">Height</div>
                <div>165 cm</div>
              </div>
              <div>
                <div className="font-medium">Weight</div>
                <div>65 kg</div>
              </div>
              <div>
                <div className="font-medium">Blood type</div>
                <div>O+</div>
              </div>
              <div>
                <div className="font-medium">Temperature</div>
                <div>37°C</div>
              </div>
              <div>
                <div className="font-medium">Heart rate</div>
                <div>72 bpm</div>
              </div>
              <div>
                <div className="font-medium">Blood pressure</div>
                <div>120/80 mmHg</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div>
                <div className="font-medium">June 30, 2022</div>
                <div>Consultation</div>
              </div>
              <div>
                <div className="font-medium">July 15, 2022</div>
                <div>Follow-up</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="64"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "64/64",
                    objectFit: "cover",
                  }}
                  width="64" />
                <div className="grid gap-1 text-sm">
                  <div className="font-semibold">Dr. Smith Johnson</div>
                  <div>Cardiologist</div>
                </div>
              </div>
              <div className="grid gap-1 text-sm">
                <div>
                  <div className="font-semibold">July 15, 2022</div>
                  <div>10:00 AM</div>
                </div>
                <div>
                  <div className="font-semibold">Acme Hospital</div>
                  <div>1234 Main St. Anytown, CA 12345</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Medication reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <PillIcon className="h-8 w-8" />
                <div className="grid gap-1 text-sm">
                  <div className="font-semibold">Aspirin</div>
                  <div>Take 1 tablet by mouth once daily</div>
                </div>
                <div className="ml-auto text-gray-500 dark:text-gray-400">10:00 AM</div>
              </div>
              <div className="flex items-center gap-4">
                <PillIcon className="h-8 w-8" />
                <div className="grid gap-1 text-sm">
                  <div className="font-semibold">Lipitor</div>
                  <div>Take 1 tablet by mouth once daily</div>
                </div>
                <div className="ml-auto text-gray-500 dark:text-gray-400">6:00 PM</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>)
  );
}


function ChevronLeftIcon(props) {
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
      <path d="m15 18-6-6 6-6" />
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

'use client'
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCallback, useEffect, useState, useRef } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import sampleData from './data'
import Avatar from './avatar'

const AudioPlayer = ({ src }) => {
  // Use the useRef hook to get a reference to the audio element
  const audioRef = useRef(null);

  // Function to play the audio
  const playAudio = () => {
    audioRef.current.play();
  };

  return (
    <div>
      {/* The src prop is used here */}
      <audio ref={audioRef} src={src} preload="auto" />
      <button onClick={playAudio}>Play Audio</button>
    </div>
  );
};


const sampleData = {
  "summary_info": {
    "patient_name": "Kevin Wang",
    "blood_pressure": "121/73",
    "height": "5' 9",
    "weight": "137 lb",
    "medications": [
      "methimazole 5 mg tablet",
      "cholecalciferol 25 mcg (1,000 unit) tablet",
      "EPINEPHrine 0.3 mg/0.3 mL Atin",
      "multivitamin with minerals tablet"
    ],
    "labs": [
      "Free T4",
      "TSH",
      "CBC with Differential",
      "Comprehensive Metabolic Panel",
      "Thyroid stimulating immunoglobulin",
      "Thyrotropin Receptor Antibody"
    ],
    "vaccinations": [
      "HPV VACCINE (1 - Male 2-dose series)",
      "TD Vaccine Adult",
      "COVID-19 Vaccine (4 - 2023-24 season)"
    ],
    "recent_visits": [
      "JUL 10 2024 Follow Up with Dr. A Morris",
      "NOV 25 2024 Physical Exam with E Preston"
    ],
    "pharmacy": "WALGREENS DRUG STORE #04536 - SAINT JOSEPH, MI - 1260 HILLTOP RD",
    "medical_history": [
      "Graves disease",
      "Hyperthyroidism"
    ],
    "allergies": [
      "methIMAzole"
    ]
  },
  "rap_lyrics": [
    "Yo, it's Kevin Wang, got my after-visit summary",
    "Decrease methimazole, take 1 tablet daily",
    "Blood work in 2 weeks, 6 weeks, and before my next appointment",
    "Stay on that vitamin D supplement, gotta keep up the momentum",
    "",
    "Check out my updated medication list for all the details",
    "Got that methIMAzole, payment per fill, $19 mail",
    "Address on Hilltop Rd in Saint Joseph",
    "Phone number, 269-983-0315, in case you wanna reach us",
    "",
    "Lab orders from Dr. A Morris, gotta complete 'em soon",
    "Free T4, TSH, gotta get 'em done by December 30th, don't assume",
    "More lab orders in February and June 2024",
    "Gotta stay on top of my health, can't ignore",
    "",
    "Changed my medications today, gotta pick 'em up at Walgreens",
    "Store #04536, Saint Joseph, MI, on Hilltop Rd, fulfillin' my needs",
    "Dr. A Morris addressed my Graves disease and Hyperthyroidism",
    "Blood pressure's 121/73, BMI 20.25, weight 137 lb, 1.9 oz, ain't no algorithm",
    "",
    "Pulse rate is 64, height 5'9, everything lookin' fine",
    "Check out my After Visit Summary online, it's all in line",
    "If you got questions, call 269-982-9300, talk to our MyChart staff",
    "We got your back, keepin' your health on the right path",
    "",
    "More instructions from Dr. A Morris for Hyperthyroidism care",
    "Gotta follow up on July 10th, Corewell Health, be there",
    "Physical exam with E Preston on November 25th, mark the date",
    "John M. Stafford MD and Associates, Saint Joseph, don't be late",
    "",
    "Got some vaccines due, HPV, TD, and COVID-19",
    "Don't forget the due dates, stay up to date, know what I mean?",
    "Annual wellness visit on November 23rd, gotta stay on track",
    "Health maintenance is key, stay healthy, that's a fact",
    "",
    "Changes to my medication list, gotta stay aware",
    "MethIMAzole 5 mg tablet, take 1 daily, handle with care",
    "Cholecalciferol, also known as Vitamin D3, take as instructed",
    "Return in 6 months, keepin' my health fully constructed",
    "",
    "Keep takin' my medications, stay on top of my health game",
    "Epinephrine, EpiPen, inject as needed, no time to be tame",
    "Multivitamin with minerals, One Daily Plus Minerals on the list",
    "Stay healthy, stay strong, that's how I persist",
    "",
    "Corewell Health Diabetes & Endocrinology in Royalton",
    "That's where I had my visit, where it all went down",
    "Phone number, 269-408-1600, fax 269-408-1602",
    "Speak for yourself, plan your care, don't forget what to do"
  ]
}

export default function ClientInformation({user}) {
  const [data, setData] = useState(sampleData);
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [counter, setCounter] = useState(0)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  const audioRef = useRef();

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
    } else {
      // Throw error
    }
  }


  const handleClick = () => {
    console.log('Waiting 15 seconds to trigger the request...');
    
    // Use setTimeout to delay the fetch request
    setTimeout(() => {
      getProfile()
      // Replace `your_api_endpoint` with the path to your API route
      // fetch('/api/delayedAction')
      //   .then(response => response.json())
      //   .then(data => console.log(data.message))
      //   .catch(error => console.error('Error:', error));
    }, 15000); // 15000 milliseconds = 15 seconds
  };

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    // console.log(sampleData)
    getProfile()
  }, [user, getProfile])

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    (<div
      key="1"
      className="grid min-h-screen items-start gap-4 px-4 md:items-center md:gap-8 md:px-10">
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <span>ARISE</span>
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
            <div className="flex flex-col text-sm font-medium md:text-base">
              <div>Dr. A Morris</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Family Physician</div>
            </div>
          </div>
          {/* <Button size="sm" variant="outline">
            <FileEditIcon className="mr-2 h-4 w-4" />
            Edit
          </Button> */}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div className="grid gap-1">
              {sampleData.summary_info.patient_name && sampleData.summary_info.patient_name.length > 0 ? <div className="font-semibold">{sampleData.summary_info.patient_name}, 21 years old</div> :
                <div className="font-semibold">I.E: {sampleData.summary_info.patient_name}</div>
              }
              {/* <div className="text-sm text-gray-500 dark:text-gray-400">21 years, Male</div> */}
            </div>
            <Separator />
            {/* <div className="grid gap-1">
              <div className="font-semibold">ID: #3102</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Member since: June 1, 2020</div>
            </div> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Vital Signs</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              {sampleData.summary_info.blood_pressure && sampleData.summary_info.blood_pressure.length > 0 ? <div className="text-3xl font-bold">{sampleData.summary_info.blood_pressure}</div> :
                <div className="text-3xl font-bold">I.E: {sampleData.summary_info.blood_pressure}</div>
              }
              <div className="text-xs text-gray-500 dark:text-gray-400">Blood Pressure (mmHg)</div>
            </div>
            <div className="border-r border-gray-200 dark:border-gray-800 h-12" />
            <div className="flex flex-col items-center gap-1">
              {sampleData.summary_info.blood_pressure && sampleData.summary_info.blood_pressure.length > 0 ? <div className="text-3xl font-bold">{sampleData.summary_info.height}</div>:
                <div className="text-3xl font-bold">I.E: {sampleData.summary_info.height}</div>
              }
              <div className="text-xs text-gray-500 dark:text-gray-400">Height (ft)</div>
            </div>
            <div className="border-r border-gray-200 dark:border-gray-800 h-12" />
            <div className="flex flex-col items-center gap-1">
              {sampleData.summary_info.weight && sampleData.summary_info.weight.length > 0 ? <div className="text-3xl font-bold">{sampleData.summary_info.weight}</div>:
                <div className="text-3xl font-bold">I.E: {sampleData.summary_info.weight}</div>
              }
              <div className="text-xs text-gray-500 dark:text-gray-400">Weight (lbs)</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Preferred Pharmacist</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside grid gap-2 text-sm">
          {sampleData.summary_info.pharmacy && sampleData.summary_info.pharmacy.length > 0 ? <li>{sampleData.summary_info.pharmacy}</li> : 
          <li>I.E: {sampleData.summary_info.pharmacy}</li>
          }
{/*             
            <li>Asthma</li>
            <li>High Cholesterol</li> */}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside grid gap-2 text-sm">

          {sampleData.summary_info.medical_history && sampleData.summary_info.medical_history.length > 0 ? (
            sampleData.summary_info.medical_history.map((item, index) => (
              <li key={index}>{item}</li> // Adding a key for each list item
            ))
          ) : (
            <li>I.E: Asthma</li> // Providing more meaningful content when the list is empty
          )
        }

          
{/*             
            <li>Asthma</li>
            <li>High Cholesterol</li> */}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Vaccinations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm">
          {sampleData.summary_info.vaccinations && sampleData.summary_info.vaccinations.length > 0 ? (
            sampleData.summary_info.vaccinations.map((item, index) => (
              <li>{item}</li>
            ))
          ) : (
            <li>I.E: Pending: COVID-19 Vaccine - 2 doses, Moderna</li>// Providing more meaningful content when the list is empty
          )
        }
            {/* {sampleData.summary_info.vaccinations.map(item => (
              <li>{item}</li>
            ))}
               */}
            {/* <li>Pending: COVID-19 Vaccine - 2 doses, Moderna</li> */}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm">

          {sampleData.summary_info.medications && sampleData.summary_info.medications.length > 0 ? (
            sampleData.summary_info.medications.map((item, index) => (
              <li>{item}</li>
            ))
            ) : (
              <li>I.E: Metformin - 500mg, 1 tablet, 2 times a day</li>// Providing more meaningful content when the list is empty
            )
          }
            {/* {sampleData.summary_info.medications.map(item => (
              <li>{item}</li>
            ))} */}
            
            {/* <li>Metformin - 500mg, 1 tablet, 2 times a day</li>
            <li>Albuterol - Inhaler, as needed for wheezing</li>
            <li>Atorvastatin - 20mg, 1 tablet, once daily</li> */}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Allergies</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm">
          {sampleData.summary_info.allergies && sampleData.summary_info.allergies.length > 0 ? (
            sampleData.summary_info.allergies.map((item, index) => (
              <li>{item}</li>
            ))
            ) : (
              <li>I.E: Peanuts</li>// Providing more meaningful content when the list is empty
            )
          }
            {/* {sampleData.summary_info.allergies.map(item => (
              <li>{item}</li>
            ))} */}
            {/* <li>Peanuts</li> */} 
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Medical Labs</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm">
          {sampleData.summary_info.labs && sampleData.summary_info.labs.length > 0 ? (
            sampleData.summary_info.labs.map((item, index) => (
              <li>{item}</li>
            ))
            ) : (
              <li>I.E: Blood Test - Results pending</li>// Providing more meaningful content when the list is empty
            )
          }
            {/* {sampleData.summary_info.labs.map(item => (
              <li>{item}</li>
            ))} */}
            {/* <li>Blood Test - Results pending</li> */}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Records and Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm">
          {sampleData.summary_info.recent_visits && sampleData.summary_info.recent_visits.length > 0 ? (
            sampleData.summary_info.recent_visits.map((item, index) => (
              <div className="font-semibold">{item}</div>
            ))
            ) : (
              <div className="font-semibold">I.E: Dr. Johnson, Dermatologist - Checkup </div>// Providing more meaningful content when the list is empty
            )
          }
            {/* {sampleData.summary_info.recent_visits.map(item => (
              <li>
              <div className="font-semibold">{item}</div>
            </li>
            ))} */}
            
            {/* <li>
              <div className="font-semibold">Dr. Johnson</div>
              <div>Dermatology Clinic</div>
              <div>February 5, 2023 - 11:00 AM</div>
              <div>Type: Checkup</div>
            </li> */}
            <li>
              <div className="grid gap-2">
                {/* <Button variant="outline">View Medical Records</Button> */}
                {
                  avatar_url ? (
                    <>
                      <Avatar
                        uid={user.id}
                        url={avatar_url}
                        size={150}
                        onUpload={(url) => {
                            setAvatarUrl(url);
                            updateProfile({ fullname, username, website, avatar_url: url });
                        }}
                      />
                      <div>File Format: PDF</div>
                      <div>Medical EHR Platform: Epic Systems</div>
                    </>
                  ) : (
                    <>
                      <Avatar
                        uid={user.id}
                        url={avatar_url}
                        size={150}
                        onUpload={(url) => {
                            setAvatarUrl(url);
                            updateProfile({ fullname, username, website, avatar_url: url });
                            setCounter(counter+1);
                        }}
                      />
                      {/* Display alternative content or leave empty if nothing should be shown */}
                    </>
                  )
                }
              </div>
            </li>
            <li>
              <div className="font-semibold">Uploaded Files</div>
              <ul className="grid gap-2 text-sm">
                {avatar_url ? <li>
                  File {counter}
                  <div className="text-xs text-gray-500 dark:text-gray-400">File Format: PDF</div>
                </li> :
                <li></li>
                }
                {/* // <li>
                //   File 2
                //   <div className="text-xs text-gray-500 dark:text-gray-400">File Format: PDF</div>
                // </li>
                // <li>
                //   File 3
                //   <div className="text-xs text-gray-500 dark:text-gray-400">File Format: PDF</div>
                // </li> */}
              </ul>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Report Playback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Button>Play Report</Button>
              <AudioPlayer src="./sungsummary.wav"/>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Transcript:</div>
              {/* <div className="text-sm text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </div> */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {/* {sampleData.summary_info.rap_lyrics} */}
                {sampleData.rap_lyrics.map(item => (
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item}</div>
                ))}
              </div>
            </div>
          </div>
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
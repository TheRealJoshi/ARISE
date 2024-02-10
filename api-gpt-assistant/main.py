from typing import Union

from fastapi import FastAPI

from openai import OpenAI


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

    
@app.get("/gptapi/")
def load_assistant():
    client = OpenAI()

    my_assistants = client.beta.assistants.list(
        order="desc",
        limit="20",
    )

    #return my_assistants.data

    swift_summary_ai = client.beta.assistants.retrieve(my_assistants.data[0].id)

    # A Thread represents a conversation. 
    thread = client.beta.threads.create()

    # Create the message
    message = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content="Here's my after visit summary. Please summarize the most important parts. AFTER VISIT SUMMARY Kevin Wang MRN: 805758 12/21/2023 10:20 AM Corewell Health Diabetes & Endocrinology - Royalton 269-408-1600 Instructions from Dr. A Morris 1. Decrease methimazole 5 mg to 1 tablet daily 2. Please have blood work in 2 weeks, 6 weeks and before next appointment 3. Stay on vitamin D supplement Your medications have changed today See your updated medication list for details. Pick up these medications at WALGREENS DRUG STORE #04536 - SAINT JOSEPH, MI - 1260 HILLTOP RD AT SWC OF NILES & HILLTOP • methIMAzole Your estimated payment per fill: $19 Address: 1260 HILLTOP RD, SAINT JOSEPH MI 49085-2839 Phone: 269-983-0315 Labs ordered today Free T4 Please complete by or around 12/30/2023 TSH Please complete by or around 12/30/2023 Free T4 Please complete by or around 2/1/2024 TSH Please complete by or around 2/1/2024 CBC with Differential Please complete by or around 6/21/2024 Comprehensive Metabolic Panel Please complete by or around 6/21/2024 Free T4 Please complete by or around 6/21/2024 TSH Please complete by or around 6/21/2024 Thyroid stimulating immunoglobulin Please complete by or around 6/21/2024 Thyrotropin Receptor Antibody Please complete by or around 6/21/2024 Today's Visit You saw Dr. A Morris on Thursday December 21, 2023. The following issues were addressed: Graves disease and Hyperthyroidism.  MyChart Blood Pressure 121/73 Weight 137 lb 1.9 oz Pulse 64 BMI 20.25 Height 5' 9 View your After Visit Summary and more online at https:// mychart.lakelandregional.org/ mychartprd/. If you have questions, please call 269-982-9300 to speak with our MyChart staff. Kevin Wang (MRN: 805758) • Printed at 12/21/2023 10:36 AM Page 1 of 3     Kevin Wang (MRN: 805758) • Printed at 12/21/2023 10:36 AM Page 2 of 3 Instructions (continued) from Dr. A Morris COHANNTIGNEUhEotwakyinoguthaekseethmeesdeicmaetidoincastions  Accurate as of December 21, 2023 10:36 AM. If you have any questions, ask your nurse or doctor. suggestion Return in 6 months (on 6/21/2024) for Hyperthyroidism. What's Next JUL Follow Up with Dr. A Morris 10 Wednesday July 10 1:40 PM (Arrive by 1:25 PM) 2024 NOV Physical Exam with E Preston 25 Monday November 25 1:00 PM Corewell Health Diabetes & Endocrinology - Royalton 3950 Hollywood Rd Suite 288 Saint Joseph MI 49085 269-408-1600 John M. Stafford MD and Associates, P.C. 3800 Hollywood Road Suite 101 Saint Joseph MI 49085 269-428-2552  2024 Health Maintenance HPV VACCINE (1 - Male 2-dose series) TD Vaccine Adult COVID-19 Vaccine (4 - 2023-24 season) Annual Wellness Visit ALL PHYSICAL EXAMS - Please bring insurance cards, medication lists, list of other doctors seen, and family medical history information. Please bring any balance due. Date Due Never done Never done 09/01/2023 11/23/2024 Completion Dates 12/15/2021, 4/27/2021, 3/30/2021 11/22/2023, 11/22/2023 Changes to Your Medication List CHANGE how you take these medications methIMAzole 5 mg tablet Commonly known as: Tapazole Changed by: Amanda Morris, DO CONTINUE taking these medications cholecalciferol 25 mcg (1,000 unit) tablet Commonly known as: Vitamin D3 Take 1 tablet by mouth daily. What changed: how much to take Kevin Wang (MRN: 805758) • Printed at 12/21/2023 10:36 AM Page 3 of 3 Changes to Your Medication List (continued) CONTINUE taking these medications (continued) EPINEPHrine 0.3 mg/0.3 mL Atin Commonly known as: EpiPen multivitamin with minerals tablet Commonly known as: One Daily Plus Minerals Today's Visit Location INJECT CONTENTS OF 1 PEN INTO THE MUSCLE AS DIRECTED AS NEEDED.. Phone Fax 269-408-1600 269-408-1602  Name Corewell Health Diabetes & Endocrinology - Royalton Address 3950 Hollywood Rd Suite 288 Saint Joseph MI 49085  Advance Care Planning Speak for Yourself, Plan Your Care Choosing someone to speak for you, if you are unable to speak for yourself, is the single biggest step you can take to help your family if something unexpected happens to you. Whether you are 18 or 80, give your family the gift of having an Advance Care Plan. If you do not yet have a plan in place, please call (269) 983-8166 to make an appointment with a trained Advance Care Planning Facilitator."
    )

    # Run the assistant
    run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=my_assistants.data[0].id
    )

    # Check the run status
    while (run.completed_at == None):
        run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
        )

    # Display the Assistant's Response
    messages = client.beta.threads.messages.list(
        thread_id=thread.id
    )

    return messages.data[0].content[0].text.value
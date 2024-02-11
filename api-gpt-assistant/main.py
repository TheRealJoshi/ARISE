from typing import Union

from fastapi import FastAPI, UploadFile, File

from fastapi.responses import JSONResponse

import openai

import fitz  # PyMuPDF

import aiofiles

import json

from fastapi.encoders import jsonable_encoder

import os
from pathlib import Path

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

# Upload PDF
@app.post("/file")
async def upload_file(file: UploadFile = File(...)):
    # Parse text from PDF
    # Open the PDF file

    upload_dir = "uploads"
    Path(upload_dir).mkdir(exist_ok=True)  # Ensure the directory exists

    try:
        # Construct a filepath to save the file
        filepath = os.path.join(upload_dir, file.filename)

        # Use 'async with' and 'aiofiles.open' for asynchronous file operations
        async with aiofiles.open(filepath, 'wb') as buffer:
            # Read the file in chunks and write to the disk asynchronously
            while data := await file.read(1024):  # Read chunks of 1024 bytes
                await buffer.write(data)
        
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Could not upload the file: {e}"})

    with fitz.open(filepath) as pdf_document:

        page_content = {}

        # Iterate through each page in the PDF
        for page_number in range(pdf_document.page_count):
            pdf_page = pdf_document.load_page(page_number)
            page_text = pdf_page.get_text()
            # Replace double quotes in the page text
            page_text_sanitized = page_text.replace('"', "")
            page_text_sanitized = page_text_sanitized.replace("\n", " ")
            page_content[page_number + 1] = page_text_sanitized


    result_text = ""

    # Print the sanitized page content
    for page_num, content in page_content.items():
        result_text += content

    print(result_text)

    # Get the summary
    rap_lyrics = await load_rap(result_text)

    # Get the JSON summary
    summary_info = await load_important(result_text)

    # convert summary into array of strings
    # important = important.split("\n")
    
    return {
        "summary_info": summary_info,
        "rap_lyrics": rap_lyrics
    }


# Summarize text into rap
@app.get("/loadrap/")
async def load_rap(summary_text: str):

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"Summarize the most important parts of the after-visit summary. Make it into a Drake rap. After-visit summary text: {summary_text}"
            }
        ]
    )

    # jsonify the response
    rap_content = response.choices[0].message.content

    # convert rap_content into array of strings
    rap_content = rap_content.split("\n")

    return rap_content

# get important parts of the after-visit summary
@app.get("/important/{summary_text}")
async def load_important(summary_text: str):

    functions = [
        {
            "name": "show_summary",
            "description": "Summarize the most important parts of the after-visit summary.",
            "parameters": {
                "type": "object",
                "properties": {
                    "patient_name": {
                        "type": "string",
                        "description": "The name of the patient."
                    },
                    "blood_pressure": {
                        "type": "string",
                        "description": "The blood pressure of the patient."
                    },
                    "height": {
                        "type": "string",
                        "description": "The height of the patient."
                    },
                    "weight": {
                        "type": "string",
                        "description": "The weight of the patient."
                    },
                    "vaccinations": {
                        "type": "array",
                        "description": "The vaccinations of the patient.",
                        "items": {
                            "type": "string"
                        }
                    },
                    "medications": {
                        "type": "array",
                        "description": "The medications of the patient.",
                        "items": {
                            "type": "string"
                        }
                    },
                    "labs": {
                        "type": "array",
                        "description": "The labs of the patient.",
                        "items": {
                            "type": "string"
                        }
                    },
                }
            }
        }
    ]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a doctor. You are summarizing the most important parts of the after-visit summary."
            },
            {
                "role": "user",
                "content": f"{summary_text}"
            }
        ],
        functions=functions
    )

    # jsonify the response
    json_obj = json.loads(response.choices[0].message.function_call.arguments)

    return json_obj

#-----------------NEW CODE WITH RAP API-----------------#

# Keys for Rap Generator API

# API Keys:
API_KEY = "pub_obmnecehbnmbtumhbh"
API_SECRET_KEY = "pk_79c417ea-a9af-4ca5-92f7-07690f38038d"
uberduck_auth = (API_KEY, API_SECRET_KEY)
kits_key = "PxUL4Xwm.oiXtmsOAMnWn3FVeP7fVHgP-"

# URLs:
kits_url = "https://arpeggi.io/api/kits/v1/voice-conversions"
uberduck_url = "https://api.uberduck.ai/tts/freestyle"

# IDs:
quackmaster_uuid = "1598e3a2-70af-4bb8-adce-de6cfb24064e"
drake_id = 52375

# Remove test_lyrics when necessary
test_lyrics = [
  [
    "Yo, rise up, I got the after-visit summary"
  ]
]

def generate_rap(
    lyrics = test_lyrics,
    voicemodel_uuid = quackmaster_uuid,
    bpm = 70
  ):

  output = requests.post(
      uberduck_url,
      json=dict(
          lyrics=lyrics,
          voicemodel_uuid=voicemodel_uuid,
          bpm=bpm
          ),
      auth=uberduck_auth,
  ).json()
  return output

def download_audio(api_path, file_name):
  if len(file_name) < 0:
    raise Exception("File name should not be empty")

  # Send a GET request to the API path
  response = requests.get(api_path)

  # Check if the request was successful
  if response.status_code == 200:
    # Save the response to a local file
    with open(file_name, "wb") as f:
      f.write(response.content)

    print(f"Audio file has been saved to the local directory as {file_name}.")
  else:
    print(f"Try again (Error code: {response.status_code})")

  # Read the file content
    with open(file_name, "rb") as file:
        file_content = file.read()

    return FileResponse(file_name)

def convert_voice(audio_path, voice_id=drake_id):
  headers = {
      "Authorization": f"Bearer {kits_key}"
  }
  files = {
      "soundFile": open(audio_path, "rb")
  }
  data = {
      "voiceModelId": voice_id
  }
  output = requests.post(kits_url, headers=headers, files=files, data=data).json()

  return output['id']

'''
Probably needs to wait a bit to process before going into this one
'''
def pull_rap(conversion_id):
  url = f"{kits_url}/{str(conversion_id)}"

  headers = {
      "Authorization": f"Bearer {kits_key}"
  }

  for t in range(100):
    sleep(1) # check status every second for 10 seconds.
    output = requests.get(
        url,
        headers=headers
        ).json()
    if output['outputFileUrl'] is not None:
      break

  if "outputFileUrl" not in output:
    raise Exception("Voice conversion could not be found")
  
  print("Made it here!")

  # Final audio is downloaded here!
  return download_audio(output['outputFileUrl'], "sung_summary.wav")

# API endpoint for generating rap audio
media_router = APIRouter()

@app.get(
        path="/api/media-file",
        response_class=FileResponse,
)
def create_rap():
    rap = generate_rap()
    download_audio(rap['vocals_url'], "raw_rap.wav")
    conversion_id = convert_voice(os.path.abspath("raw_rap.wav"))
    pull_rap(conversion_id)
    return FileResponse("sung_summary.wav")
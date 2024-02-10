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
    # summary = await load_rap(result_text)

    # Get the JSON summary
    important = await load_important(result_text)

    # convert summary into array of strings
    # important = important.split("\n")
    
    return important

    return {"filename": file.filename}

# Summarize text into rap
@app.get("/loadrap/{summary_text}")
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
    return response.choices[0].message.content[0].text.value

    

    print(f"Summarize the most important parts of the after-visit summary. After-visit summary text: {summary_text}")

    return messages.data[0].content[0].text.value

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
                        "type": "string",
                        "description": "The vaccinations of the patient."
                    },
                    "medications": {
                        "type": "array",
                        "description": "The medications of the patient.",
                        "items": {
                            "type": "string"
                        }
                    },
                    "allergies": {
                        "type": "array",
                        "description": "The allergies of the patient.",
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
from typing import Union

from fastapi import FastAPI, UploadFile, File

from fastapi.responses import JSONResponse

from openai import OpenAI

import fitz  # PyMuPDF

import aiofiles

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
    summary = await load_rap(result_text)

    # Get the JSON summary
    important = await load_important(result_text)

    # convert summary into array of strings
    summary = summary.split("\n")
    
    return summary

    return {"filename": file.filename}

# Summarize text into rap
@app.get("/loadrap/{summary_text}")
async def load_rap(summary_text: str):
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
        content=f"Summarize the most important parts of the after-visit summary. Make it into a Drake rap. After-visit summary text: {summary_text}"
    )

    print(f"Summarize the most important parts of the after-visit summary. After-visit summary text: {summary_text}")

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

        #print(run)

    # Display the Assistant's Response
    messages = client.beta.threads.messages.list(
        thread_id=thread.id
    )

    return messages.data[0].content[0].text.value

# get important parts of the after-visit summary
@app.get("/important/{summary_text}")
async def load_important(summary_text: str):
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
        content=f"Get the name of the patient, list of medications, list of medical labs, blood pressure, pulse, and weight. List keys as patient, medications, labs, blood, pulse, and weight. Return as JSON format. After-visit summary text: {summary_text}"
    )

    print(f"Summarize the most important parts of the after-visit summary. After-visit summary text: {summary_text}")

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

        #print(run)

    # Display the Assistant's Response
    messages = client.beta.threads.messages.list(
        thread_id=thread.id
    )

    # jsonify the response
    return jsonable_encoder(messages.data[0].content[0].text.value)
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
        content="Here's my after visit summary. Please"
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
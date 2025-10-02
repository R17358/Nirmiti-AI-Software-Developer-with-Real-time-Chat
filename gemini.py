
# To  check

import google.generativeai as genai
from dotenv import load_dotenv
import os


load_dotenv()


API = os.getenv("API")

genai.configure(api_key=API)

# Choose a model
model = genai.GenerativeModel("gemini-2.0-flash")

# Generate content
response = model.generate_content("Explain how AI works in a few words")

print(response)



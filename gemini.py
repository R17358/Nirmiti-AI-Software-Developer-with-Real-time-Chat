


import google.generativeai as genai

# Configure API key
genai.configure(api_key="AIzaSyCk_sBVFOTdlrSlsRGHWcK8OSj_eGUIXVk")

# Choose a model
model = genai.GenerativeModel("gemini-2.0-flash")

# Generate content
response = model.generate_content("Explain how AI works in a few words")

print(response.text)

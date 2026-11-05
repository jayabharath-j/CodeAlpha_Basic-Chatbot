
from chatbot import get_response

while True:

    user_input = input("You: ")

    response = get_response(user_input)

    print("Bot:", response)

    if user_input.lower().strip() in ["bye", "goodbye", "exit"]:
        break

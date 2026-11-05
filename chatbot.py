
from datetime import datetime


def get_response(user_message):

    message = user_message.lower().strip()

    # Greeting
    if message in ["hi", "hello", "hey"]:
        return "Hello! 👋 How can I help you today?"

    # Bot introduction
    elif "your name" in message:
        return "I'm ChatBot, your friendly virtual assistant!"

    # Asking how the bot is doing
    elif "how are you" in message:
        return "I'm doing great! Thanks for asking. 😊"

    # Current date
    elif "date" in message:
        today = datetime.now().strftime("%d-%m-%Y")
        return f"Today's date is {today}."

    # Current time
    elif "time" in message:
        current_time = datetime.now().strftime("%I:%M %p")
        return f"The current time is {current_time}."

    # Help
    elif "help" in message:
        return "I can greet you, introduce myself, and tell you the current date and time."

    # Goodbye
    elif message in ["bye", "goodbye", "exit"]:
        return "Goodbye! Have a wonderful day! 👋"

    # Unknown message
    else:
        return "Sorry, I don't understand that yet. Can you ask something else?"

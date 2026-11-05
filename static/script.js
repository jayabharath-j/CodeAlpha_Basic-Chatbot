// Get HTML elements
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatMessages = document.getElementById("chat-messages");

// Display messages in chat window

function displayMessage(message, className) {
  const messageElement = document.createElement("div");

  messageElement.classList.add("message", className);

  // Create message text
  const messageText = document.createElement("span");

  messageText.textContent = message;

  // Create timestamp
  const timestamp = document.createElement("span");

  timestamp.classList.add("message-time");

  timestamp.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Add text and timestamp to message
  messageElement.appendChild(messageText);
  messageElement.appendChild(timestamp);

  chatMessages.appendChild(messageElement);

  // Automatically scroll to latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
}


// Show typing indicator
function showTypingIndicator() {
  const typingElement = document.createElement("div");

  typingElement.classList.add("message", "bot-message", "typing-indicator");

  typingElement.id = "typing-indicator";

  typingElement.textContent = "ChatBot is typing...";

  chatMessages.appendChild(typingElement);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
  const typingElement = document.getElementById("typing-indicator");

  if (typingElement) {
    typingElement.remove();
  }
}

// Send message to Flask backend
async function sendMessage() {
  const message = userInput.value.trim();

  // Prevent empty messages
  if (message === "") {
    return;
  }

  // Display user message
  displayMessage(message, "user-message");

  // Clear input field
  userInput.value = "";

  // Show typing indicator
  showTypingIndicator();

  try {
    // Send message to Flask
    const response = await fetch("/chat", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message: message,
      }),
    });

    // Convert response into JSON
    const data = await response.json();

    // Simulate chatbot thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Display chatbot response
    displayMessage(data.response, "bot-message");
  } catch (error) {
    console.error("Error:", error);

    displayMessage("Something went wrong. Please try again.", "bot-message");
  } finally {
    // Remove typing indicator
    removeTypingIndicator();
  }
}

// Send message when button is clicked
sendBtn.addEventListener("click", sendMessage);

// Send message when Enter key is pressed
userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});




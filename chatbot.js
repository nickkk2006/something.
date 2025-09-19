console.log("Chatbot script loaded");

// Inject widget into DOM
const chatWidgetHTML = `
<div id="chat-widget">
  <div id="chat-header">Chat with Gemini</div>
  <div id="chat-box"></div>
  <div id="chat-input">
      <input type="text" id="user-input" placeholder="Type a message..." />
      <button id="send-btn">Send</button>
  </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);

// Grab elements
const inputEl = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatBox = document.getElementById('chat-box');

// Debug logs
console.log("Input element:", inputEl);
console.log("Send button:", sendBtn);
console.log("Chat box:", chatBox);

// Add event listeners safely
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        console.log("Send button clicked");
        sendMessage();
    });
} else {
    console.error("Send button not found in DOM");
}

if (inputEl) {
    inputEl.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            console.log("Enter pressed");
            sendMessage();
        }
    });
} else {
    console.error("Input element not found in DOM");
}

// Main sendMessage function
async function sendMessage() {
    if (!inputEl || !chatBox) {
        console.error("Input or chatBox missing");
        return;
    }

    const msg = inputEl.value.trim();
    if (!msg) {
        console.warn("Empty message, ignoring");
        return;
    }

    chatBox.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
    inputEl.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const res = await fetch("/.netlify/functions/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });

        if (!res.ok) throw new Error("HTTP error " + res.status);

        const data = await res.json();
        console.log("Gemini response:", data);

        chatBox.innerHTML += `<p><strong>Gemini:</strong> ${data.reply || "Error"}</p>`;
    } catch (err) {
        console.error("Fetch failed:", err);
        chatBox.innerHTML += `<p><strong>Error:</strong> Unable to reach server.</p>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

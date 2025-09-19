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

const inputEl = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);
inputEl.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const msg = inputEl.value.trim();
    if (!msg) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
    inputEl.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const res = await fetch("/.netlify/functions/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });

        const data = await res.json();
        chatBox.innerHTML += `<p><strong>Gemini:</strong> ${data.reply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (err) {
        chatBox.innerHTML += `<p><strong>Error:</strong> Unable to reach server.</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

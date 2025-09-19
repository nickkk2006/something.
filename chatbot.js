async function sendMessage() {
    const input = document.getElementById("user-input");
    const msg = input.value.trim();
    if (!msg) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
    input.value = "";

    try {
        const res = await fetch("/.netlify/functions/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });

        const data = await res.json();
        chatBox.innerHTML += `<p><strong>Gemini:</strong> ${data.reply}</p>`;
    } catch (err) {
        chatBox.innerHTML += `<p><strong>Error:</strong> Unable to reach server.</p>`;
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}

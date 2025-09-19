const GEMINI_API_KEY = "AIzaSyAfFf_ORisO-DDIBZewNOPitNbQy6VXrPc";

async function sendMessage() {
  const input = document.getElementById("user-input");
  const msg = input.value.trim();
  if (!msg) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: msg }] }]
      })
    });

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";
    chatBox.innerHTML += `<p><strong>Gemini:</strong> ${reply}</p>`;
  } catch (err) {
    chatBox.innerHTML += `<p><strong>Error:</strong> Unable to reach server.</p>`;
  }
  chatBox.scrollTop = chatBox.scrollHeight;
}


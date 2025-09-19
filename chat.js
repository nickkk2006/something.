// functions/chat.js
const GEMINI_API_KEY = "AIzaSyAfFf_ORisO-DDIBZewNOPitNbQy6VXrPc"; // Keep this secret!

export async function handler(event, context) {
    try {
        const { message } = JSON.parse(event.body);

        // Call Gemini API
        const response = await fetch(
            "https://api.generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-pro:generateText",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GEMINI_API_KEY}`
                },
                body: JSON.stringify({
                    prompt: message,
                    temperature: 0.7
                })
            }
        );

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                reply: data.output_text || "Sorry, I couldn't generate a reply."
            })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ reply: "Server error: Unable to process your message." })
        };
    }
}



export async function POST(request: Request): Promise<Response> {
    const requestBody = await request.json();
  
    if (!requestBody.text) {
      return new Response("Please enter some text", { status: 400 })
    }
  
    if (!process.env.HUGGING_FACE_TOKEN) {
      return new Response("Error", { status: 500 })
    }
    const text = requestBody.text;
    const response = await fetch(
      `${process.env.TTS_MODEL_URL}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`, // Use the correct token
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      }
    );
    const audio = await response.arrayBuffer();
  
    if (!response.ok) {
      return new Response("Error", { status: 500 })
    }
  
    return new Response(audio, {
      headers: {
        "Content-Type": "audio/mpeg", 
      },
    });
  }
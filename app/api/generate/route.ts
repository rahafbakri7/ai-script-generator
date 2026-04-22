import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, tone, length } = await req.json();

    const lengthGuide: any = {
      "1 min": "0:00–1:00 (fast pacing, short sections)",
      "3 min": "0:00–3:00 (moderate pacing)",
      "5 min": "0:00–5:00 (detailed storytelling)",
      "10 min": "0:00–10:00 (deep storytelling, multiple sections)",
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku",
        messages: [
          {
            role: "user",
            content: `
You are a professional YouTube script writer.

Create a cinematic video script.

Topic: ${prompt}
Tone: ${tone}
Target Duration: ${length}

STRICT RULES (VERY IMPORTANT):

1. The script MUST fully span the selected duration.
    dont't make a mistake in time
   - 1 min → ends at 1:00 
   - 3 min → ends at 3:00
   - 5 min → ends at 5:00
   - 10 min → ends at 10:00

2. DO NOT stop early. The final timestamp MUST reach the full duration.

3. Divide the script into MULTIPLE timestamped sections.

4. Use this storytelling structure:
   - Hook
   - Introduction
   - Rising Action
   - Development
   - Climax
   - Resolution / Ending

5. Number of sections MUST match length:
   - 1 min → 4–5 sections
   - 3 min → 6–8 sections
   - 5 min → 8–10 sections
   - 10 min → 10+ sections

6. Example for 3 min:

[0:00 - 0:15] Hook  
[0:15 - 0:40] Introduction  
[0:40 - 1:20] Rising Action  
[1:20 - 2:00] Development  
[2:00 - 2:40] Climax  
[2:40 - 3:00] Ending  

7. Each section must include:
- Narration
- Don't forget the scene directions in brackets its important

8. Adjust writing style based on tone:

- If tone is "Dramatic":
  Use emotional, intense, cinematic storytelling. High tension and strong language.

- If tone is "Neutral":
  Use clear, simple, straightforward narration with minimal emotional exaggeration.

- If tone is "Uplifting":
  Use positive, inspiring, motivational storytelling.
  Focus on hope, progress, success, and encouragement.
  Language should feel energetic, optimistic, and inspiring.


Return ONLY the script.
`

,
          },
        ],
        temperature: 0.8,
      }),
    });

    const data = await response.json();

    console.log("OPENROUTER RESPONSE:", data);

    return NextResponse.json({
      result:
        data?.choices?.[0]?.message?.content ||
        "⚠️ No response from AI",
    });

  } catch (error: any) {
    console.error("ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

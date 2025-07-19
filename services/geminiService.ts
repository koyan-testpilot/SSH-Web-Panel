import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateSecurePassword(): Promise<string> {
    const prompt = `
Generate a highly secure, 16-character password.
It MUST meet the following criteria:
- At least one uppercase letter (A-Z).
- At least one lowercase letter (a-z).
- At least one number (0-9).
- At least one special character from the set: !@#$%^&*()_+-=[]{}|;:,.<>?
- Must be exactly 16 characters long.
- Do not include any other text, explanation, or quotation marks. Only return the password string.
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 1.0, // Higher temperature for more randomness
                topK: 0,
                topP: 1.0,
                maxOutputTokens: 50, // More than enough for a 16-char password
            },
        });
        
        // Safely access the text property. It might be undefined if the model's response is blocked.
        const password = response.text?.trim();

        // Check if the password is valid and meets complexity requirements.
        if (!password || password.length !== 16 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]).{16,}$/.test(password)) {
           console.warn("Gemini returned a non-compliant or empty password, falling back to a simpler one.");
           return generateFallbackPassword();
        }

        return password;
    } catch (error) {
        console.error("Error generating password with Gemini:", error);
        // Fallback to a simpler, locally generated password if API fails
        return generateFallbackPassword();
    }
}

function generateFallbackPassword(): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 16; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}
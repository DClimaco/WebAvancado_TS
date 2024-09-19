import Groq from "groq-sdk"

const groq = new Groq({ apiKey: "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" });

export default async function VerifyComment(comment: string){
    const response = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Você é uma IA para avaliar se um comentário é ofensivo, com palavrão ou não. Dado o comentário você deve retornar somente 'true' se for ofensivo e 'false' se não for.",
          },
          {
            role: "user",
            content: comment,
          },
        ],
        model: "llama3-8b-8192",
    });
    return response.choices[0]?.message?.content
}
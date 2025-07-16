import axios from 'axios';


const API_KEY = ""; //enter your api key

export const getSummary = async (text) => {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model:'gpt-3.5-turbo',
            message: [{
                role: "user",
                content: `Summarize this document:\n` + text
            }],
            temperature: 0.5
        },
        {
            headers:{
                Authorization: "Bearer " + API_KEY,
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data.choices[0].message.content;
}
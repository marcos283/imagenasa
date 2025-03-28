const axios = require('axios');
require('dotenv').config();

exports.handler = async function(event, context) {
    try {
        const { text } = JSON.parse(event.body);
        const response = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
            params: {
                q: text,
                target: 'es', // Cambia el idioma de destino según sea necesario
                key: process.env.GOOGLE_TRANSLATE_API_KEY
            }
        });
        return {
            statusCode: 200,
            body: JSON.stringify({
                translatedText: response.data.data.translations[0].translatedText
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error translating text' })
        };
    }
};

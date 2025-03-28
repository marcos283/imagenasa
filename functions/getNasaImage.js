const axios = require('axios');
require('dotenv').config();

exports.handler = async function(event, context) {
    try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
            params: {
                api_key: process.env.NASA_API_KEY
            }
        });
        return {
            statusCode: 200,
            body: JSON.stringify({
                url: response.data.url,
                explanation: response.data.explanation
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching NASA image' })
        };
    }
};

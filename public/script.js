document.addEventListener('DOMContentLoaded', () => {
    const nasaImage = document.getElementById('nasa-image');
    const nasaText = document.getElementById('nasa-text');
    const translateButton = document.getElementById('translate-button');
    const randomImageButton = document.getElementById('random-image-button');

    async function fetchNasaImage() {
        try {
            const response = await fetch('/.netlify/functions/getNasaImage');
            const data = await response.json();
            nasaImage.src = data.url;
            nasaText.textContent = data.explanation;
        } catch (error) {
            console.error('Error fetching NASA image:', error);
        }
    }

    async function translateText() {
        try {
            const response = await fetch('/.netlify/functions/translateText', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: nasaText.textContent }),
            });
            const data = await response.json();
            nasaText.textContent = data.translatedText;
        } catch (error) {
            console.error('Error translating text:', error);
        }
    }

    fetchNasaImage();

    translateButton.addEventListener('click', translateText);
    randomImageButton.addEventListener('click', fetchNasaImage);
});

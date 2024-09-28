document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dimensionsForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const baseUrl = "https://snijlijst.onrender.com"; // https://snijlijst-api.netlify.app/.netlify/functions
        const formData = new FormData(form);
        const pageHeight = formData.get('pageHeight');
        const pageWidth = formData.get('pageWidth');

        fetch(`${baseUrl}/dimensions`, { // Correct endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pageHeight, pageWidth })
        })
        .then(response => response.json())
        .then(data => {
            const aspectRatio = data.aspectRatio;
            const maxWidth = 400;
            const maxHeight = 400;

            let displayWidth, displayHeight;

            if (aspectRatio > 1) {
                displayWidth = maxWidth;
                displayHeight = maxWidth / aspectRatio;
            } else {
                displayHeight = maxHeight;
                displayWidth = maxHeight * aspectRatio;
            }

            const hFactor = displayHeight / pageHeight;
            const wFactor = displayWidth / pageWidth;

            createRectangle();
            createLineForms(hFactor, wFactor);

            document.getElementById('heightIndicator').innerHTML = `${pageHeight}mm`;
            document.getElementById('widthIndicator').innerHTML = `${pageWidth}mm`;

            const rectangle = document.getElementById('rectangle');
            rectangle.style.width = `${displayWidth}px`;
            rectangle.style.height = `${displayHeight}px`;
        })
        .catch(error => console.error('Error:', error));
    });
});

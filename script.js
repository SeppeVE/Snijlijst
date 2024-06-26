document.addEventListener('DOMContentLoaded', function() {
    fetch('https://snijlijst-api.netlify.app/.netlify/functions/api')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const h1 = document.createElement('h1');
            h1.textContent = data.message;
            document.body.appendChild(h1);
        })
        .catch(error => console.error('Error:', error));
});

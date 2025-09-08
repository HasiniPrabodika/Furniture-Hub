const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    }).then(res => res.json());

    if (res.success) {
        alert('Your message has been sent successfully!');
        form.reset();
    } else {
        alert('An error occurred. Please try again later.');
    }
});
src = "https://cdnjs.cloudflare.com/ajax/libs/libphonenumber-js/1.9.27/libphonenumber-js.min.js"
integrity = "sha512-vtUwo6oyxRLTy6V1nNKoOHdFY9LX6AnrGbG0KfiGZ8WTZC0eT2v8fJKjBGGxYySBZc4DLb84u7Euq6uqCnacLg=="
crossorigin = "anonymous"

document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById('telefone');

    phoneInput.addEventListener('input', function () {
        const value = phoneInput.value.replace(/\D/g, '');
        if (value.length <= 10) {
            phoneInput.value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else if (value.length <= 11) {
            phoneInput.value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('navbar-toggle');
    const menu = document.getElementById('navbar-sticky');

    toggleButton.addEventListener('click', function () {
        // Alterna a visibilidade do menu
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('block');
            toggleButton.setAttribute('aria-expanded', 'true');
        } else {
            menu.classList.remove('block');
            menu.classList.add('hidden');
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    });
});

document.getElementById('agendamentoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const descricao = document.getElementById('service').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('message').value;

    console.log({ nome, email, descricao, telefone }); // Verifique se todos os valores estão corretos

    const data = { nome, descricao, telefone, email, mensagem };

    fetch('https://ect-contabilidae-email.onrender.com/agendamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert('Agendamento realizado com sucesso!');
            console.log('Success:', data);
        })
        .catch(error => {
            alert('Erro ao realizar o agendamento');
            console.error('Error:', error);
        });
});

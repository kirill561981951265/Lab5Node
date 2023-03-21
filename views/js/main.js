function lockRemoveButton()
{
    const removeButton = document.getElementById('remove-button');
    if (!removeButton) return;
    removeButton.setAttribute('disabled', 'true');
}

function create()
{
    const fio = document.getElementsByName('fio')[0].value;
    const number = document.getElementsByName('number')[0].value;
    if (!/\+375\(\d{2}\)\d{3}\-\d{2}\-\d{2}$/.test(number)) return;

    fetch('/add',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({fio, number})
        }).then(response => response.json())
        .then(() => window.location.href = '/');
}

function update()
{
    const id = document.getElementsByClassName('form-part edit')[0].getAttribute('data-key');
    const fio = document.getElementsByName('fio')[0].value;
    const number = document.getElementsByName('number')[0].value;

    if (!/\+375\(\d{2}\)\d{3}\-\d{2}\-\d{2}$/.test(number)) return;

    fetch('/update',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, fio, number})
        }).then(response => response.json())
        .then(() => window.location.href = '/');
}

function remove()
{
    const fio = document.getElementsByName('fio')[0].value;
    const number = document.getElementsByName('number')[0].value;
    const id = document.getElementsByClassName('form-part edit')[0].getAttribute('data-key');
    if (!id) return;

    fetch('/delete',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, fio, number})
        }).then(response => response.json())
        .then(() => window.location.href = '/');
}
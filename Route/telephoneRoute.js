const express = require('express');
const db = require('../DB/DB');

let router = express.Router();

router.get('/', (request, response) =>
{
    response.render('index',
        {
            unlockOthers: true,
            phones: db.getPhones()
        });
        
});

router.get('/add', (request, response) =>
{
    response.render('add',
        {
            unlockOthers: false,
            phones: db.getPhones(),
            helpers: {goBack: () => 'window.location.href = \'/\''}
        });
});

router.get('/update', (request, response) =>
{
    response.render('update',
        {
            unlockOthers: false,
            phones: db.getPhones(),
            targetPhone: db.getPhoneById(request.query.id),
            helpers: {goBack: () => 'window.location.href = \'/\''}
        });
});

router.post('/add', (request, response) =>
{
    response.json(db.addPhone(request.body));
});

router.post('/update', (request, response) =>
{
    response.json(db.updatePhone(request.body));
});

router.post('/delete', (request, response) =>
{
    response.json(db.deletePhone(request.body));
});

module.exports = router;

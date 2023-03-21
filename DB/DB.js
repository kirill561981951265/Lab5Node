const fs = require('fs');
let base = require('./base') || [];
let upd = false;

module.exports =
{

    getPhones: () => base,

    getPhoneById: id => base.find(phone => phone.id === Number(id)),

    addPhone(fields)
    {
        const {fio, number} = fields;
        if (!fio || !number)
        {
            throw new Error('Empty fio or number fields');
        }
        const newPhone =
            {
                id: nextId(),
                //id: base.length,
                fio,
                number
            };
        base.push(newPhone);
        console.log('save');
        save();
        return newPhone;
    },

    updatePhone(fields)
    {
        const {id, fio, number} = fields;
        if (!id || !fio || !number)
        {
            throw new Error('Empty id, fullName or phone fields');
        }
        let targetPhone = base.find(phone => phone.id === Number(id));
        if (!targetPhone)
        {
            throw new Error('Invalid record id');
        }
        targetPhone.fio = fio;
        targetPhone.number = number;
        save();
        return targetPhone;
    },

    deletePhone(fields)
    {
        const {id, fio, number} = fields;
        let targetPhone = base.find(phone => phone.id == Number(id));
        if (!targetPhone)
        {
            throw new Error('Invalid record id');
        }
        if(targetPhone.fio != fio || targetPhone.number != number){
            console.log('You make update');
            return;
        }
        base = base.filter(phone => phone.id !== Number(id));
        save();
        return targetPhone;
    }
};

function save()
{
    fs.writeFile(__dirname + '/base.json', JSON.stringify(base, null, '  '), err =>
    {
        if (err)
        {
            throw err;
        }
    });
}

function nextId(){
    return base[base.length-1].id+1
}
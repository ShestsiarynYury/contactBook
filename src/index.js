import Contact from './contact.js';
import ContactDAO from './contact_dao.js';
import readlineSync from 'readline-sync';

(function main() {
    console.log("ContactBook CLI v1.0.0");
    console.log("  add - Add contact");
    console.log("  delete - Delete contact");
    console.log("  update - Update contact");
    console.log("  searchBy[Id, Phone, LastName, FirstName] - Search by [id, phone, lastName, firstName]");
    console.log("  list - Get list of contacts");
    console.log("  birthDay - Get list of contacts you have birthday now");
    console.log("  exit - EXIT");

    let exitFlag = false;
    while(!exitFlag) {
        let text = readlineSync.question('');
        if (text === "exit" || text === "exit\r\n") {
            exitFlag = true;
            continue;
        }

        if (text === "add" || text === "add\r\n") {
            let lastName = readlineSync.question('Insert lastname: ');

            let firstName = readlineSync.question('Insert firstname: ');

            console.log('Insert birthday: \n');
            console.log('[Z] <- -> [X]  EXIT: [q]\n');
            let maxDay = 31, minDay = 1, day = 15, keyDay;
            let maxMounth = 12, minMounth = 1, mounth = 7, keyMounth;
            while (true) {
                console.log('\x1B[1A\x1B[K|' +
                    (new Array(day)).join('-') + 'O' +
                    (new Array(maxDay - day + 1)).join('-') + '| ' + day );
                keyDay = readlineSync.keyIn('', {hideEchoBack: true, mask: '', limit: 'zxq'});
                if (keyDay === 'z') { if (day > minDay) { day--; } }
                else if (keyDay === 'x') { if (day < maxDay) { day++; } }
                else if (keyDay === 'q') { break; }
                else { break; }
            }
            while (true) {
                console.log('\x1B[1A\x1B[K|' +
                    (new Array(mounth)).join('-') + 'O' +
                    (new Array(maxMounth - mounth + 1)).join('-') + '| ' + mounth);
                keyMounth = readlineSync.keyIn('', {hideEchoBack: true, mask: '', limit: 'zxq'});
                if (keyMounth === 'z') { if (mounth > minMounth ) { mounth--; } }
                else if (keyMounth === 'x') { if (mounth < maxMounth) { mounth++; } }
                else if (keyDay === 'q') { break; }
                else { break; }
            }
            let year = readlineSync.question('Insert year: ');
            let birthday = new Date(Number(year), Number(mounth) - 1, Number(day) + 1);
            console.log(`birthday: ${JSON.stringify(birthday)}`);

            console.log("Type 'q' to finish the enter of phones");
            let endPhonesFlag = false;
            let phones = [];
            while(!endPhonesFlag) {
                let phone = readlineSync.question('Insert phone: ');
                if (phone === "q" || phone === "q\r\n") break;
                if (Contact.validatePhone(phone)) {
                    phones.push(phone);
                } else {
                    console.log("phone is not validate");
                }
            }
            console.log(`phones: ${JSON.stringify(phones)}`);

            let comment = readlineSync.question('Insert comment: ');

            ContactDAO.add(new Contact(lastName, firstName, birthday, phones, comment));
            continue;
        }

        if (text === "delete" || text === "delete\r\n") {
            let id = readlineSync.question('Insert id: ');

            let index = ContactDAO.delete(id);
            if (index) {
                console.log(`You delete contact with ${index} index`);
            } else {
                console.log(`Not exist contact with ${index} index`);
            }
            continue;
        }

        if (text === "update" || text === "update\r\n") {
            let id = readlineSync.question('Insert id: ');

            let lastName = readlineSync.question('Insert lastname: ');

            let firstName = readlineSync.question('Insert firstname: ');

            console.log('Insert birthday: \n');
            console.log('[Z] <- -> [X]  EXIT: [q]\n');
            let maxDay = 31, minDay = 1, day = 15, keyDay;
            let maxMounth = 12, minMounth = 1, mounth = 7, keyMounth;
            while (true) {
                console.log('\x1B[1A\x1B[K|' +
                    (new Array(day)).join('-') + 'O' +
                    (new Array(maxDay - day + 1)).join('-') + '| ' + day );
                keyDay = readlineSync.keyIn('', {hideEchoBack: true, mask: '', limit: 'zxq'});
                if (keyDay === 'z') { if (day > minDay) { day--; } }
                else if (keyDay === 'x') { if (day < maxDay) { day++; } }
                else if (keyDay === 'q') { break; }
                else { break; }
            }
            while (true) {
                console.log('\x1B[1A\x1B[K|' +
                    (new Array(mounth)).join('-') + 'O' +
                    (new Array(maxMounth - mounth + 1)).join('-') + '| ' + mounth);
                keyMounth = readlineSync.keyIn('', {hideEchoBack: true, mask: '', limit: 'zxq'});
                if (keyMounth === 'z') { if (mounth > minMounth ) { mounth--; } }
                else if (keyMounth === 'x') { if (mounth < maxMounth) { mounth++; } }
                else if (keyDay === 'q') { break; }
                else { break; }
            }
            let year = readlineSync.question('Insert year: ');
            let birthday = new Date(Number(year), Number(mounth) - 1, Number(day) + 1);
            console.log(`birthday: ${JSON.stringify(birthday)}`);

            console.log("Type 'q' to finish the enter of phones");
            let endPhonesFlag = false;
            let phones = [];
            while(!endPhonesFlag) {
                let phone = readlineSync.question('Insert phone: ');
                if (phone === "q" || phone === "q\r\n") break;
                if (Contact.validatePhone(phone)) {
                    phones.push(phone);
                } else {
                    console.log("phone is not validate");
                }
            }
            console.log(`phones: ${JSON.stringify(phones)}`);

            let comment = readlineSync.question('Insert comment: ');

            ContactDAO.update(id, lastName, firstName, birthday, phones, comment);
            continue;
        }

        if (text === "searchById" || text === "searchById\r\n") {
            let id = readlineSync.question('Insert id: ');
            let contact = ContactDAO.getContactById(id)
            console.log(JSON.stringify(contact, null, 5));
            continue;
        }

        if (text === "searchByPhone" || text === "searchByPhone\r\n") {
            let phone = readlineSync.question('Insert phone: ');
            console.log(JSON.stringify(ContactDAO.getContactsByPhone(phone), null, 5));
            continue;
        }

        if (text === "searchByLastName" || text === "searchByLastName\r\n") {
            let lastName = readlineSync.question('Insert lastname: ');
            console.log(JSON.stringify(ContactDAO.getContactsByLastName(lastName), null, 5));
            continue;
        }

        if (text === "searchByFirstName" || text === "searchByFirstName\r\n") {
            let firstName = readlineSync.question('Insert lastname: ');
            console.log(JSON.stringify(ContactDAO.getContactsByFirstName(firstName), null, 5));
            continue;
        }

        if (text === "list" || text === "list\r\n") {
            console.log(JSON.stringify(ContactDAO.contacts, null, 5));
            continue;
        }

        if (text === "birthDay" || text === "birthDay\r\n") {
            continue;
        }

        console.log("Wrong answer. You should wtite the rigth statements ;)"); 
    }
}());

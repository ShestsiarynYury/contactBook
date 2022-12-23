import Contact from './contact.js';
import ContactDAO from './contact_dao.js';
import readlineSync from 'readline-sync';
import util from 'util';

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
            console.log("Type 'end' to finish the enter of phones");
            let endPhonesFlag = false;
            let phones = [];
            while(!endPhonesFlag) {
                let phone = readlineSync.question('Insert phone: ');
                if (phone === "end" || phone === "end\r\n") break;
                if (Contact.validatePhone(phone)) {
                    phones.push(phone);
                } else {
                    console.log("phone is not validate");
                }
            }
            console.log(`phones: ${JSON.stringify(phones)}`);
            let comment = readlineSync.question('Insert comment: ');
            ContactDAO.add(new Contact(phones, lastName, firstName, comment));
            ContactDAO.save();
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
            ContactDAO.save();
            continue;
        }

        if (text === "update" || text === "update\r\n") {
            let id = readlineSync.question('Insert id: ');
            let contact = ContactDAO.getContactById(id)
            console.log(contact);
            let lastName = readlineSync.question('Insert lastname: ');
            let firstName = readlineSync.question('Insert firstname: ');
            console.log("Type 'end' to finish the enter of phones");
            let endPhonesFlag = false;
            let phones = [];
            while(!endPhonesFlag) {
                let phone = readlineSync.question('Insert phone: ');
                if (phone === "end" || phone === "end\r\n") break;
                if (Contact.validatePhone(phone)) {
                    phones.push(phone);
                } else {
                    console.log("phone is not validate");
                }
            }
            console.log(`phones: ${JSON.stringify(phones)}`);
            let comment = readlineSync.question('Insert comment: ');
            contact.phones = phones;
            contact.lastName = lastName;
            contact.firstName = firstName;
            contact.comment = comment;
            ContactDAO.save();
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

        console.log("Wrong answer. You should wtite the rigth statements ;)"); 
    }
}());


// ContactDAO.add(new Contact(["+375-(29)-765-70-63", "+375-(33)-765-70-00"], "d", "d", "d"));
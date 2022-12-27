import Contact from './contact.js';
import fs from 'fs';

export default class ContactDAO {
    static #contacts;

    // static initialization block
    static {
        ContactDAO.#contacts = (JSON.parse(fs.readFileSync("contacts.json", "utf-8"))).map((contact) => {contact.birthDate = new Date(contact.birthDate); return contact;});
    }

    static get contacts() {
        return ContactDAO.#contacts;
    }

    static save() {
        fs.writeFileSync("contacts.json", JSON.stringify(ContactDAO.#contacts), "utf-8");
    }

    static add(contact) {
        if (!(contact instanceof Contact)) throw new TypeError("value is not 'Contact' type");
        ContactDAO.#contacts.push(contact);
        ContactDAO.save();
    }

    static delete(id) {
        let index = ContactDAO.#contacts.findIndex((contact) => contact.id === Number(id));
        if (index) {
            delete ContactDAO.#contacts[index];
            ContactDAO.#contacts = ContactDAO.#contacts.filter((contact) => contact);
            ContactDAO.save();
            return index;
        } else {
            return null;
        }
    }

    static update(id, newLastName, newFirstName, newBirthDate, newPhones, newComment) {
        let contact = ContactDAO.getContactById(id);
        if (contact) {
            contact.lastName = newLastName;
            contact.firstName = newFirstName;
            contact.birthDate = newBirthDate;
            contact.phones = newPhones;
            contact.comment = newComment;
            ContactDAO.save();
        } else {
            console.log(`contact with id+${id} don't found`);
        }
    }

    static getContactById(id) {
        let contact = ContactDAO.#contacts.find((contact) => contact.id === Number(id));
        if (contact) {
            return contact;
        } else {
            return null;
        }
    }

    static getContactsByPhone(phone) {
        if (Contact.validatePhone(phone)) {
            let contacts = ContactDAO.#contacts.filter((contact) => contact.phones.some((_phone) => _phone === phone));
            if (contacts) {
                return contacts;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    static getContactsByLastName(lastName) {
        let contacts = ContactDAO.#contacts.filter((contact) => contact.lastName === lastName);
        if (contacts) {
            return contacts;
        } else {
            return null;
        }
    }
    
    static getContactsByFirstName(firstName) {
        let contacts = ContactDAO.#contacts.filter((contact) => contact.firstName === firstName);
        if (contacts) {
            return contacts;
        } else {
            return null;
        }
    }

    static getContactsThatHaveBirthday() {
        let contacts = ContactDAO.#contacts.filter((contact) => (contact.birthDate.getDate() - 1 === (new Date()).getDate() && contact.birthDate.getMonth() === (new Date()).getMonth()));
        if (contacts) {
            return contacts;
        } else {
            return null;
        }
    }
}

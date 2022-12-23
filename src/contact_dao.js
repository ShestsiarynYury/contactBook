import Contact from './contact.js';
import fs from 'fs';

export default class ContactDAO {
    static #contacts;

    static {
        ContactDAO.#contacts = JSON.parse(fs.readFileSync("contacts.json", "utf-8"));
    }

    static add(contact) {
        if (!(contact instanceof Contact)) throw new TypeError("value is not 'Contact' type");
        ContactDAO.#contacts.push(contact);
    }

    static delete(id) {
        let index = ContactDAO.#contacts.findIndex((contact) => contact.id === Number(id));
        if (index) {
            delete ContactDAO.#contacts[index];
            ContactDAO.#contacts = ContactDAO.#contacts.filter((contact) => contact);
            return index;
        } else {
            return null;
        }
    }

    // static update(contact) {
    //     if (!(contact instanceof Contact)) throw new TypeError("value is not 'Contact' type");
    // }

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

    static save() {
        fs.writeFileSync("contacts.json", JSON.stringify(ContactDAO.#contacts), "utf-8");
    }

    static get contacts() {
        return ContactDAO.#contacts;
    }

    static getContactById(id) {
        let contact = ContactDAO.#contacts.find((contact) => contact.id === Number(id));
        if (contact) {
            return contact;
        } else {
            return null;
        }
    }
}

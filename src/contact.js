import ContactDAO from './contact_dao.js';

export default class Contact {
    #id;
    #phones;
    #lastName;
    #firstName;
    // #birthDate;
    #comment;
                                        
    constructor(phones, lastName, firstName,/*birthDate,*/ comment) {
        this.#id = Contact.#generateId();
        if (!Contact.validatePhones(phones)) {
            console.log("Value of phones is not valid so it will be initialized to default value! []");
            this.#phones = [];
        } else {
            this.#phones = phones;
        }
        this.#lastName = lastName;
        this.#firstName = firstName;
        // this.#birthDate = birthDate;
        this.#comment = comment;
    }

    static #generateId() {
        let contacts = ContactDAO.contacts;
        if (!contacts || contacts.length === 0) return 1;
        else return ((contacts.sort(function(a, b) { return a - b }))[contacts.length - 1]).id + 1;
    }

    static validatePhone(phone) {
        return /^\+375-\((29|33|44|25|17)\)-[1-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/g.test(phone);
    }

    static validatePhones(phones) {
        return !(phones.some((phone) => Contact.validatePhone(phone) !== true));
    }

    get id() {
        return this.#id;
    }

    set phones(value) {
        if (!Contact.validatePhones(value)) {
            console.log("Value of phones is not valid so it will be initialized to default value! []");
            this.#phones = phones;
        } else {
            this.#phones = phones;
        }
    }

    get phones() {
        return this.#phones;
    }

    set lastName(value) {
        this.#lastName = value;
    }

    get lastName() {
        return this.#lastName;
    }

    set firstName(value) {
        this.#firstName = value;
    }

    get firstName() {
        return this.#firstName;
    }

    // get berthDate() {
    //     return this.#birthDate;
    // }

    // set birthDate(value) {
    //     this.#birthDate = value;
    // }

    set comment(value) {
        this.#comment = value;
    }

    get comment() {
        return this.#comment;
    }

    // toString() {
    //     return `{"id":${this.#id}, "phones":${JSON.stringify(this.#phones)}, "lastName":"${this.#lastName}", "firstNane":"${this.#firstName}", "comment":"${this.#comment}"}\n`;
    // }

    toJSON() {
        return ({
            id: this.#id,
            phones: this.#phones, 
            lastName: this.#lastName, 
            firstName: this.#firstName,
            /*birthDate: this.#birthDate,*/
            comment: this.#comment
        });
    }
}

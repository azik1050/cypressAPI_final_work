import {User, Auth} from '../support/api-client-user'
import { Bookshop } from '../support/api-client-bookshop'

const baseUrl = 'https://demoqa.com'

const user = new User(baseUrl)
const auth = new Auth(baseUrl)
const shop = new Bookshop(baseUrl)

describe('Test the bookshop', () => {
    before(() => {
        user.userCreate('Asdcw', 'Super!12').then(() => {
            cy.log('User created with ID:', user.id);
        }).then(() => {
            auth.getToken(user.username, user.password)
        }).then(() => {
            auth.authorize(user.username, user.password)
        })
    });

    it('Check user info', () => {
        user.userGet(auth.token)
    });

    it('Check the list of books', () => {
        shop.booksList()
    });

    it('Check adding the books', () => {
        shop.booksAdd(user.id, auth.token)
    });

    it('Check removing the books', () => {
        shop.booksDelete(user.id, auth.token)
    });

    after(() => {
        user.userDelete(auth.token)
    });
});

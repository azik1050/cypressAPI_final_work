import {User, Auth} from '../support/api-client-user'

const baseUrl = 'https://demoqa.com'

const user = new User(baseUrl)
const auth = new Auth(baseUrl)

describe('Test user actions', () => {
    before(() => {
        user.userCreate('Anwekn', 'Super!12').then(() => {
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

    after(() => {
        user.userDelete(auth.token)
    });
});

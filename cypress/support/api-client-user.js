export class User {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.username = null
        this.password = null
        this.id = null
    }

    userCreate(username, password) {
        return cy.request({
            method: 'POST',
            url: `${this.baseUrl}/Account/v1/User`,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                'userName': username,
                'password': password
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body['username']).to.eq(username)
            this.username = response.body['username']
            this.password = password
            this.id = response.body['userID']
        })
    }

    userGet(token) {
        cy.request({
            method: 'GET',
            url: `${this.baseUrl}/Account/v1/User/${this.id}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body['username']).to.eq(this.username)
            expect(response.body['userId']).to.eq(this.id)
        })
    }

    userDelete(token) {
        cy.request({
            method: 'DELETE',
            url: `${this.baseUrl}/Account/v1/User/${this.id}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(204)
        })
    }
}


export class Auth {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.token = null
    }

    authorize(username, password) {
        cy.request({
            method: 'POST',
            url: `${this.baseUrl}/Account/v1/Authorized`,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                'userName': username,
                'password': password
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    }

    getToken(username, password) {
        cy.request({
            method: 'POST',
            url: `${this.baseUrl}/Account/v1/GenerateToken`,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                'userName': username,
                'password': password
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            this.token = response.body['token']
        })
    }
}
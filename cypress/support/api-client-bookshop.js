import { expect } from "chai";

export class Bookshop {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.books = [
            "9781449325862",
            "9781449331818",
            "9781449337711",
            "9781449365035",
            "9781491904244",
            "9781491950296",
            "9781593275846",
            "9781593277574"
        ]
    }

    booksList() {
        cy.request({
            method: 'GET',
            url: `${this.baseUrl}/BookStore/v1/Books`,
            headers: {
                'accept': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            cy.log(response.headers)
            expect(response.body['books']).to.be.an('array');
            response.body['books'].forEach(element => {
                expect(element['isbn']).to.be.string
                expect(element['title']).to.be.string
                expect(element['subTitle']).to.be.string
                expect(element['author']).to.be.string
                expect(element['publish_date']).to.be.string
                expect(element['pages']).to.be.a('number')
                expect(element['description']).to.be.string
                expect(element['website']).to.be.string
            });
        })
    }

    booksAdd(userId, token) {
        cy.request({
            method: 'POST',
            url: `${this.baseUrl}/BookStore/v1/Books`,
            headers: {
                'content-type': 'application/json',
                'Authoriaztion': `Bearer ${token}`
            },
            body: {
                "userId": userId,
                "collectionOfIsbns": [
                  {
                    "isbn": this.books[0]
                  }
                ]              
            }
        }).then((response) => {
            expect(response.status).to.eq(201),
            expect(response.body['isbn']).to.eq(this.books[0])
        })
    }

    booksDelete(userId, token) {
        cy.request({
            method: 'DELETE',
            url: `${this.baseUrl}/BookStore/v1/Books?UserId=${userId}`,
            headers: {
                'content-type': 'application/json',
                'Authoriaztion': `Bearer ${token}`
            }
        }).then((resposne) => {
            expect(resposne.status).to.eq(204)
        })
    }
}
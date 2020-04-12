import { createYield } from "typescript";

describe('Messaging', () => {

    beforeEach(() => {
        cy.createTestUser().then(() => {
            cy.login();
            cy.createTestRoom("Test Room");
            cy.createTestRoom("Test Room 2").then(() => {
                cy.joinTestRoom("Test Room");
                cy.joinTestRoom("Test Room 2");
            })
        });
    });

    it('Chat room loaded', () => {
        cy.visit('/')
        cy.get('.chat-list').should('be.visible');
        cy.get('.chat-input-box').should('be.visible');
        cy.get('.btn > input').should('be.visible');
        cy.get('.field3 > .btn').should('be.visible');

        cy.deleteTestUser();
    })

    it('Send a single message to room', () => {
        cy.visit('/');
        cy.get('.chat-input-box')
            .type('Test message');
        cy.get('.field3 > .btn').click();
        cy.contains('Test message')
        cy.get('.msg-time').should('be.visible').then(() => {
            cy.get('.user_info > .ng-star-inserted').contains('Test message')
            cy.deleteTestUser();
        });
   
    });
})
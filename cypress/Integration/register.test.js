import { chmodSync } from "fs";


describe('Register', () => {

    it('Should display register page', () => {

        cy.visit('/register');
        cy.contains('Register');
        cy.contains('Username');
        cy.contains('Password');
        cy.get('#img-logo')
            .should('be.visible');
        cy.url()
            .should('include', 'register');
        cy.get('#input-username')
            .should('be.visible');
        cy.get('#input-password')
            .should('be.visible');
        cy.get('#button-register')
            .should('be.visible');

    });

    it('Should successfully register', () => {

        var username = new Date().toLocaleTimeString();
        cy.visit('/register');
        cy.get('#input-username')
            .type('Test User');
        cy.get('#input-password')
            .type('123456');
        cy.get('#button-register')
            .click();
        cy.url()
            .should('include', '/login');
        cy.get('#input-username')
            .type('Test User');
        cy.get('#input-password')
            .type('123456');
        cy.get('#button-login')
            .click();
        cy.url()
            .should('include', '/chat');
        cy.deleteTestUser();

    });


    it('Should conflict on exsiting user', () => {

        cy.createTestUser();
        cy.visit('/register');
        cy.get('#input-username')
            .type('Test User');
        cy.get('#input-password')
            .type('123456');
        cy.get('#button-register')
            .click();
        cy.contains('That username already exists')
        cy.url()
            .should('include', '/register');
        cy.deleteTestUser();

    });

})
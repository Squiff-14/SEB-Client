import { chmodSync } from "fs";

describe('Login', () =>{

	beforeEach(() =>{
		cy.createTestUser();
	})

	it('Should sucessfully load page', () => {
		cy.visit('/')
		cy.url()
		.should('include', '/login');
	});

    it('Should display login from', () =>{
        cy.visit('/');
        
        cy.contains('Login')
        cy.contains('Username')
        cy.contains('Password')
        cy.contains('Submit')
        cy.contains('Register')
        cy.get('#img-logo')
        	.should('be.visible')

        cy.url()
        	.should('include', '/login')

        cy.get('#input-username')
        	.type('Test User')
        	.should('have.value', 'Test User')

        cy.get('#input-password')
        	.type('123456')
        	.should('have.value', '123456')

        cy.get('#button-login')
        	.should('be.visible');
    });

    it('Should sucessfully login', () =>
    {
    	cy.visit('/');
    	cy.url()
        	.should('include', '/login')

        cy.get('#input-username')
        	.type('Test User')
        	.should('have.value', 'Test User')

        cy.get('#input-password')
        	.type('123456')
        	.should('have.value', '123456')

        cy.get('#button-login')
        	.click()

       	cy.url()
        	.should('include', '/chat')

    });

       it('Should unsucessfully login', () =>
    {
    	cy.visit('/');
    	 cy.url()
        	.should('include', '/login')

        cy.get('#input-username')
        	.type('Test User')
        	.should('have.value', 'Test User')

        cy.get('#input-password')
        	.type('1234')
        	.should('have.value', '1234')

        cy.get('#button-login')
        	.click()

        cy.contains('Username or password is incorrect');
       	cy.url()
        	.should('include', '/login')

	});
	
	afterEach(() =>{
		cy.deleteTestUser();
	})


})
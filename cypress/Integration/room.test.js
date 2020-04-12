
describe('Room', async () => {

    beforeEach(() => {
        cy.createTestUser().then(() => {
            cy.login();
            cy.createTestRoom("Test Room");
            cy.createTestRoom("Test Room 2")
        });
    });

    it('Should successfully load page', () => {
        cy.visit('/chat')
        cy.deleteTestUser();
    });

    it('Should load existing room', () => {
        cy.joinTestRoom("Test Room").then(() => {
            cy.visit('/chat');
            cy.contains('Test Room');
            cy.deleteTestUser();
        })
    });

    it('Should load no rooms', () => {
        cy.visit('/chat')
        cy.contains('You aren\'t in any rooms, please join a room')
        cy.deleteTestUser();
    });

    it('Should load join rooms page', () => {

        cy.visit('/chat')
        cy.get('#nav-rooms')
            .click();
        cy.contains('Room name')

        cy.get('#input-room-name')
            .should('be.visible');

        cy.get('#button-create-room')
            .should('be.visible');

        cy.get('#dropdown-join-room')
            .should('be.visible')
            .click();
        cy.deleteTestUser();
    })

    it('Should join room', () => {
        cy.visit('/chat')
        cy.url()
            .should('include', '/chat');
        cy.contains('You aren\'t in any rooms, please join a room')
        cy.get('#nav-rooms')
            .click();

        cy.get('#dropdown-join-room')
            .click();

        cy.contains('Test Room');
        cy.get('#Test\\ Room')
            .click();

        cy.url()
            .should('include', '/chat');
        cy.contains('Test Room');
        cy.contains('Joined the room.')
        cy.get('#recent-chat-rooms')
            .should('be.visible').then(() => {
                cy.deleteTestUser();
            })
    });

    it('Should create and join room', () => {
        cy.visit('/chat')
        cy.contains('You aren\'t in any rooms, please join a room')
        cy.get('#nav-rooms')
            .click();

        cy.contains('Room name')

        cy.get('#input-room-name')
            .should('be.visible')
            .type('New Test Room');

        cy.get('#button-create-room')
            .should('be.visible')
            .click();
        cy.contains('New Test Room');
        cy.contains('Joined the room.')
        cy.get('#recent-chat-rooms')
            .should('be.visible').then(() => {
                cy.deleteTestUser();
            });

    });

    it('Should navigate between rooms', () => {
        cy.joinTestRoom("Test Room").then(() => {
            cy.joinTestRoom("Test Room 2").then(() => {
                cy.visit('/chat');
                cy.contains('Test Room');

                cy.get(':nth-child(2)')
                .click({multiple: true, force:true});

                cy.get('#room-name').contains('Test Room')
                cy.deleteTestUser();
            });

        });
    });

    afterEach(() => {
        // will delete the room because the user made it. 
        //cy.deleteTestUser(); 
    })
});


Cypress.Commands.add('login', () => {
    cy.request('POST', `${Cypress.config('apiUrl')}/api/Authentication/login`, {
        username: 'Test User',
        password: '123456'
    }).then((resp) => {
        window.localStorage.setItem('token', JSON.stringify(resp.body));
    });
})

Cypress.Commands.add('createTestUser', () => {
    cy.request('POST', `${Cypress.config('apiUrl')}/api/Authentication/register`, {
        username: 'Test User',
        password: '123456'
    });
});

Cypress.Commands.add('createTestRoom', (roomName) => {
    cy.request('POST', `${Cypress.config('apiUrl')}/api/Authentication/login`, {
        username: 'Test User',
        password: '123456'
    }).then((resp) => {
        const options = {
            auth: {
                'bearer': resp.body.token
            },
            method: 'POST',
            url: `${Cypress.config('apiUrl')}/api/Room`,
            body: {
                roomName: roomName
            },
        };
        cy.request(options);
    });
});

Cypress.Commands.add('joinTestRoom', (roomName) => {
    cy.request('POST', `${Cypress.config('apiUrl')}/api/Authentication/login`, {
        username: 'Test User',
        password: '123456'
    }).then((resp) => {
        const options = {
            auth: {
                'bearer': resp.body.token
            },
            method: 'POST',
            url: `${Cypress.config('apiUrl')}/api/User/${roomName}`
        };
        cy.request(options);
    });
});

Cypress.Commands.add('deleteTestRoom', () => {
    cy.request('POST', `${Cypress.config('apiUrl')}/api/Authentication/login`, {
        username: 'Test User',
        password: '123456'
    }).then((resp) => {
        const options = {
            auth: {
                'bearer': resp.body.token
            },
            method: 'DELETE',
            url: `${Cypress.config('apiUrl')}/api/Room/Test Room`
        };
        cy.request(options);
    });
});

Cypress.Commands.add('deleteTestUser', () => {
    cy.request('POST', `${Cypress.config('apiUrl')}/api/Authentication/login`, {
        username: 'Test User',
        password: '123456'
    }).then((resp) => {
        const options = {
            auth: {
                'bearer': resp.body.token
            },
            method: 'DELETE',
            url: `${Cypress.config('apiUrl')}/api/User/Test User`
        };
        cy.request(options);

    });
});
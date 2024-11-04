describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('visit page about', () => {
    cy.contains('About').click();
    cy.contains('About the application');
  });

  it('visit page login', () => {
    cy.contains('Sign in').click();
    const buttonSubmit = cy.get('button[type="submit"]');

    const inputEmail = cy.get('input[name="email"]');
    inputEmail.clear();
    inputEmail.type('test@gmail.com');
    const inputPassword = cy.get('input[name="password"]');
    inputPassword.clear();
    inputPassword.type('Con12');
    buttonSubmit.should('be.enabled');
  });
});

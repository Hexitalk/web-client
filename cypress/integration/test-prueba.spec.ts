describe('Test Prueba', () => {
  it('Visitar la página de inicio', () => {
    cy.visit('http://localhost:4200');
    expect(true).to.equal(true);
  });
});

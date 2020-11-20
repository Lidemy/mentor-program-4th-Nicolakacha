describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.server();
    cy.route(
      'https://student-json-api.lidemy.me/posts?_sort=createdAt&_order=desc',
      [
        {
          id: 1,
          title: 'hello',
          createdAt: 12345,
        },
      ]
    );
    cy.visit('/');
    cy.contains('hello');
  });
});

/// <reference types="Cypress" />

describe("page navigation", () => {
  beforeEach(() => {
    cy.visit("/");
    // base url added to cypress.config.js
  });

  it("should navigate between pages", () => {
    cy.get('[data-cy="header-about-link"]').click();
    cy.location("pathname").should("eq", "/about"); // /about => About page
    cy.go("back");
    cy.location("pathname").should("eq", "/"); // / => Home page
    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="header-home-link"]').click();
    cy.location("pathname").should("eq", "/"); // / => Home page
  });
});

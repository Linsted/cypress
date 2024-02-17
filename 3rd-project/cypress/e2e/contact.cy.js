/// <reference types="cypress" />

describe("Contact page", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");

    cy.get('[data-cy="contact-input-message"]').type("Hello, World!");
    cy.get('[data-cy="contact-input-name"]').type("John Doe");
    cy.get('[data-cy="contact-input-email"]').type("mail@mail.com");

    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').contains("Sending...");
    cy.get('[data-cy="contact-btn-submit"]').should("have.attr", "disabled");

    //   Alternative # 1
    cy.get('[data-cy="contact-btn-submit"]')
      .click()
      .contains("Sending...")
      .should("have.attr", "disabled");

    //   Alternative # 2
    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
    cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");

    //   then() method

    cy.get('[data-cy="contact-btn-submit"]').then((btn) => {
      expect(btn.attr("disabled").to.be.undefined);
      expect(btn.text()).to.equal("Sending...");
    });
  });
});

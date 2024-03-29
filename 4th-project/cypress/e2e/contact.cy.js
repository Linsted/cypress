/// <reference types="Cypress" />

describe("contact form", { defaultCommandTimeout: 5000 }, () => {
  before(() => {
    // runs only once before the all tests
  });

  beforeEach(() => {
    cy.visit("/about");
    // base url added to cypress.config.js
    // runs before every test ( its repeated)
  });

  after(() => {});
  afterEach(() => {});

  it("should submit the form", () => {
    cy.getById("contact-input-message").type("Hello world!"); // <---- custom query in support/commands.js
    cy.get('[data-cy="contact-input-name"]').type("John Doe");
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.eq("Send Message");
    });
    cy.screenshot();
    // cy.get('[data-cy="contact-input-email"]').type("test@example.com{enter}");
    cy.get('[data-cy="contact-input-email"]').type("test@example.com");
    cy.submitForm(); // custom command in support/commands.js

    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains('Send Message')
    //   .should('not.have.attr', 'disabled');
    cy.screenshot();
    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
    // cy.get('@submitBtn').click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending...");
    });
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
    cy.get('[data-cy="contact-input-message"]').as("msgInput");
    cy.get("@msgInput").focus().blur();
    cy.get("@msgInput")
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).contains("invalid");
      });

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).contains("invalid");
      });

    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).contains("invalid");
      });
  });
});

describe("Tasks", () => {
  it("should open and close the task modal", () => {
    cy.visit("http://localhost:5173/");
    cy.get("button")
      .contains(/add task/i)
      .click();
    cy.get(".modal").should("exist");
    cy.get("button")
      .contains(/cancel/i)
      .click();
    cy.get(".backdrop").should("not.exist");

    cy.get("button")
      .contains(/add task/i)
      .click();
    cy.get(".backdrop").click({ force: true });
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
  });

  it("add new task", () => {
    cy.visit("http://localhost:5173/");
    cy.get("button")
      .contains(/add task/i)
      .click();
    cy.get("#title").type("New Task");
    cy.get("#summary").type("New Task Description");
    cy.get(".modal")
      .contains(/add task/i)
      .click();
    cy.get(".task h2").contains("New Task").should("exist");
    cy.get(".task p").contains("New Task Description").should("exist");
  });

  it("shouldn`t add task without all fields filled", () => {
    cy.visit("http://localhost:5173/");
    cy.get("button")
      .contains(/add task/i)
      .click();
    cy.get("#title").type("New Task");
    cy.get("button")
      .contains(/add task/i)
      .click();
    cy.get(".modal").contains(/please provide/i);
  });

  it("should pick urgent dropdown option", () => {
    cy.visit("http://localhost:5173/");
    cy.get("button")
      .contains(/add task/i)
      .click();

    cy.get("#title").type("Urgent Title");
    cy.get("#summary").type("Urgent Description");
    cy.get("#category").select("urgent");
    cy.get("button")
      .contains(/add task/i)
      .click();

    cy.get("#filter").select("urgent");
    cy.get(".task h2").contains("Urgent Title").should("exist");

    cy.get("#filter").select("important");
    cy.contains(/no tasks found/i);
  });
});

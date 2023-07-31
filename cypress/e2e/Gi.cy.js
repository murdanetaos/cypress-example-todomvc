describe("TodoMVC Application", () => {
    beforeEach(() => {
      // Clear all items before each test
      cy.request("POST", "/reset");
      cy.visit("/");
    });
  
    it("should add 3 todo items", () => {
      cy.fixture("app").then((todos) => {
        todos.forEach((todo) => {
          cy.get(".new-todo").type(todo.title + "{enter}");
        });
  
        cy.get(".todo-list li").should("have.length", todos.length);
        todos.forEach((todo, index) => {
          cy.get(".todo-list li").eq(index).should("contain.text", todo.title);
        });
      });
    });
  
    it("should mark a todo item as completed", () => {
      cy.fixture("app").then((todos) => {
        todos.forEach((todo) => {
          cy.get(".new-todo").type(todo.title + "{enter}");
        });
  
        cy.get(".toggle").eq(1).click(); // Mark 'Invest in yourself' as completed
  
        cy.get(".todo-list li.completed").should("have.length", 1);
        cy.get(".todo-list li.completed").should("contain.text", "Invest in yourself");
      });
    });
  
    it("should clear completed todo items", () => {
      cy.fixture("app").then((todos) => {
        todos.forEach((todo) => {
          cy.get(".new-todo").type(todo.title + "{enter}");
        });
  
        cy.get(".toggle").eq(0).click(); // Mark 'Make every second count' as completed
        cy.get(".toggle").eq(2).click(); // Mark 'Learn Cypress' as completed
  
        cy.contains("Clear completed").click();
  
        cy.get(".todo-list li").should("have.length", 1);
        cy.get(".todo-list li").should("contain.text", "Invest in yourself");
      });
    });
  
    it("should edit a todo item", () => {
      cy.fixture("app").then((todos) => {
        todos.forEach((todo) => {
          cy.get(".new-todo").type(todo.title + "{enter}");
        });
  
        const editedTitle = "Learn Cypress like a pro";
        cy.get(".todo-list li").eq(2).dblclick();
        cy.get(".todo-list li").eq(2).find(".edit").type(`{selectAll}${editedTitle}{enter}`);
  
        cy.get(".todo-list li").eq(2).should("contain.text", editedTitle);
      });
    });
  });
  
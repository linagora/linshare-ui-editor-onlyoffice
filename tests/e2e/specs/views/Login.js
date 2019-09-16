describe("Login page", () => {
  describe("Translate helper message", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".language-menu").click();
      cy.contains("Français").click();
    });

    it("should show the translated error message if email input is empty", () => {
      cy.get("input[type=email]").click();
      cy.get("input[type=email]").blur();

      cy.contains("Le email doit est obligatoire").should("be.visible");
    });

    it("should not show any error message if email input is filled", () => {
      cy.get("input[type=email]").click();
      cy.get("input[type=email]").blur();

      cy.contains("Le email doit est obligatoire").should("be.visible");

      cy.get("input[type=email]").type("linagora@email.com");

      cy.contains("Le email doit est obligatoire").should("be.not.visible");
    });

    it("should show the translated error message if password input is empty", () => {
      cy.get("input[type=password]").click();
      cy.get("input[type=password]").blur();

      cy.contains("Le mot de passe est obligatoire").should("be.visible");
    });

    it("should not show any error message if password input is filled", () => {
      cy.get("input[type=password]").click();
      cy.get("input[type=password]").blur();

      cy.contains("Le mot de passe est obligatoire").should("be.visible");

      cy.get("input[type=password]").type("secret");

      cy.contains("Le mot de passe est obligatoire").should("be.not.visible");
    });

    it("should show the translated error message if login is failed", () => {
      cy.get("input[type=email]").type("fake@email.com");
      cy.get("input[type=password]").type("fakepassword");

      cy.get("button[type=submit]").click();

      cy.contains("Erreur de login, merci d'essayer à nouveau").should("be.visible");
    });
  });
});

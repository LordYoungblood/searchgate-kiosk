describe("postLogin", () => {
  it("logs in successfully", () => {
    // it('displays an error message for invalid credentials', () => {
    cy.intercept("POST", `/login`, (req) => {
      req.reply(401, { message: "Invalid credentials" });
    });

    cy.visit("http://localhost:3000/");
    cy.get('input[name="user_name"]').type("invalid@email");
    cy.get('input[name="password"]').type("invalidpassword");
    cy.get('button[name="login"]').click();

    cy.contains("Invalid Credentials");
    cy.url().should("include", "/");
    // })

    cy.intercept("POST", `/login`, (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.user.admin).to.be.a("number");
        expect(res.body.user.user_base).to.be.a("string");
        expect(res.body.token).to.be.a("string");

        res.send({ fixture: "login.json" });
      });
    });

    cy.visit("http://localhost:3000/");
    cy.get('input[name="user_name"]').type("avery");
    cy.get('input[name="password"]').type("password");
    cy.get('button[name="login"]').click();

    cy.url().should("include", "/forms");
    cy.getCookie("au").should("exist");
    cy.getCookie("base").should("exist");
    cy.getCookie("ver").should("exist");
  });
});

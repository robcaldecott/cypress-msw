import { DefaultRequestBody, PathParams } from "msw";

describe("app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders in the loading state", () => {
    cy.findByLabelText(/loading/i).should("exist");
  });

  it.only("renders names", () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw;
      worker.use(
        rest.get<DefaultRequestBody, PathParams, string[]>(
          "/api/names",
          (req, res, ctx) => {
            return res(ctx.json(["Bob", "Alice"]));
          }
        )
      );
    });
    cy.findByLabelText(/loading/i).should("exist");
    cy.findByText(/bob/i).should("exist");
    cy.findByText(/alice/i).should("exist");
  });

  it("handles errors", () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw;
      worker.use(
        rest.get("/api/names", (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );
    });
    cy.findByLabelText(/loading/i).should("exist");
    cy.findByText(/error fetching names/i).should("exist");
  });
});

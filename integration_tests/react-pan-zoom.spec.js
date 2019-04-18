describe("ReactPanZoom integration test.", () => {
  it("Should render the pan container", () => {
    cy.visit("http://localhost:9000");
    cy.get('.pan-container');
    let matrixData = cy.get('.pan-container > div').should(($el) => {
      expect($el).to.have.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
    });
  });
  it("Should work on drag", () => {
    cy.get('.pan-container > div')
      .trigger('mousedown', {which: 1, pageX: 0, pageY: 0})
      .trigger('mousemove', {which: 1, pageX: 50, pageY: 50})
      .trigger('mouseup')
      .should($el => {
        expect($el).to.have.css('transform', 'matrix(1, 0, 0, 1, 50, 50)');
      });
  });
  it("Should work with zoom in/out controlled from outside", () => {
    cy.get('[data-cypress-id="zoom-in-btn"]').click();
    cy.get('.pan-container > div')
      .should($el => {
        expect($el).to.have.css('transform', 'matrix(1.2, 0, 0, 1.2, 50, 50)');
      });
    cy.get('[data-cypress-id="zoom-in-btn"]').click();
    cy.get('.pan-container > div')
      .should($el => {
        expect($el).to.have.css('transform', 'matrix(1.4, 0, 0, 1.4, 50, 50)');
      });

    cy.get('[data-cypress-id="zoom-out-btn"]').click().click();
    cy.get('.pan-container > div')
      .should($el => {
        expect($el).to.have.css('transform', 'matrix(1, 0, 0, 1, 50, 50)');
      });
  })
  describe("When shift key is pressed", () => {
    it("Should not drag", () => {
      cy.get('.pan-container > div')
      .trigger('keydown', {which: 16, pageX: 0, pageY: 0});

      cy.get('.pan-container > div')
      .trigger('mousedown', {which: 1, pageX: 52, pageY: 52})
      .trigger('mousemove', {which: 1, pageX: 100, pageY: 100})
      .trigger('mouseup')
      .should($el => {
        expect($el).to.have.css('transform', 'matrix(1, 0, 0, 1, 50, 50)');
      });
    })
  describe("When shift is released after pressing", () => {
    it("Should drag", () => {
      cy.get('.pan-container > div')
      .trigger('keydown', {which: 16, pageX: 0, pageY: 0})
      .trigger('keyup', {which: 16, pagex: 0, pagey: 0});

      cy.get('.pan-container > div')
      .trigger('mousedown', {which: 1, pageX: 52, pageY: 52})
      .trigger('mousemove', {which: 1, pageX: 100, pageY: 100})
      .trigger('mouseup')
      .should($el => {
        expect($el).to.have.css('transform', 'matrix(1, 0, 0, 1, 98, 98)');
      });
    })
  })
  })
})

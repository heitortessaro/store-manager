const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../models/connection");
const saleModel = require('../../../models/saleModel');

describe("ServiceModel - Create a Sale", () => {
  describe("When the SQL query does no work", () => {
    const mockSaleIdEmpty = [];
    before(async () => {
      sinon.stub(connection, "execute").resolves(mockProductIdEmpty);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("return exception", async () => {
      try {
        const response = await saleModel.createSale();
      } catch (error) {
        const errorMessage = error.message;
        const errorStatus = error.status;
        expect(errorMessage).to.be.equal("DB Error");
        expect(errorStatus).to.be.equal(500);
      }
    });
  });

  describe("When a sale is created", async () => {
    const id = 1;
    const expectedResponse = { id };
    const mockResponse = [{ insertId: id }];
    before(async () => {
      sinon.stub(connection, "execute").resolves([mockResponse]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("Return an object", async () => {
      const response = await saleModel.createSale();
      expect(response).to.be.an("object");
    });
    it("The object is not empty", async () => {
      const response = await saleModel.createSale();
      expect(response).to.be.not.empty;
    });
    it('The object has "id" property', async () => {
      const response = await saleModel.createSale();
      expect(response).to.include.all.keys("id");
    });
    it("The object is the expected", async () => {
      const response = await saleModel.createSale();
      expect(response).to.eql(expectedResponse);
    });
  });
});
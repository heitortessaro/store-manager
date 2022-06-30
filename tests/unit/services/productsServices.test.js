const { expect } = require("chai");
const sinon = require("sinon");

const productService = require("../../../services/productService");
const productModel = require("../../../models/productModel");

describe("ProducService - Searches for all products", () => {
  describe("When no product is found", () => {
    before(async () => {
      sinon.stub(productModel, "getAll").resolves(false);
    });
    after(async () => {
      productModel.getAll.restore();
    });
    it("Return false", async () => {
      const response = await productService.getAll();
      expect(response).to.be.equal(false);
    });
  });
  describe("When products are found", () => {
    const mockResponse = [
      {
        id: 1,
        name: "Martelo de Thor",
      },
      {
        id: 2,
        name: "Traje de encolhimento",
      },
      {
        id: 3,
        name: "Escudo do Capitão América",
      },
    ];
    before(async () => {
      sinon.stub(productModel, "getAll").resolves(mockResponse);
    });
    after(async () => {
      productModel.getAll.restore();
    });
    it("Returns an array", async () => {
      const response = await productModel.getAll();
      expect(response).to.be.an("array");
    });
    it("The array has length equals to 3", async () => {
      const response = await productModel.getAll();
      expect(response.length).to.be.equal(3);
    });
    it('The object has "id" and "name" properties', async () => {
      const response = await productModel.getAll();
      expect(response[0]).to.include.all.keys("id", "name");
    });
    it("The array is the expected", async () => {
      const response = await productModel.getAll();
      expect(response).to.eql(mockResponse);
    });
  });
});

describe("ProducService - Searches by a product using its ID", () => {
  describe("When a product with the supplied id does not exist", () => {
    before(async () => {
      sinon.stub(productModel, "getById").resolves(false);
    });
    after(async () => {
      productModel.getById.restore();
    });
    it("Return false", async () => {
      const response = await productService.getById(1);
      expect(response).to.be.equal(false);
    });
  });
  describe("When the product is found", () => {
    const mockResponse = {
      id: 1,
      name: "Martelo de Thor",
    };
    before(async () => {
      sinon.stub(productModel, "getById").resolves(mockResponse);
    });
    after(async () => {
      productModel.getById.restore();
    });
    it("Returns an Object", async () => {
      const response = await productModel.getById(1);
      expect(response).to.be.an("object");
    });
    it("The object is not empty", async () => {
      const response = await productModel.getById(1);
      expect(response).to.be.not.empty;
    });
    it('The object has "id" and "name" properties', async () => {
      const response = await productModel.getById(1);
      expect(response).to.include.all.keys("id", "name");
    });
    it("The object is the expected", async () => {
      const response = await productModel.getById(1);
      expect(response).to.eql(mockResponse);
    });
  });
});
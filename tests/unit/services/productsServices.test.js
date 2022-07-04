const { expect } = require("chai");
const sinon = require("sinon");

const httpsStatus = require('../../../helpers/httpsStatus');
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


describe("ProducService - Create a new product", () => {
  describe("When the input data is not valid", () => {
    it("Return exception with  bad request if product name is not defined", async () => {
      try {
        const response = await productService.create({ test: "name" });
      } catch (error) {
        expect(error.status).to.be.equal(httpsStatus.BAD_REQUEST);
        expect(error.message).to.be.equal('"name" is required');
      }
    });
    it("Return exception with  bad request if product name is not a string", async () => {
      try {
        const response = await productService.create({ name: 1 });
      } catch (error) {
        expect(error.status).to.be.equal(httpsStatus.BAD_REQUEST);
        expect(error.message).to.be.equal('"name" is required');
      }
    });
    it("Return exception with semantic error if product name length is smaller then 5", async () => {
      try {
        const response = await productService.create({ name: 'four' });
      } catch (error) {
        expect(error.status).to.be.equal(httpsStatus.SEMANTIC_ERROR);
        expect(error.message).to.be.equal(
          '"name" length must be at least 5 characters long'
        );
      }
    });
  });
  describe("When DB error happens", () => {
    const mockInput = { name: 'Valid product name' };
    before(async () => {
      sinon.stub(productModel, "create").resolves(false);
    });
    after(async () => {
      productModel.create.restore();
    });
    it("Return exception with server error sinalization", async () => {
      try {
        const response = await productService.create(mockInput);  
      } catch (error) {
        expect(error.status).to.be.equal(httpsStatus.INTERNAL_SERVER);
        expect(error.message).to.be.equal("Server error");
      }
    });
  });
  describe("When the product is created", () => {
    const mockInput = { name: "Valid product name" };
    const mockResponse = { id: 1, name: mockInput.name };
    before(async () => {
      sinon.stub(productModel, "create").resolves(mockResponse);
    });
    after(async () => {
      productModel.create.restore();
    });
    it("Return an object", async () => {
      const response = await productService.create(mockInput);
      expect(response).to.be.an("object");
    });
    it("The object is not empty", async () => {
      const response = await productService.create(mockInput);
      expect(response).to.be.not.empty;
    });
    it('The object has "id" and "name" properties', async () => {
      const response = await productService.create(mockInput);
      expect(response).to.include.all.keys("id", "name");
    });
    it("The object is the expected", async () => {
      const response = await productService.create(mockInput);
      expect(response).to.eql(mockResponse);
    });
  })
});

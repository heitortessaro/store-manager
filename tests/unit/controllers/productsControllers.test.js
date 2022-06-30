const { expect } = require("chai");
const sinon = require("sinon");
const httpStatus = require("../../../helpers/httpsStatus");

const productController = require("../../../controllers/productController");
const productService = require("../../../services/productService");

describe('ProductController - calling the getAll controller', () => {
  describe("When no products are found", async () => {
    const req = {};
    const res = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(productService, 'getAll').resolves(false);
    });
    after(() => {
      productService.getAll.restore();
    })
    it('The status method is called passing 404', async () => {
      await productController.getAll(req, res);
      expect(res.status.calledWith(httpStatus.NOT_FOUND)).to.be.equal(true);
    });
    it('the method json is called passing a "Product not found" message', async () => {
      await productController.getAll(req, res);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    })
  });

  describe('When products are found', () => {
    const req = {};
    const res = {};
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
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(productService, "getAll").resolves(mockResponse);
    });
    after(() => {
      productService.getAll.restore();
    });
    it('The status method is called with 200 code', async () => {
      await productController.getAll(req, res);
      expect(res.status.calledWith(httpStatus.OK)).to.be.true;
    });
    it('The json method to be called passing an array', async () => {
      await productController.getAll(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.true;
    });
  });
});

describe("ProductController - calling the getById controller", () => {
  describe("When no products are found", async () => {
    const req = {};
    const res = {};
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(productService, "getById").resolves(false);
    });
    after(() => {
      productService.getById.restore();
    });
    it("The status method is called passing 404", async () => {
      await productController.getById(req, res);
      expect(res.status.calledWith(httpStatus.NOT_FOUND)).to.be.equal(true);
    });
    it('the method json is called passing a "Product not found" message', async () => {
      await productController.getById(req, res);
      expect(res.json.calledWith({ message: "Product not found" })).to.be.equal(
        true
      );
    });
  });

  describe("When the product is found", () => {
    const req = {};
    const res = {};
    const mockResponse = {
      id: 1,
      name: "Martelo de Thor",
    };
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(productService, "getById").resolves(mockResponse);
    });
    after(() => {
      productService.getById.restore();
    });
    it("The status method is called with 200 code", async () => {
      await productController.getById(req, res);
      expect(res.status.calledWith(httpStatus.OK)).to.be.true;
    });
    it("The json method to be called passing an array", async () => {
      await productController.getById(req, res);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
  });
});
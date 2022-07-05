const { expect } = require("chai");
const sinon = require("sinon");
const httpStatus = require("../../../helpers/httpsStatus");

const saleController = require("../../../controllers/saleController");
const saleService = require("../../../services/saleService");

describe('SaleController', () => {
  describe('-> When calling create Sale', () => {
    describe("When an error is thrown", () => {
      const req = {};
      const res = {};
      const message = '"quantity" must be greater than or equal to 1';
      const error = new Error(message);
      error.status = httpStatus.SEMANTIC_ERROR;
      const productList = [{ productId: 2, quantity: 1 }];
      before(() => {
        req.body = productList;
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(saleService, "createSale").rejects(error);
      });
      after(() => {
        saleService.createSale.restore();
      });
      it("Expect a bad request status", async () => {
        const response = await saleController.createSale(req, res);
        expect(res.json.calledWith({ message })).to.be.equal(true);
        expect(res.status.calledWith(httpStatus.SEMANTIC_ERROR)).to.be.equal(
          true
        );
      });
    });
    describe('When the sale is created', () => {
      const req = {};
      const res = {};
      const productList = [{ productId: 2, quantity: 1 }];
      const mokeResponse = {
        id: 3,
        itemsSold: [
          {
            productId: 2,
            quantity: 1,
          },
        ],
      };
      before(() => {
        req.body = productList;
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(saleService, "createSale").resolves(mokeResponse);
      });
      after(() => {
        saleService.createSale.restore();
      });
      it("Returns an object with the sale Id and itens sold", async () => {
        const response = await saleController.createSale(req, res);
        expect(res.json.calledWith(mokeResponse)).to.be.equal(true);
        expect(res.status.calledWith(httpStatus.CREATED)).to.be.equal(
          true
        );
      });
    });
  });

  describe("-> When calling getAll", () => {
    describe("When an error is thrown", () => {
      const req = {};
      const res = {};
      const message = 'DB Error';
      const error = new Error(message);
      error.status = httpStatus.INTERNAL_SERVER;
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(saleService, "getAll").rejects(error);
      });
      after(() => {
        saleService.getAll.restore();
      });
      it("Expect a bad request status", async () => {
        const response = await saleController.getAll(req, res);
        expect(res.json.calledWith({ message })).to.be.equal(true);
        expect(res.status.calledWith(httpStatus.INTERNAL_SERVER)).to.be.equal(true);
      });
    });
    describe("When the sales are returned", () => {
      const req = {};
      const res = {};
      const mokeResponse = [
        {
          saleId: 1,
          productId: 1,
          quantity: 5,
          date: "2022-07-05T22:41:45.000Z",
        },
        {
          saleId: 2,
          productId: 3,
          quantity: 15,
          date: "2022-07-05T22:41:45.000Z",
        },
      ];
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(saleService, "getAll").resolves(mokeResponse);
      });
      after(() => {
        saleService.getAll.restore();
      });
      it("Returns an array with information of all past sales", async () => {
        const response = await saleController.getAll(req, res);
        expect(res.json.calledWith(mokeResponse)).to.be.equal(true);
        expect(res.status.calledWith(httpStatus.OK)).to.be.equal(true);
      });
    });
  });

  describe("-> When calling getById", () => {
    describe("When an error is thrown", () => {
      const req = {};
      const res = {};
      const id = 1;
      const message = "Sale not found";
      const error = new Error(message);
      error.status = httpStatus.NOT_FOUND;
      before(() => {
        req.params = { id };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(saleService, "getById").rejects(error);
      });
      after(() => {
        saleService.getById.restore();
      });
      it("Expect a bad request status", async () => {
        const response = await saleController.getById(req, res);
        expect(res.json.calledWith({ message })).to.be.equal(true);
        expect(res.status.calledWith(httpStatus.NOT_FOUND)).to.be.equal(
          true
        );
      });
    });
    describe("When the sale is returned", () => {
      const req = {};
      const res = {};
      const id = 1;
      const mokeResponse = [
        {
          productId: 1,
          quantity: 5,
          date: "2022-07-05T22:41:45.000Z",
        },
        {
          productId: 2,
          quantity: 10,
          date: "2022-07-05T22:41:45.000Z",
        },
      ];
      before(() => {
        req.params = { id };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(saleService, "getById").resolves(mokeResponse);
      });
      after(() => {
        saleService.getById.restore();
      });
      it("Returns an array with information of all past sales", async () => {
        const response = await saleController.getById(req, res);
        expect(res.json.calledWith(mokeResponse)).to.be.equal(true);
        expect(res.status.calledWith(httpStatus.OK)).to.be.equal(true);
      });
    });
  });

  describe("-> When calling del", () => {
    describe("When an error is thrown", () => {
      const req = {};
      const res = {};
      const id = 1;
      const message = "Sale not found";
      const error = new Error(message);
      error.status = httpStatus.NOT_FOUND;
      before(() => {
        req.params = { id };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(saleService, "del").rejects(error);
      });
      after(() => {
        saleService.del.restore();
      });
      it("Expect a bad request status", async () => {
        const response = await saleController.del(req, res);
        expect(res.json.calledWith({ message })).to.be.equal(true);
        expect(res.status.calledWith(httpStatus.NOT_FOUND)).to.be.equal(true);
      });
    });
    describe("When the sale is deleted", () => {
      const req = {};
      const res = {};
      const id = 1;
      const mokeResponse = true;
      before(() => {
        req.params = { id };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(saleService, "del").resolves(mokeResponse);
      });
      after(() => {
        saleService.del.restore();
      });
      it("Returns true to informe that the sale was deleted", async () => {
        const response = await saleController.del(req, res);
        expect(res.json.calledWith()).to.be.equal(true);
        expect(
          res.status.calledWith(httpStatus.OK_NOTHING_TO_RETURN)
        ).to.be.equal(true);
      });
    });
  });

  describe("-> When calling create Sale", () => {
    describe("When an error is thrown", () => {
      const req = {};
      const res = {};
      const message = '"quantity" must be greater than or equal to 1';
      const error = new Error(message);
      error.status = httpStatus.SEMANTIC_ERROR;
      const id = 101;
      const productList = [{ productId: 2, quantity: -1 }];
      before(() => {
        req.params = { id };
        req.body = productList;
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(saleService, "update").rejects(error);
      });
      after(() => {
        saleService.update.restore();
      });
      it("Expect a bad request status", async () => {
        const response = await saleController.update(req, res);
        expect(res.json.calledWith({ message })).to.be.equal(true);
        expect(res.status.calledWith(httpStatus.SEMANTIC_ERROR)).to.be.equal(
          true
        );
      });
    });
    describe("When the sale is updated", () => {
      const req = {};
      const res = {};
      const id = 1;
      const productList = [
        {
          productId: 1,
          quantity: 10,
        },
        {
          productId: 2,
          quantity: 50,
        },
      ];
      const mokeResponse = {
        saleId: 1,
        itemsUpdated: [
          {
            productId: 1,
            quantity: 10,
          },
          {
            productId: 2,
            quantity: 50,
          },
        ],
      };
      before(() => {
        req.params = { id };
        req.body = productList;
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(saleService, "update").resolves(mokeResponse);
      });
      after(() => {
        saleService.update.restore();
      });
      it("Returns an object with the sale Id and itens sold updated", async () => {
        const response = await saleController.update(req, res);
        expect(res.json.calledWith(mokeResponse)).to.be.equal(true);
        expect(res.status.calledWith(httpStatus.OK)).to.be.equal(true);
      });
    });
  });
});
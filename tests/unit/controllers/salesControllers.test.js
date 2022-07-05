const { expect } = require("chai");
const sinon = require("sinon");
const httpStatus = require("../../../helpers/httpsStatus");

const saleController = require("../../../controllers/saleController");
const saleService = require("../../../services/saleService");

describe.only('SaleController', () => {
  describe('When calling create Sale', () => {
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
    })
  })
})
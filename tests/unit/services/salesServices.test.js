const { expect } = require("chai");
const sinon = require("sinon");

const httpsStatus = require("../../../helpers/httpsStatus");
const saleService = require("../../../services/saleService");
const saleModel = require("../../../models/saleModel");
const productModel = require("../../../models/productModel");

describe("SaleService", () => {
  describe("Create a new sale", () => {
    describe("When the product list data is not valid", () => {
      it("Return bad request exception if product id is not defined", async () => {
        const mockInput = [{ quantity: 1 }, { quantity: 10 }];
        try {
          const response = await saleService.createSale(mockInput);
        } catch (error) {
          expect(error.status).to.be.equal(httpsStatus.BAD_REQUEST);
          expect(error.message).to.be.equal('"productId" is required');
        }
      });
      it("Return bad request exception if quantity is not number", async () => {
        const mockInput = [{ productId: 1, quantity: "1" }];
        try {
          const response = await saleService.createSale(mockInput);
        } catch (error) {
          expect(error.status).to.be.equal(httpsStatus.BAD_REQUEST);
          expect(error.message).to.be.equal('"quantity" is required');
        }
      });
      it("Return bad request exception if quantity <= 0", async () => {
        const mockInput = [{ productId: 1, quantity: -1 }];
        try {
          const response = await saleService.createSale(mockInput);
        } catch (error) {
          expect(error.status).to.be.equal(httpsStatus.SEMANTIC_ERROR);
          expect(error.message).to.be.equal(
            '"quantity" must be greater than or equal to 1'
          );
        }
      });
    });

    describe("When product id does not exist", () => {
      const mockInput = [{ productId: 3, quantity: 1 }];
      const mockResponse = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
        },
      ];
      before(async () => {
        sinon.stub(productModel, "getAll").resolves(mockResponse);
      });
      after(async () => {
        productModel.getAll.restore();
      });
      it("Return not found exception if product dows not exist", async () => {
        try {
          const response = await saleService.createSale(mockInput);
        } catch (error) {
          expect(error.status).to.be.equal(httpsStatus.NOT_FOUND);
          expect(error.message).to.be.equal("Product not found");
        }
      });
    });
    describe("When the sale is created", () => {
      const mockInput = [
        {
          productId: 2,
          quantity: 1,
        },
        {
          productId: 1,
          quantity: 1,
        },
      ];
      const mockResponseCreateSale = { id: 1 };
      const mockResponseGetAll = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
        },
      ];
      const mockResponseCreateSaleProduct = {
        id: mockResponseCreateSale.id,
        itemsSold: [
          {
            productId: 2,
            quantity: 1,
          },
          {
            productId: 1,
            quantity: 1,
          },
        ],
      };
      before(async () => {
        sinon.stub(productModel, "getAll").resolves(mockResponseGetAll);
        sinon.stub(saleModel, "createSale").resolves(mockResponseCreateSale);
        sinon
          .stub(saleModel, "createSaleProduct")
          .onCall(0)
          .resolves(true)
          .onCall(1)
          .resolves(true);
      });
      after(async () => {
        productModel.getAll.restore();
        saleModel.createSale.restore();
        saleModel.createSaleProduct.restore();
      });

      it("Return an object with the sale id and array of sold items", async () => {
        const response = await saleService.createSale(mockInput);
        expect(response).to.eql(mockResponseCreateSaleProduct);
      });
    });
  });

  describe("List all sales", () => {
    const mockResponse = [
      {
        saleId: 1,
        productId: 1,
        quantity: 5,
        date: "2022-07-04T23:45:35.000Z",
      },
      {
        saleId: 1,
        productId: 2,
        quantity: 10,
        date: "2022-07-04T23:45:35.000Z",
      },
      {
        saleId: 2,
        productId: 3,
        quantity: 15,
        date: "2022-07-04T23:45:35.000Z",
      },
    ];
    const mockExpected = mockResponse;
    before(async () => {
      sinon.stub(saleModel, "getAll").resolves(mockResponse);
    });
    after(async () => {
      saleModel.getAll.restore();
    });
    it("Return an array of objects with all sales", async () => {
      const response = await saleService.getAll();
      expect(response).to.eql(mockExpected);
    });
  });

  describe("Get a sale by Id", () => {
    const mockResponseGetAll = [
      {
        saleId: 1,
        productId: 1,
        quantity: 5,
        date: "2022-07-04T23:45:35.000Z",
      },
      {
        saleId: 1,
        productId: 2,
        quantity: 10,
        date: "2022-07-04T23:45:35.000Z",
      },
      {
        saleId: 2,
        productId: 3,
        quantity: 15,
        date: "2022-07-04T23:45:35.000Z",
      },
    ];
    const mockExpected = [
      {
        productId: 1,
        quantity: 5,
        date: "2022-07-04T23:45:35.000Z",
      },
      {
        productId: 2,
        quantity: 10,
        date: "2022-07-04T23:45:35.000Z",
      },
    ];
    before(async () => {
      sinon.stub(saleModel, "getAll").resolves(mockResponseGetAll);
      sinon.stub(saleModel, "getById").resolves(mockExpected);
    });
    after(async () => {
      saleModel.getAll.restore();
      saleModel.getById.restore();
    });
    describe("When the sale id does not exist", () => {
      it("Return an not found exception", async () => {
        try {
          const response = await saleService.getById({ id: 10 });
        } catch (error) {
          expect(error.status).to.be.equal(httpsStatus.NOT_FOUND);
          expect(error.message).to.be.equal("Sale not found");
        }
      });
    });
    describe("When the sale exists", () => {
      it("Return an array with products related to the sale", async () => {
        const response = await saleService.getById({ id: 1 });
        expect(response).to.eql(mockExpected);
      });
    });
  });

  describe("Delete a sale", () => {
    const mockResponseGetAll = [
      {
        saleId: 1,
        productId: 2,
        quantity: 10,
        date: "2022-07-04T23:45:35.000Z",
      },
      {
        saleId: 2,
        productId: 3,
        quantity: 15,
        date: "2022-07-04T23:45:35.000Z",
      },
    ];

    before(async () => {
      sinon.stub(saleModel, "getAll").resolves(mockResponseGetAll);
      sinon.stub(saleModel, "del").resolves(true);
    });
    after(async () => {
      saleModel.getAll.restore();
      saleModel.del.restore();
    });
    describe("When the sale id does not exist", () => {
      it("Return an not found exception", async () => {
        try {
          const response = await saleService.del({ id: 10 });
        } catch (error) {
          expect(error.status).to.be.equal(httpsStatus.NOT_FOUND);
          expect(error.message).to.be.equal("Sale not found");
        }
      });
    });
    describe("When the sale exists", () => {
      it("Return true if the sale was deleted", async () => {
        const response = await saleService.del({ id: 1 });
        expect(response).to.be.equal(true);
      });
    });
  });
});

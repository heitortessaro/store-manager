const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../models/connection");
const saleModel = require('../../../models/saleModel');

describe("ServiceModel - Create a Sale", () => {
  describe("When the SQL query does no work", () => {
    const mockResponseEmpty = [];
    before(async () => {
      sinon.stub(connection, "execute").resolves(mockResponseEmpty);
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
      sinon.stub(connection, "execute").resolves(mockResponse);
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

describe("ServiceModel - Create a SaleProduct", () => {
  describe("When the SQL query does no work", () => {
    const mockInput = { saleId: 1, productId: 1, quantity: 10 };
    const mockResponseEmpty = [];
    before(async () => {
      sinon.stub(connection, "execute").resolves(mockResponseEmpty);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("return exception", async () => {
      try {
        const response = await saleModel.createSaleProduct(mockInput);
      } catch (error) {
        const errorMessage = error.message;
        const errorStatus = error.status;
        expect(errorMessage).to.be.equal("DB Error");
        expect(errorStatus).to.be.equal(500);
      }
    });
  });

  describe("When a row in product_sale is created", async () => {
    const mockInput = { saleId: 1, productId: 1, quantity: 10 };
    const mockResponse = [{ affectedRows: 1 }];
    before(async () => {
      sinon.stub(connection, "execute").resolves([mockResponse]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("Return true", async () => {
      const response = await saleModel.createSaleProduct(mockInput);
      expect(response).to.be.equal(true);
    });
  });
});

describe("ServiceModel - Get all Sales", () => {
  describe("When the SQL query does no work", () => {
    const mockResponseEmpty = [];
    before(async () => {
      sinon.stub(connection, "execute").resolves(mockResponseEmpty);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("return exception", async () => {
      try {
        const response = await saleModel.getAll();
      } catch (error) {
        const errorMessage = error.message;
        const errorStatus = error.status;
        expect(errorMessage).to.be.equal("DB Error");
        expect(errorStatus).to.be.equal(500);
      }
    });
  });

  describe("When sales are found", async () => {
    const mockResponse = [
      {
        saleId: 1,
        productId: 1,
        quantity: 5,
        date: "2022-07-04T20:23:14.000Z",
      },
      {
        saleId: 1,
        productId: 2,
        quantity: 10,
        date: "2022-07-04T20:23:14.000Z",
      },
      {
        saleId: 2,
        productId: 3,
        quantity: 15,
        date: "2022-07-04T20:23:14.000Z",
      },
    ];
    const expectedResponse = mockResponse;
    before(async () => {
      sinon.stub(connection, "execute").resolves([mockResponse]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("Return an array", async () => {
      const response = await saleModel.getAll();
      expect(response).to.be.an("array");
    });
    it('The first object has "saleId", "productId", "quantity", and "date" properties', async () => {
      const response = await saleModel.getAll();
      expect(response[0]).to.include.all.keys(
        "saleId",
        "productId",
        "quantity",
        "date"
      );
    });
    it("The response is the expected", async () => {
      const response = await saleModel.getAll();
      expect(response).to.eql(expectedResponse);
    });
  });
});

describe("ServiceModel - Get a sale using its Id", () => {
  describe("When the SQL query does no work", () => {
    const mockInput = { id: 1 };
    const mockResponseEmpty = [];
    before(async () => {
      sinon.stub(connection, "execute").resolves(mockResponseEmpty);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("return exception", async () => {
      try {
        const response = await saleModel.getById(mockInput);
      } catch (error) {
        const errorMessage = error.message;
        const errorStatus = error.status;
        expect(errorMessage).to.be.equal("DB Error");
        expect(errorStatus).to.be.equal(500);
      }
    });
  });

  describe("When the sale is found", async () => {
    const mockInput = { id: 1 };
    const mockResponse = [
      {
        productId: 1,
        quantity: 5,
        date: "2022-07-04T20:23:14.000Z",
      },
      {
        productId: 2,
        quantity: 10,
        date: "2022-07-04T20:23:14.000Z",
      },
    ];
    const expectedResponse = mockResponse;
    before(async () => {
      sinon.stub(connection, "execute").resolves([mockResponse]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("Return an array", async () => {
      const response = await saleModel.getById(mockInput);
      expect(response).to.be.an("array");
    });
    it('The first object has "productId", "quantity", and "date" properties', async () => {
      const response = await saleModel.getById(mockInput);
      expect(response[0]).to.include.all.keys(
        "productId",
        "quantity",
        "date"
      );
    });
    it("The response is the expected", async () => {
      const response = await saleModel.getById(mockInput);
      expect(response).to.eql(expectedResponse);
    });
  });
});

describe("ServiceModel - Delete a Sale", () => {
  describe("When the SQL query does no work", () => {
    const mockResponseEmpty = [];
    const mokeInput = { id: 1 };
    before(async () => {
      sinon.stub(connection, "execute").resolves(mockResponseEmpty);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("return exception", async () => {
      try {
        const response = await saleModel.del(mokeInput);
      } catch (error) {
        const errorMessage = error.message;
        const errorStatus = error.status;
        expect(errorMessage).to.be.equal("DB Error");
        expect(errorStatus).to.be.equal(500);
      }
    });
  });

  describe("When the sale is deleted", async () => {
    const mockResponseEmpty = [{ affectedRows: 1 }];
    const mokeInput = { id: 1 };
    before(async () => {
      sinon.stub(connection, "execute").resolves([mockResponseEmpty]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("Return true", async () => {
      const response = await saleModel.del(mokeInput);
      expect(response).to.be.equal(true);
    });
  });
});

describe("ServiceModel - Delete a Sale_Product row", () => {
  describe("When the SQL query does no work", () => {
    const mockResponseEmpty = [];
    const mokeInput = { id: 1 };
    before(async () => {
      sinon.stub(connection, "execute").resolves(mockResponseEmpty);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("return exception", async () => {
      try {
        const response = await saleModel.delSaleProduct(mokeInput);
      } catch (error) {
        const errorMessage = error.message;
        const errorStatus = error.status;
        expect(errorMessage).to.be.equal("DB Error");
        expect(errorStatus).to.be.equal(500);
      }
    });
  });

  describe("When the sale_product row is deleted", async () => {
    const mockResponseEmpty = [{ affectedRows: 1 }];
    const mokeInput = { id: 1 };
    before(async () => {
      sinon.stub(connection, "execute").resolves([mockResponseEmpty]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("Return true", async () => {
      const response = await saleModel.delSaleProduct(mokeInput);
      expect(response).to.be.equal(true);
    });
  });
});

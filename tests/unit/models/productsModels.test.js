const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../models/connection");
const productModel = require("../../../models/productModel");

describe("ProducModel - Get all products from the db", () => {
  describe("When not product is found", () => {
    const mockProductsEmpty = [];
    before(async () => {
      sinon.stub(connection, "execute").resolves(mockProductsEmpty);
    });
    after(async () => {
      connection.execute.restore();
    });

    it("return false", async () => {
      const response = await productModel.getAll();
      expect(response).to.be.equal(false);
    });
  });

  describe("When products exist", async () => {
    const mockProductsFull = [
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
      sinon.stub(connection, "execute").resolves([mockProductsFull]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it("Return an array", async () => {
      const response = await productModel.getAll();
      expect(response).to.be.a("array");
    });
    it('The object has "id" and "name" properties', async () => {
      const response = await productModel.getAll();
      expect(response[0]).to.include.all.keys("id", "name");
    });
    it("The array is the expected", async () => {
      const response = await productModel.getAll();
      expect(response).to.eql(mockProductsFull);
    });
  });
});

describe("ProducModel - Search by a product using ID", () => {
  describe("When a product with the supplied id does not exist", () => {
    const mockProductIdEmpty = [];
    before(async () => {
      sinon.stub(connection, "execute").resolves(mockProductIdEmpty);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("return false", async () => {
      const response = await productModel.getById();
      expect(response).to.be.equal(false);
    });
  });

  describe("When a product with the supplied Id exists", async () => {
    const mockProductId = [
      {
        id: 1,
        name: "Martelo de Thor",
      },
    ];
    before(async () => {
      sinon.stub(connection, "execute").resolves([mockProductId]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("Return an object", async () => {
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
  });
});

describe("ProducModel - Create a Product", () => {
  describe("When the SQL query does no work", () => {
    const mockProductIdEmpty = [];
    const newProduct = {name: 'Product Name Test'}
    before(async () => {
      sinon.stub(connection, "execute").resolves(mockProductIdEmpty);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("return false", async () => {
      const response = await productModel.create(newProduct);
      expect(response).to.be.equal(false);
    });
  });

  describe("When a product is created", async () => {
    const name = "Product Name Test";
    const id = 1;
    const mockResponse = { insertId, name };
    const mockProductId = [{ insertId: id }];
    before(async () => {
      sinon.stub(connection, "execute").resolves([mockProductId]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("Return an object", async () => {
      const response = await productModel.create({ name });
      expect(response).to.be.an("object");
    });
    it("The object is not empty", async () => {
      const response = await productModel.create({ name });
      expect(response).to.be.not.empty;
    });
    it('The object has "id" and "name" properties', async () => {
      const response = await productModel.create({ name });
      expect(response).to.include.all.keys("id", "name");
    });
    it("The object is the expected", async () => {
      const response = await productModel.create({ name });
      expect(response).to.eql(mockResponse);
    });
  });
});

describe("ProducModel - Update a Product", () => {
  describe("When the SQL query does no work", () => {
    const mockProductIdEmpty = [];
    const updateProduct = { id: 1, name: "Product Name Test" };
    before(async () => {
      sinon.stub(connection, "execute").resolves(mockProductIdEmpty);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("return exception", async () => {
      try {
        const response = await productModel.update(updateProduct);  
      } catch (error) {
        const errorMessage = error.message; 
        const errorStatus = error.status;
        expect(errorMessage).to.be.equal("DB Error");
        expect(errorStatus).to.be.equal(500);
      }
    });
  });

  describe("When the product is updated", async () => {
    const name = "Product Name Test";
    const id = 1;
    const updateProduct = { id, name };
    const mockResponse = updateProduct;
    const mockProductId = [{ affectedRows: 1 }];
    before(async () => {
      sinon.stub(connection, "execute").resolves([mockProductId]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("Return an object", async () => {
      const response = await productModel.update(updateProduct);
      expect(response).to.be.an("object");
    });
    it("The object is not empty", async () => {
      const response = await productModel.update(updateProduct);
      expect(response).to.be.not.empty;
    });
    it('The object has "id" and "name" properties', async () => {
      const response = await productModel.update(updateProduct);
      expect(response).to.include.all.keys("id", "name");
    });
    it("The object is the expected", async () => {
      const response = await productModel.update(updateProduct);
      expect(response).to.eql(mockResponse);
    });
  });
});

describe("ProducModel - Delete a Product", () => {
  describe("When the SQL query does no work", () => {
    const mockProductIdEmpty = [];
    const updateProduct = { id: 1 };
    before(async () => {
      sinon.stub(connection, "execute").resolves(mockProductIdEmpty);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("return exception", async () => {
      try {
        const response = await productModel.del(updateProduct);
      } catch (error) {
        const errorMessage = error.message;
        const errorStatus = error.status;
        expect(errorMessage).to.be.equal("DB Error");
        expect(errorStatus).to.be.equal(500);
      }
    });
  });

  describe("When the product is deleted", async () => {
    const id = 1;
    const deleteProduct = { id };
    const mockProductId = [{ affectedRows: 1 }];
    before(async () => {
      sinon.stub(connection, "execute").resolves([mockProductId]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("Return true", async () => {
      const response = await productModel.del(deleteProduct);
      expect(response).to.be.equal(true);
    });
  });
});


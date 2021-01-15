const fs = require('fs');
const path = require('path');
const { jsontodb } = require('../utils/jsonToDb');

const {
  folders: { UPLOAD },
} = require('../config');

const db = require('../db');

const { User } = require('../db/sequelize/models/user');

async function findUser(query) {
  try {
    const user = await User.findOne({
      where: {
        username: query.username,
        password: query.password,
        token: query.token,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createToken(query, token) {
  try {
    await User.update(
      {
        token,
      },
      {
        where: {
          id: query.username,
        },
      },
    );

    return 'Token has been saved!';
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createProduct(body) {
  try {
    const product = await db.createProduct({
      type: body.type,
      color: body.color,
      price: body.price,
      quantity: body.quantity,
    });

    return {
      product,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateProduct(body, product) {
  try {
    const updatedProduct = await db.updateProduct({
      id: product.id,
      type: body.type,
      color: body.color,
      quantity: body.quantity,
      price: body.quantity,
    });

    return updatedProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteProduct(product) {
  try {
    await db.deleteProduct(product.id);

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getProduct(product) {
  try {
    const products = await db.getProduct(product.id);

    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fromJSONtoDB(req, res) {
  const filename = path.basename(req.url);
  try {
    await fs.promises.access(path.resolve(UPLOAD, filename));
    console.log('\nWaiting-jsontodb-\n');
    jsontodb(filename);
    res.status(200).json({ message: '200 OK' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '500 Internal Server Error' });
  }
}

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  fromJSONtoDB,
  createToken,
  findUser,
};

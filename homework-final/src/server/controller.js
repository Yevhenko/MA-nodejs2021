const fs = require('fs');
const path = require('path');
const { jsontodb } = require('../utils/jsonToDb');

const {
  folders: { UPLOAD },
} = require('../config');

// const db = require('../db');

const { User, Order, OrderProduct } = require('../db/models');

async function findUser(body) {
  try {
    const user = await User.findOne({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) throw new Error('user not found');
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createToken(body, token) {
  try {
    await User.update(
      {
        token,
      },
      {
        where: {
          username: body.username,
        },
      },
    );

    return 'Token has been saved!';
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// async function createProduct(body) {
//   try {
//     const product = await db.createProduct({
//       type: body.type,
//       color: body.color,
//       price: body.price,
//       quantity: body.quantity,
//       weight: body.weight,
//     });

//     return {
//       product,
//     };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// async function updateProduct(body, product) {
//   try {
//     const updatedProduct = await db.updateProduct({
//       id: product.id,
//       type: body.type,
//       color: body.color,
//       quantity: body.quantity,
//       price: body.quantity,
//       weight: body.weight,
//     });

//     return updatedProduct;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// async function deleteProduct(product) {
//   try {
//     await db.deleteProduct(product.id);

//     return true;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// async function getProduct(product) {
//   try {
//     const products = await db.getProduct(product.id);

//     return products;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

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

async function createOrder(body) {
  try {
    const order = await Order.create({
      status: 'processing',
      price: body.price,
      quantity: body.quantity,
      productId: body.productId,
      userId: body.userId,
    });

    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function processedOrder(body, query) {
  try {
    await Order.update(
      {
        status: 'processed',
        price: body.price,
        quantity: body.quantity,
        productId: body.productId,
        userId: body.userId,
      },
      {
        where: {
          id: query.id,
        },
      },
    );

    return Order.findOne({
      where: {
        id: query.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deletedOrder(body, query) {
  try {
    await Order.update(
      {
        status: 'cancelled',
        price: body.price,
        quantity: body.quantity,
        productId: body.productId,
        userId: body.userId,
      },
      {
        where: {
          id: query.id,
        },
      },
    );

    return Order.findOne({
      where: {
        id: query.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateOrder(body, query) {
  try {
    await Order.update(
      {
        status: body.status,
        price: body.price,
        quantity: body.quantity,
        productId: body.productId,
        userId: body.userId,
      },
      {
        where: {
          id: query.id,
        },
      },
    );

    return 'order updated';
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createOrderProduct(body) {
  try {
    const orderProduct = await OrderProduct.create({
      orderId: body.orderId,
      productId: body.productId,
    });

    return orderProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteOrderProduct(query) {
  try {
    await OrderProduct.destroy({
      where: {
        id: query.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createOrderProduct,
  deleteOrderProduct,
  updateOrder,
  // createProduct,
  // getProduct,
  // updateProduct,
  // deleteProduct,
  // fromJSONtoDB,
  createToken,
  findUser,
  createOrder,
  deletedOrder,
  processedOrder,
};

const axios = require('axios');

// eslint-disable-next-line object-curly-newline
const { User, Order, Product, OrderProduct } = require('../db/models');

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

async function createOrderProduct(body) {
  try {
    await OrderProduct.create({
      orderId: body.orderId,
      productId: body.productId,
    });

    return 'orderProduct created';
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteOrderProduct(query) {
  try {
    await OrderProduct.destroy({
      where: { id: query.id },
    });

    return 'orderProduct deleted';
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createOrder(body) {
  try {
    const product = await Product.findOne({
      where: { id: body.productId },
    });

    const order = await Order.create({
      status: 'processing',
      price: product.price * body.quantity,
      quantity: body.quantity,
      productId: body.productId,
      userId: body.userId,
    });

    if (product.quantity < body.quantity) {
      throw new Error('sorry, we have no products more');
    } else {
      await Product.update(
        {
          quantity: product.quantity - body.quantity,
        },
        { where: { id: body.productId } },
      );

      return order;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateOrder(body, query) {
  try {
    await Order.update(
      {
        price: body.price,
        quantity: body.quantity,
        productId: body.productId,
        userId: body.userId,
      },

      { where: { id: query.id } },
    );

    return 'order is updated';
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

      { where: { id: query.id } },
    );

    return 'order is processed';
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deletedOrder(body, query) {
  try {
    const product = await Product.findOne({
      where: { id: body.productId },
    });
    await Order.update(
      {
        status: 'cancelled',
        price: body.price,
        quantity: body.quantity,
        productId: body.productId,
        userId: body.userId,
      },

      { where: { id: query.id } },
    );

    await Product.update(
      {
        quantity: body.quantity + product.quantity,
      },
      { where: { id: body.productId } },
    );

    return 'order is cancelled';
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getPrice(query) {
  try {
    const order = await Order.findOne({
      where: { id: query.id },
    });

    const product = await Product.findOne({
      where: { id: order.productId },
    });

    const config = {
      method: 'GET',
      url: 'https://api.novaposhta.ua/v2.0/json',
      headers: {
        'Content-type': 'string',
      },
      data: {
        modelName: 'InternetDocument',
        calledMethod: 'getDocumentPrice',
        methodProperties: {
          CitySender: query.sender,
          CityRecipient: query.recipient,
          Weight: product.weight,
          ServiceType: 'DoorsDoors',
          Cost: order.price,
          CargoType: 'Cargo',
          SeatsAmount: order.quantity,
        },
        apiKey: '73e52b91cf0845dbf5280fa5b1ed4e8e',
      },
    };

    const price = await axios(config);

    return price.data.data[0].Cost;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getPrice,
  createToken,
  findUser,
  createOrder,
  updateOrder,
  processedOrder,
  deletedOrder,
  createOrderProduct,
  deleteOrderProduct,
};

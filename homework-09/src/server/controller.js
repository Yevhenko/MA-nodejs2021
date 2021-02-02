const { User } = require('../db/models');

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

module.exports = {
  createToken,
  findUser,
};

function generateDiscount(callback) {
  setTimeout(() => {
    const discount = Math.floor(Math.random() * 99) + 1;
    if (discount > 20) {
      console.error('Error!');
    } else {
      console.log(discount);
    }
    callback(null, discount);
  }, 50);
}

generateDiscount((err, result) => {
  if (err) throw new Error();
  return result;
});

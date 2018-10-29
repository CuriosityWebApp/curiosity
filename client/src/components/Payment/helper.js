function usdToCredit(value) {
  let usd = Number(value);
  let credits = null;
  let holder;

  if (usd >= 100) {
    holder = Math.floor(usd / 100);
    credits += holder * 14000;
    usd -= holder * 100;
  }

  if (usd >= 50) {
    holder = Math.floor(usd / 50);
    credits += holder * 6500;
    usd -= holder * 50;
  }

  if (usd >= 20) {
    holder = Math.floor(usd / 20);
    credits += holder * 2450;
    usd -= holder * 20;
  }

  if (usd >= 10) {
    holder = Math.floor(usd / 10);
    credits += holder * 1150;
    usd -= holder * 10;
  }

  if (usd >= 5) {
    holder = Math.floor(usd / 5);
    credits += holder * 550;
    usd -= holder * 5;
  }

  if (usd <= 4 && usd > 0) {
    holder = Math.floor(usd / 1);
    credits += holder * 100;
    usd -= holder;
  }

  return credits;
}

module.exports = { usdToCredit };

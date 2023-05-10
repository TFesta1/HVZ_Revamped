let productCount = 0;

function handleEvent() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      productCount++;
      resolve(true);
    }, 1000);
  }).then(() => ({
    productCount,
  }));
}

export default handleEvent;

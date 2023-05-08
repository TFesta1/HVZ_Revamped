let productCount = 0;

export default async () => {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            productCount++;
            resolve(true)
        }, 1000)
    });
    return {
        productCount,
    }
}
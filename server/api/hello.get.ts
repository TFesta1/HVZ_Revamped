const port = process.env.PORT || 3000;



export default defineEventHandler((event) => {
    // console.log(event)
    return {
      port: port
    }
})
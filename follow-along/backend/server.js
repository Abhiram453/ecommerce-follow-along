let app =require('./app');
const connection = require('./db/connection');



app.listen(8080,async()=>{
    try {
        await connection
        console.log('Server is running on http://localhost:8080'); 
    } catch (error) {
        console.log('Error: ',error)
    }
    
})
let app =require('./app');
const connection = require('./db/connection');



app.listen(4534,async()=>{
    try {
        await connection
        console.log('Server is running on http://localhost:4534'); 
    } catch (error) {
        console.log('Error: ',error)
    }
    
})
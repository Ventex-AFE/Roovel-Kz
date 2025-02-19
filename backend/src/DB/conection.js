const mysql=require('mysql2');
const config=require('./config');

const datapermise={
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

const conection = mysql.createPool(datapermise);
// Verificar la conexión
conection.getConnection((err, connection) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
    connection.release();
});
module.exports=conection.promise();
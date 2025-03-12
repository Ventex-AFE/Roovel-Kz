const mysql = require("mysql2");
const conection = require('./conection');

async function getMessages(idReciveMessague, idSentMessage) {
    try {
        const [rows] = await conection.execute('SELECT * FROM Chat WHERE UserReciveMenssage_Chat = ? AND UserSentMenssge_Chat = ?', [idReciveMessague, idSentMessage]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getMessages };
const fs = require('fs');

const archivoPath = './db/data.json';

const guardarDB = (data) => {
    fs.writeFileSync(archivoPath, JSON.stringify(data)); 
}

const leerDB = () => {
    if(!fs.existsSync(archivoPath)) return null;

    const info = fs.readFileSync(archivoPath, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data;
}

module.exports = {
    guardarDB,
    leerDB
}
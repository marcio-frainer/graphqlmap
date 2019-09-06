/**
 *
 *
 *
*/

const Sequelize = require('sequelize');

exports.Config = function(config, strut) {

    let seq = new Sequelize(config.alias, config.username, config.password, {
        host: config.host,
        dialect: "mssql",
        port: config.port,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

    // const con = `mssql://${config.username}:${config.host}/${config.alias}`;
    // console.log(con);
    // let seq = new Sequelize(con);

    seq
        .authenticate()
        .then( () => {
            console.log("Connect Ok");
        })
        .catch( (e) => {
            console.error(`Connection error: ${e}`)
        });
}
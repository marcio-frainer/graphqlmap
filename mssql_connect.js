/**
 *
 *
 *
*/

const Sequelize = require('sequelize');

exports.Config = function(config, strut) {

    const seq = new Sequelize(config.alias, config.username, config.password, {
        host: config.host,
        dialect: "mssql"
    });

    seq
        .authenticate()
        .then( () => {
            console.log("Connect Ok");
        })
        .catch(() => {
            console.error("Connection error")
        });
}
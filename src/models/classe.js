module.exports = (sequelize, dataTypes) => {
    const Classe = sequelize.define('classe', {
        cdclasse: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        declasse: dataTypes.STRING
    });

    return Classe;
}
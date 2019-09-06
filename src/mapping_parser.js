/**
 *
 *
 *
*/

const getType = (type, dataTypes) => {
    switch (type) {
        case 'STRING':
            return dataTypes.STRING;
            break;
        case 'INTEGER':
            return dataTypes.INTEGER;
            break;
        default:
            return dataTypes.STRING;
    }
};

exports.MappingParser = function(sequelize, dataTypes, maps) {
    let struc = new Object();

    maps.fields.map((item) => {
        let obj = new Object();
        Object.defineProperty(obj, "type", {
            value: this.getType(item.type, dataTypes)
        });
        if (item.primarykey) {
            Object.defineProperty(obj, "primaryKey", {
                value: true
            });
        };
        Object.defineProperty(struc, item.name, obj);
    })

    let entity = sequelize.define(maps.model, struc);
};


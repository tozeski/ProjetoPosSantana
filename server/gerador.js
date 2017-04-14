var faker = require('faker');

function gerar(n) {
    var lista = [];
    for (var i = 0; i < n; i++) {
        lista.push({
            id: i,
            checked: false,
            title: faker.lorem.sentence(3)
        });
    }
    return lista;
}

module.exports = function () {
    return { carros: gerar(20) }
}
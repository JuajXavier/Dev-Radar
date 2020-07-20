module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim()); // split = separar os termos no array, map = percorrer os elementos do array e atribuir uma função a eles (geralmente arrow), trim = remover os espaços.
}
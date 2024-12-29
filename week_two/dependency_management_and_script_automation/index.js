var _ = require("lodash");

const array_1 = [1, 2, 3, 4, 5, 6, 5];
const array_3 = [14, 2, 33, 4, 52, 6, 5];
const array_2 = [5, null, 4, undefined, 0, 5];
const duplicate_array = [1, 2, 3, 4, 5, 6, 5, 1, 2, 3, 4, 5, 6, 5];
const nested_array = [[1, 2, [45, [3, 6]]], [3, 4], [5, 6, [5, 3]], [5]];

const array_chunked = _.chunk(array_1, 2); // => [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 5 ] ]
const array_compact = _.compact(array_2); // => [ 5, 4, 5 ]
const array_difference = _.difference(array_1, array_3); // => [ 1, 3 ]
const unique_array = _.uniq(duplicate_array); // => [ 1, 2, 3, 4, 5, 6 ]
const flatten_array = _.flatten(nested_array); // => [ 1, 2, 3, 4, 5, 6, 5, 3 ] only one level deep
const flatten_deep_array = _.flattenDeep(nested_array); // => [ 1, 2, 45, 3, 6, 3, 4, 5, 6, 5, 3, 5 ]
console.log(array_chunked);
console.log("compact", array_compact);
console.log(array_difference);
console.log(unique_array);
console.log("flatten", flatten_array);
console.log("flatten deep", flatten_deep_array);

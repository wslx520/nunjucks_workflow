import dataConfig from './dataConfig'

const obj = {
    gender: 'Male'
}
console.log(Object.assign(dataConfig, obj));

import('./asyncPart').then((data) => {
    console.log(data);
});

import(/* webpackChunkName: 'sum' */'../sum/sum').then(fn => {
    return fn(1,2,3);
})
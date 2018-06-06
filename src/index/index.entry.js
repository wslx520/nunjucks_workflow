import dataConfig from './dataConfig'

const obj = {
    gender: 'Male'
}
console.log(Object.assign(dataConfig, obj));

import('./asyncPart').then((data) => {
    console.log(data);
})
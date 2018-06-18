// import dataConfig from './dataConfig'

// 载入模板页面
import './index.njk';
// 载入 css
import './index.scss';
const obj = {
    gender: 'Male'
}
// console.log(Object.assign(dataConfig, obj));

// import('./asyncPart').then((data) => {
//     console.log(data);
// });

import(/* webpackChunkName: 'sum' */'../sum/sum').then(res => {
    if (res['default']) {
        var fn = res.default;
        return fn(1,2,3);
    }
    if (res.html) {
        console.log(res.html);
    }
})
# nunjucks 工作流

nunjucks + gulp 实现自动编译模板

使用 gulp-watch 解决新建文件不触发编译的问题
使用 gulp-plumber 防止编译过程中出错导致gulp进程中断
使用 gulp-data 来获取编译模板的数据来源



## 制定了一个简单的 模板-数据 规则：

- _*.tpl 是碎片文件，不打包成html
- *.tpl 是会最终打包成html的
- *.data.js 是同名 tpl 的数据文件

数据文件支持以下数据格式

- 直接导出一个 Object/Array
- 导出为 promise
- 导出一个函数，函数执行完成后返回上述数据格式


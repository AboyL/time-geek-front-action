const seq = require('./seq')

require('./model/index');

console.log('初始化同步操作');
// 测试连接
(async () => {
    try {
        await seq.authenticate();
        console.log('auth ok')
        // 执行同步
        seq.sync({
            alter:true
        }).then(() => {
            console.log('sync ok')
            process.exit()
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()


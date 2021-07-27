const webpack = require('webpack').default
const fs = require('fs-extra')
const path = require('path')
const getComponent = (req, res) => {
  const { text } = req.body
  const webpackConfig = require('../plugins/webpack-config');
  const compiler = webpack(webpackConfig);
  // 写入到代码中
  fs.outputFileSync(path.join(__dirname, '../plugins/src/index.jsx'), text, {
    encoding: 'utf-8'
  })
  compiler.run((err, stat) => {
    res.json({
      hash: stat.hash
    })
  })

}

export default {
  'POST /_api/test': getComponent
}
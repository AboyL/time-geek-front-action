const express = require('express');
const fs = require('fs');
const path = require('path');
const { winPath } = require('@umijs/utils')

module.exports = function (api) {
  api.describe({
    id: 'test',
    key: 'test',
    config: {
      default: [],
      schema (joi) {
        return joi.array();
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
    // enableBy: api.EnableBy.config,
  });
  // 处理package中的内容
  const rootDistDir = winPath(path.join(api.cwd, 'dist'));
  if (fs.existsSync(rootDistDir)) {
    api.addMiddlewares({
      name: 'static-dist',
      // @ts-ignore
      fn: (service) => {
        return express.static(rootDistDir)
      },
    });
    api.addEntryCode(() => {
      return `console.log('works!')`;
    });
  }
}

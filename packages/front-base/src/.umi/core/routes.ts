// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/lijunfeng/Desktop/learn/fe-action/time-geek-front-action/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.tsx').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index.tsx').default
      },
      {
        "path": "/monaco-editor",
        "exact": true,
        "component": require('@/pages/monaco-editor/index.tsx').default
      },
      {
        "path": "/read-image",
        "exact": true,
        "component": require('@/pages/read-image/index.tsx').default
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}

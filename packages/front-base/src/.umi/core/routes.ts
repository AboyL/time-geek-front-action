// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/lijunfeng/Desktop/learn/fe-action/time-geek-front-action/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/read-image",
    "exact": true,
    "component": require('@/pages/read-image/index.tsx').default
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

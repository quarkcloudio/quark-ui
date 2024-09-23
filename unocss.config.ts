// unocss.config.ts

import {defineConfig, presetAttributify, presetUno} from 'unocss';

export function createConfig({strict = true, dev = true} = {}) {
  return defineConfig({
    rules: [
      [/^line-(\d+)$/, ([, d]) => ({
        'overflow': 'hidden', //溢出内容隐藏
        'text-overflow': 'ellipsis', //文本溢出部分用省略号表示
        'display': '-webkit-box', //特别显示模式
        '-webkit-line-clamp': d, //行数
        'line-clamp': d,
        '-webkit-box-orient': 'vertical', //盒子中内容竖直排列
      })],
    ],
    envMode: dev ? 'dev' : 'build', presets: [presetAttributify({strict}), presetUno()],
  });
}

export default createConfig();
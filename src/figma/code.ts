import { HandleSolidColor } from '@util/style';
import { GetColorNamesObj, HandleName } from '@/util/util';
import { HandleFont } from '@/util/font';

interface CssDataInterface {
  cssName: string;
  scssName: string;
  lessName: string;
  type: string;
  style: StyleCodeData;
}

interface StyleCodeData {
  hex: string;
  hexa: string;
  rgba: string;
  hsla: string;
}

figma.showUI(__html__, {
  width: 400,
  height: 500,
});

// 本地颜色
const localColors = figma.getLocalPaintStyles();
// 文字样式
const localFonts = figma.getLocalTextStyles();

// 处理纯颜色
const colors = localColors
  .map((v) => {
    const paints = v.paints;
    return paints.map((paint, i) => {
      const result: CssDataInterface = {
        type: paint.type,
        ...(paints.length > 1 ? GetColorNamesObj(v.name + i) : GetColorNamesObj(v.name)),
        style: handleStyle(paint),
      };
      return result;
    });
  })
  .flat();

/**
 * 处理样式
 * @param fill
 */
function handleStyle(paint: Paint): StyleCodeData {
  switch (paint.type) {
    case 'SOLID':
      return HandleSolidColor(paint);
    default:
      return { rgba: '', hex: '', hexa: '', hsla: '' };
  }
}

function getStyleCode(css, code: 'rgba' | 'hex' | 'hexa' | 'hsla') {
  const result = colors
    .filter((v) => v.style[code])
    .map((v) => {
      return `${css === 'css' ? '  ' : ''}${v[css + 'Name']} : ${v.style[code]} ;`;
    })
    .join(' \n');
  return css === 'css' ? `:root {\n${result}\n}` : result;
}

// 获取字体
function getFontsCode(css) {
  return localFonts
    .map((v) => {
      console.log('object :>> ', v);
      const name = HandleName(v.name);
      switch (css) {
        case 'css':
          return `.${name} {${HandleFont(v)}}`;
        case 'less':
          return `.${name}() {${HandleFont(v)}}`;
        case 'scss':
          return `@mixin ${name} {${HandleFont(v)}}`;
      }
    })
    .join('\n');
}

function getCode(css, code) {
  return '\n/** fonts **/\n' + getFontsCode(css) + '\n\n/** colors **/\n' + getStyleCode(css, code);
}

figma.ui.postMessage({
  type: 'code:preview-code',
  code: getCode('css', 'rgba'),
});

figma.ui.onmessage = async (msg) => {
  // 预览代码
  if (msg.type === 'ui:preview-code') {
    const css = msg.css;
    const code = msg.code;
    // figma.ui.postMessage({ type: 'code:preview-code' });
    figma.ui.postMessage({
      type: 'code:preview-code',
      code: getCode(css, code),
    });
  }
};

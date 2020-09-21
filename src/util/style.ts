import { ToFixed } from './util';
import Color from 'color';
/**
 * 获取颜色
 * @param color rgba对象
 */
export function GetColor(color: RGBA) {
  return Color(GetRGBAObj(color));
}

/**
 * 获取rgba
 * @param color 颜色
 * @param opacity 透明度
 */
export function GetRGBAObj(color: RGB | RGBA) {
  return {
    r: ToFixed(color.r * 255),
    g: ToFixed(color.g * 255),
    b: ToFixed(color.b * 255),
    alpha: ToFixed((color as RGBA).a || 1, 2),
  };
}
export const GetCSSRGBA = (color: RGBA) => `rgba(${Object.values(GetRGBAObj(color)).join(', ')})`;

export const GetCSSHex = (color: RGBA) => GetColor(color).hex();

export const GetCSSHexa = (color: RGBA) => {
  const alpha = GetColor(color).alpha();
  const hexAlpha = ('0' + ToFixed(alpha * 256).toString(16)).slice(-2).toUpperCase();
  return GetCSSHex(color) + hexAlpha;
};
/**
 * 获取hsla css
 * @param color
 */
export const GetCSSHSLA = (color: RGBA) => {
  const hsl = GetColor(color).hsl().string();
  const hsla = hsl
    .split(',')
    .map((v, i) => {
      const temp = v.split('(');
      return i === 0 ? temp[0] + '(' + ToFixed(Number(temp[1])) : v;
    })
    .join(',');
  return hsla;
};
/**
 * 处理纯色
 * @param fill
 * @param opacity
 */
export function HandleSolidColor(fill: SolidPaint) {
  const rgba: RGBA = { ...fill.color, a: fill.opacity as number };

  return {
    rgba: GetCSSRGBA(rgba),
    hex: GetCSSHex(rgba),
    hexa: GetCSSHexa(rgba),
    hsla: GetCSSHSLA(rgba),
  };
}

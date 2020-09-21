/**
 * 获取字体属性
 * @param text
 */
export function HandleFont(text: TextStyle) {
  const width = {
    Light: 'light',
    Regular: 'normal',
    Bold: 'bold',
    ExtraBold: 'bolder',
    SemiBold: 'bolder',
  };

  let result = `\n  font-size: ${text.fontSize}px;\n  font-family: "${text.fontName.family}" ;\n`;
  
  width[text.fontName.style] && (result += `  font-weight:${width[text.fontName.style]} ;\n`);
  // 删除线
  if (text.textDecoration === 'STRIKETHROUGH') result += '  text-decoration:line-through ;\n';
  if (text.textDecoration === 'UNDERLINE') result += '  text-decoration:underline ;\n';
  return result;
}

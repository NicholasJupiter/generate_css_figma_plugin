/**
 * 处理前后空格
 * @param str
 */
export function Trim(str: string): string {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * 取小数点两位
 * @param num
 * @param length 长度
 */
export function ToFixed(num: number, length = 0): number {
  return Number(num.toFixed(length)) || 0;
}

/**
 * 获取名称
 * @param name
 */
export function GetColorNamesObj(name: string) {
  name = HandleName(name);
  return {
    cssName: '--color-' + name,
    scssName: '$color-' + name,
    lessName: '@color-' + name,
  };
}
/**
 * 处理名字
 * @param name
 */
export function HandleName(name: string) {
  // 去除前面后空格
  name = Trim(name)
    .replace(/[^a-zA-Z0-9-\s]/g, '') // 去除中间特殊字符 只保留 数字 英文  -
    .replace(/^\d+/, '') // 去除前面数字
    .replace(/\s+/g, '-') // 中间空格换成_
    .toLowerCase();
  return name;
}
/**
 * 下载文件
 * @param fileName 文件名称
 * @param content 内容
 */
export function DownloadFileHelper(fileName: string, content: string) {
  const aTag = document.createElement('a');
  const blob = new Blob([content]);

  aTag.download = fileName;
  aTag.href = URL.createObjectURL(blob);
  aTag.style.display = 'none';
  document.body.appendChild(aTag);
  aTag.click();

  setTimeout(() => {
    document.body.removeChild(aTag);
    window.URL.revokeObjectURL(String(blob));
  }, 100);
}

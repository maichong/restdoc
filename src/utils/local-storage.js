// @flow

/**
 * 本地缓存
 * @param key string //缓存关键字
 * @param value string //缓存值
 */
export function setLocalStorage(key: string, value: Array<string>) {
  window.localStorage.setItem(key, value);
}

/** cr
 * 获取本地缓存
 * @param key string //缓存关键字
 */
export function getLocalStorage(key: string): string {
  return window.localStorage.getItem(key);
}

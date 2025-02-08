// Description: 服务器端的工具函数。
import * as fs from 'fs'
import * as path from 'path';
const BASE_URL = 'https://your-data-api.com'; // 请替换为实际数据 API

/**
 * 获取上年度的起始和结束日期。
 * @returns {object} - 包含 `start` 和 `end` 日期的对象。
 */
export function getLastYearDates() {
  const now = new Date();
  const end = now.toISOString().split('T')[0];
  now.setFullYear(now.getFullYear() - 1);
  const start = now.toISOString().split('T')[0];
  return { start, end };
}

/**
 * 将对象转换为字符串，排除指定的键。
 * @param {object} obj - 要转换的对象。
 * @param {string[]} excludeKeys - 要排除的键。
 * @returns {string} - 转换后的字符串。
 */
export function objectToString(obj, excludeKeys = []) {
    return Object.entries(obj)
      .filter(([key]) => !excludeKeys.includes(key))
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }
  
  
/**
 * 从本地 JSON 文件读取数据。
 * @param {string} fileName - JSON 文件名。
 * @returns {any} - 读取的数据。
 */
export function readLocalJson(fileName) {
    const filePath = path.join(__dirname, '../data', fileName);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  
  

  /**
  * 从指定的端点获取数据。
  * @param {string} endpoint - API 端点。
  * @param {object} params - 查询参数。
  * @param {any} defaultValue - 请求失败时的默认值。
  * @returns {Promise<any>} - 获取的数据或默认值。
  */
  export async function fetchData(endpoint, params = {}, defaultValue = null) {
   try {
     const response = await fetch(`${BASE_URL}${endpoint}`, { params })
     return await response.json() || defaultValue;
   } catch (error) {
     console.error(`Error fetching data from ${endpoint}:`, error.message);
     return defaultValue;
   }
 }
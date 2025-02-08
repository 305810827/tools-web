import {resolve} from 'path'
import {readLocalJson, fetchData, getLastYearDates, objectToString} from '../../utils/stockUtils'
// @ts-ignore

/**
 * 获取股票数据，包括历史价格、财务信息、MDA 和主营业务信息。
 * @param {string} ticker - 股票代码。
 * @returns {Promise<object>} - 包含所有获取的数据的对象。
 */
async function fetchStockData(ticker: string) {
    try {
      const dates = getLastYearDates();
      const [historicalData, financialData, mdaData, businessData] = await Promise.all([
        fetchData('/stock_zh_a_hist', {
          symbol: ticker,
          period: 'weekly',
          start_date: dates.start,
          end_date: dates.end,
        }, []),
  
        fetchData('/stock_financial_benefit_ths', {
          code: ticker,
          indicator: '按年度',
        }, [{}]),
  
        fetchData('/stock_mda', { code: ticker }, []),
  
        fetchData('/stock_main_business', { code: ticker }, []),
      ]);
  
      const hist = historicalData[historicalData.length - 1];
      const currentPrice = (hist ? hist['开盘'] : 'N/A') + ' CNY';
      const historical = historicalData
        .map((item) => objectToString(item, ['股票代码']))
        .join('\n----------\n');
  
      const zsfzJson = readLocalJson('zcfz.json');
      const balanceSheet = objectToString(zsfzJson.find((item) => item['股票代码'] === ticker));
  
      const financial = objectToString(financialData[0]);
  
      const mda = mdaData.map(item => `${item['报告期']}\n${item['内容']}`).join('\n-----------\n');
  
      const mainBusiness = businessData.map(item =>
        `主营业务: ${item['主营业务']}\n产品名称: ${item['产品名称']}\n产品类型: ${item['产品类型']}\n经营范围: ${item['经营范围']}`
      ).join('\n-----------\n');
  
      return { currentPrice, historical, balanceSheet, mda, mainBusiness, financial };
    } catch (error) {
      console.error('Error fetching stock data:', error.message);
      throw error;
    }
  }

// import { exec, spawn } from 'child_process';
export default defineEventHandler(async e=>{
    const body = await readMultipartFormData(e)
    console.log(e, body, 'body')
    const { ticker: any } = body;
    if (!ticker) {
        return {
            flag: 'F',
            message: 'Ticker symbol is required.'
        }
    }

    try {
        const dataJson = readLocalJson('stock.json');
        const stockInfo = dataJson.find((item: any) => item.symbol === ticker);
    
        if (!stockInfo) {
            return {
                flag: 'S',
                message: 'Stock information not found.'
            }
        }
    
        const { industry } = stockInfo;
    
        // 获取股票数据
        const stockData = await fetchStockData(ticker);
    
        // 执行分析
        const [sentimentAnalysis, industryAnalysis] = await Promise.all([
          performSentimentAnalysis(ticker),
          analyzeIndustry(industry || 'the industry'),
        ]);
    
        // 生成最终报告
        const finalAnalysis = await provideFinalAnalysis(ticker, {
          sentimentAnalysis,
          industryAnalysis,
          ...stockData,
        });
    
        return {
            flag: 'S',
            data: {
                report: finalAnalysis
            }
        }
      } catch (error) {
        return {
            flag: 'F',
            message: 'Failed to generate report.'
        }
      }
    

    
})
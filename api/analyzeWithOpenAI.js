/**
 * 与 OpenAI API 交互，获取完成结果。
 * @param {array} messages - 消息数组，包含系统提示和用户消息。
 * @returns {Promise<string>} - AI 的响应。
 */
async function analyzeWithOpenAI(messages) {
  try {
    const headers = {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    };
    const requestData = {
      model: 'gpt-4',
      temperature: 0.3,
      messages: messages,
    };

    const response = await useFetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers,
        body: requestData
      }
    );
    console.log(response)
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error fetching analysis from OpenAI:', error.message);
    throw error;
  }
}

/**
 * 使用 OpenAI API 对新闻文章执行情感分析。
 * @param {string} ticker - 股票代码。
 * @returns {Promise<string>} - 情感分析摘要。
 */
async function performSentimentAnalysis(ticker) {
  const systemPrompt = `You are a sentiment analysis assistant. Analyze the sentiment of the given news articles for ${ticker} and provide a summary of the overall sentiment and any notable changes over time. Be measured and discerning. You are a skeptical investor.`;

  const tickerNewsResponse = await fetchData('/stock_news_specific', { code: ticker }, []);

  const newsText = tickerNewsResponse
    .map(item => `${item['文章来源']} Date: ${item['发布时间']}\n${item['新闻内容']}`)
    .join('\n----------\n');

  const messages = [
    { role: 'system', content: systemPrompt },
    {
      role: 'user',
      content: `News articles for ${ticker}:\n${newsText || 'N/A'}\n----\nProvide a summary of the overall sentiment and any notable changes over time.`,
    },
  ];

  return await analyzeWithOpenAI(messages);
}

/**
 * 使用 OpenAI API 分析行业信息。
 * @param {string} industry - 行业名称。
 * @returns {Promise<string>} - 行业分析摘要。
 */
async function analyzeIndustry(industry) {
  const industryNewsResponse = await fetchData('/stock_news_specific', { code: industry }, []);
  const industryNewsArticles = industryNewsResponse
    .map(item => `${item['文章来源']} Date: ${item['发布时间']}\n${item['新闻内容']}`)
    .join('\n----------\n');

  const systemPrompt = `You are an industry analysis assistant. Provide an analysis of the ${industry} industry, including trends, growth prospects, regulatory changes, and competitive landscape.

Consider the following recent news articles relevant to the ${industry} industry:
${industryNewsArticles || 'N/A'}

Be measured and discerning. Truly think about the positives and negatives of the industry. Be sure of your analysis. You are a skeptical investor.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    {
      role: 'user',
      content: `Provide an analysis of the ${industry} industry, taking into account the recent news articles provided.`,
    },
  ];

  return await analyzeWithOpenAI(messages);
}


/**
 * 生成最终的投资报告。
 * @param {string} ticker - 股票代码。
 * @param {object} data - 收集的数据和分析结果。
 * @returns {Promise<string>} - 最终报告。
 */
async function provideFinalAnalysis(ticker, data) {
  const {
    sentimentAnalysis,
    industryAnalysis,
    balanceSheet,
    mda,
    mainBusiness,
    financial,
    currentPrice,
    historical,
  } = data;

  const systemPrompt = `You are a financial analyst tasked with providing a comprehensive investment recommendation for the stock ${ticker}. Your analysis should utilize the available data and aim for a length of approximately 1500 to 3000 words. Focus on the following key aspects:

1. **Company Overview**: Provide a brief overview of the company, including its business model, core products/services, and market position. Refer to the provided main business data.

2. **Financial Performance**:
   - Analyze key financial metrics based on the available data, including the current price (${currentPrice}), historical data, financial data, and balance sheet.
   - Highlight any significant financial trends and changes.

3. **Management Discussion and Analysis (MDA)**:
   - Summarize the management's insights and future outlook based on the provided MDA data.

4. **Sentiment Analysis**:
   - Summarize public sentiment based on recent news articles.
   - Include insights into any significant events or announcements that could influence market perception.

5. **Industry Analysis**:
   - Outline current industry trends and major players based on the available industry data.
   - Identify any regulatory or technological factors affecting the industry.

6. **Macroeconomic Factors**:
   - Analyze relevant macroeconomic indicators that may impact the company's performance.

7. **Risks and Opportunities**:
   - Identify key risks facing the company, including market, operational, and regulatory risks.
   - Highlight potential growth opportunities and strategic initiatives.

8. **Investment Recommendation**:
   - Based on your analysis, provide a clear recommendation (buy, hold, or sell) for the stock.
   - Support your recommendation with a well-reasoned rationale, considering both positives and negatives.

Please write in a professional tone, using precise language and relevant financial terminology. Respond in Chinese.`;

  const userPrompt = `Ticker: ${ticker}\n
1. **Sentiment Analysis**:\n${sentimentAnalysis}\n
2. **Industry Analysis**:\n${industryAnalysis}\n
3. **Financial Data**:\nCurrent Price: ${currentPrice}\nHistorical Data: ${historical}\nBalance Sheet: ${balanceSheet}\nFinancial Data: ${financial}\n
4. **Management Discussion and Analysis (MDA)**:\n${mda}\n
5. **Main Business**:\n${mainBusiness}\n\n
Based on the provided data and analyses, please provide a comprehensive investment analysis and recommendation for ${ticker}. Ensure the report length is controlled between 1500 and 3000 words, ensuring clarity and conciseness in your arguments.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    {
      role: 'user',
      content: userPrompt,
    },
  ];

  return await analyzeWithOpenAI(messages);
}
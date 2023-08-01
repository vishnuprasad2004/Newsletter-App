/** 
 * @param Array
 * @returns {Array} gets news using API 
 */
const getNews = async(interests) => {
    try {
        let news = [];
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API_KEY}`;
        let response = await fetch(url);
        let data = await response.json();
        news = news.concat(data.articles);
        url = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${process.env.NEWS_API_KEY}`;
        for(let i=0; i<interests.length; i++) {
            url += `&category=${interests[i]}`;
        }
        // interests.forEach(interest => {
        //     url = url.concat(`&category=${interest}`);
        // });
        response = await fetch(url);
        data = await response.json();
        news = news.concat(data.articles);
        console.log(news);
        console.log('FETCH_NEWS: got the news');
        return news;
    }catch(e) {
        console.log('FETCH_NEWS: ' + e);
        return [];
    }
}


module.exports = { getNews };
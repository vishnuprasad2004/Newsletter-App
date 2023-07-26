
const getNews = async() => {
    try {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API_KEY}`;
        let response = await fetch(url);
        let data = await response.json();
        return data.articles;
    }catch(e) {
        console.log(e);
    }
}


module.exports = { getNews };
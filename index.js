const axios = require('axios')
const cheerio = require('cheerio')

const fetchData = async(url) => {
    const result = await axios.get(url);
    return result.data;
}

const search = async () => {
    const content = await fetchData("https://brickset.com/sets/year-2019");
    const $ = cheerio.load(content);
    let toys = [];

    const title = $('section.setlist > article.set').each((i, e) => {
        const name = $(e).find('.highslide-caption > h1').text();
        const reference = $(e).find('.meta > h1 > a > span').text();
        const avatar = $(e).find('a > img').attr("src");
        const link = "https://brickset.com" + $(e).find('.meta > h1 > a').attr("href");
        const theme = $(e).find('.highslide-caption > div.tags.floatleft > a:nth-child(2)').text();
        const subtheme = $(e).find('.meta > .tags > a.subtheme').text();
        const tags = $(e).find('.meta > div:nth-child(3)').text().replace(/  /g, ', ');
        const rating = $(e).find('.meta > div.rating > span').text();
        const nReviews = $(e).find('.meta > div.rating > a').text();
        const year = $(e).find('.meta > .tags > a.year').text();
        const pieces = $(e).find('.meta > div.col > dl > dd:nth-child(2) > a').text();
        const minifigs = $(e).find('.meta > div.col > dl > dd:nth-child(4) > a').text();
        const price = $(e).find('.meta > div.col > dl > dd:nth-child(6)').first().text();
        const ppp = $(e).find('.meta > div.col > dl > dd:nth-child(8)').text();
        const packaging = $(e).find('.meta > div.col > dl > dd:nth-child(10)').text();
        //const availability = $(e).find('.meta > div.col > dl > dd:nth-child(12)').text();
        const instructions = $(e).find('.meta > div.col > dl > dd:nth-child(14)').text();
        //const setType = $(e).find('.meta > div.col > dl > dd:nth-child(16)').text(); 
        const saleDateUS = $(e).find('.meta > div.col > dl > dd:nth-child(2)').last().text();
        const saleDateUK = $(e).find('.meta > div.col > dl > dd:nth-child(4)').last().text();
        const ownThis = $(e).find('.action > dl:nth-child(1) > dd > a').text();       
        const linkAmazon = $(e).find('.action > dl.buylinks > dd > ul > li:nth-child(2) > a').attr("href");
        const linkEbay = $(e).find('.action > dl.buylinks > dd > ul > li:nth-child(3) > a').attr("href");
        const Bricklink = $(e).find('.action > dl.buylinks > dd > ul > li:nth-child(4) > a').attr("href");

        const data = {name, reference, avatar, link, theme, subtheme, tags, rating, nReviews, year, pieces, minifigs, price, ppp, packaging, instructions, saleDateUS, saleDateUK, ownThis, linkAmazon, linkEbay, Bricklink};
        toys.push(data);
    })
    console.log(toys);
}

search();
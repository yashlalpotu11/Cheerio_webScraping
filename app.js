
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";


// Scrape function
async function scrape(){
    try{
        //fetch html of page
        const {data} = await axios.get(url);

        //load html into cheerio
        const $ = cheerio.load(data);
        //select all list items
        const listItem = $(".plainlist ul li");

        //store data for all countries
        const countries = [];

        //loop through list items
        listItem.each((index, element) => {
            //object holding data
            const country = {name : "", code : ""};

            country.name = $(element).children("a").text();
            country.code = $(element).children("span").text();

            //push object to array
            countries.push(country);
        });
        console.dir(countries);

        //write to file
        fs.writeFile("countries.json", JSON.stringify(countries, null, 4), err => {
            if(err) throw err;
            console.log("File successfully written!");
        });
    }
    catch(err){
        console.log(err);
    }
}

//call scrape function
scrape();
const EleventyFetch = require("@11ty/eleventy-fetch")
var bcv_parser = require("bible-passage-reference-parser/js/en_bcv_parser").bcv_parser;
var bcv = new bcv_parser;
const fetch = require('node-fetch');
const JSONdb = require('simple-json-db');
const db = new JSONdb('./storage.json');

async function getFromDB(passageRef) {

    // console.log(`looking for passage ${passageRef}`)

    if (db.has(passageRef)) {
        // console.log(`hit in db`)
        return db.get(passageRef)
    } else {

        let url = `https://bibles.org/site-assets/passages/${passageRef}?bibleId=f421fe261da7624f-01`

    
        const response = await fetch(url)
        
        const res = await response.json()

        db.set(passageRef, res)
        return res


    }


}


module.exports = async function () {

  
    let url = `https://script.google.com/macros/s/AKfycbygZVcg1vR9hAWIQfGIOUVYZB3tCq_6hPX-r9O1b8DV2xixoCjhqUhG65GS7qVx8hDXfg/exec`

    const response = await EleventyFetch(url, {
        duration: "1d",
        type: "json"
    })





    return response.data



}
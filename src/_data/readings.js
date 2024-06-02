const EleventyFetch = require("@11ty/eleventy-fetch");
var bcv_parser =
  require("bible-passage-reference-parser/js/en_bcv_parser").bcv_parser;
var bcv = new bcv_parser();
const fetch = require("node-fetch");
const JSONdb = require("simple-json-db");
const db = new JSONdb("./storage.json");

async function getFromDB(passageRef) {
  // console.log(`looking for passage ${passageRef}`)

  //console.log(passageRef);
  if (db.has(passageRef)) {
    //console.log(`hit in db`);
    return db.get(passageRef);
  } else {
    let url = `https://bibles.org/site-assets/passages/${passageRef}?bibleId=f421fe261da7624f-01`;

    const response = await fetch(url);

    // console.log(response);
    const res = await response.json();

    db.set(passageRef, res);
    return res;
  }
}

module.exports = async function () {
  const bookRefs = {
    data: [
      {
        id: "GEN",
        bibleId: "bba9f40183526463-01",
        abbreviation: "GEN",
        name: "Genesis",
        nameLong: "Genesis",
      },
      {
        id: "EXO",
        bibleId: "bba9f40183526463-01",
        abbreviation: "EXO",
        name: "Exodus",
        nameLong: "Exodus",
      },
      {
        id: "LEV",
        bibleId: "bba9f40183526463-01",
        abbreviation: "LEV",
        name: "Leviticus",
        nameLong: "Leviticus",
      },
      {
        id: "NUM",
        bibleId: "bba9f40183526463-01",
        abbreviation: "NUM",
        name: "Numbers",
        nameLong: "Numbers",
      },
      {
        id: "DEU",
        bibleId: "bba9f40183526463-01",
        abbreviation: "DEU",
        name: "Deuteronomy",
        nameLong: "Deuteronomy",
      },
      {
        id: "JOS",
        bibleId: "bba9f40183526463-01",
        abbreviation: "JOS",
        name: "Joshua",
        nameLong: "Joshua",
      },
      {
        id: "JDG",
        bibleId: "bba9f40183526463-01",
        abbreviation: "JDG",
        name: "Judges",
        nameLong: "Judges",
      },
      {
        id: "RUT",
        bibleId: "bba9f40183526463-01",
        abbreviation: "RUT",
        name: "Ruth",
        nameLong: "Ruth",
      },
      {
        id: "1SA",
        bibleId: "bba9f40183526463-01",
        abbreviation: "1SA",
        name: "1 Samuel",
        nameLong: "1 Samuel",
      },
      {
        id: "2SA",
        bibleId: "bba9f40183526463-01",
        abbreviation: "2SA",
        name: "2 Samuel",
        nameLong: "2 Samuel",
      },
      {
        id: "1KI",
        bibleId: "bba9f40183526463-01",
        abbreviation: "1KI",
        name: "1 Kings",
        nameLong: "1 Kings",
      },
      {
        id: "2KI",
        bibleId: "bba9f40183526463-01",
        abbreviation: "2KI",
        name: "2 Kings",
        nameLong: "2 Kings",
      },
      {
        id: "1CH",
        bibleId: "bba9f40183526463-01",
        abbreviation: "1CH",
        name: "1 Chronicles",
        nameLong: "1 Chronicles",
      },
      {
        id: "2CH",
        bibleId: "bba9f40183526463-01",
        abbreviation: "2CH",
        name: "2 Chronicles",
        nameLong: "2 Chronicles",
      },
      {
        id: "EZR",
        bibleId: "bba9f40183526463-01",
        abbreviation: "EZR",
        name: "Ezra",
        nameLong: "Ezra",
      },
      {
        id: "NEH",
        bibleId: "bba9f40183526463-01",
        abbreviation: "NEH",
        name: "Nehemiah",
        nameLong: "Nehemiah",
      },
      {
        id: "EST",
        bibleId: "bba9f40183526463-01",
        abbreviation: "EST",
        name: "Esther",
        nameLong: "Esther",
      },
      {
        id: "JOB",
        bibleId: "bba9f40183526463-01",
        abbreviation: "JOB",
        name: "Job",
        nameLong: "Job",
      },
      {
        id: "PSA",
        bibleId: "bba9f40183526463-01",
        abbreviation: "PSA",
        name: "Psalms",
        nameLong: "Psalms",
      },
      {
        id: "PSA",
        bibleId: "bba9f40183526463-01",
        abbreviation: "PSA",
        name: "Psalm",
        nameLong: "Psalm",
      },
      {
        id: "PSA",
        bibleId: "bba9f40183526463-01",
        abbreviation: "PSA",
        name: "Ps",
        nameLong: "Ps",
      },
      {
        id: "PRO",
        bibleId: "bba9f40183526463-01",
        abbreviation: "PRO",
        name: "Proverbs",
        nameLong: "Proverbs",
      },
      {
        id: "ECC",
        bibleId: "bba9f40183526463-01",
        abbreviation: "ECC",
        name: "Ecclesiastes",
        nameLong: "Ecclesiastes",
      },
      {
        id: "SNG",
        bibleId: "bba9f40183526463-01",
        abbreviation: "SNG",
        name: "Song",
        nameLong: "Song",
      },
      {
        id: "ISA",
        bibleId: "bba9f40183526463-01",
        abbreviation: "ISA",
        name: "Isaiah",
        nameLong: "Isaiah",
      },
      {
        id: "JER",
        bibleId: "bba9f40183526463-01",
        abbreviation: "JER",
        name: "Jeremiah",
        nameLong: "Jeremiah",
      },
      {
        id: "LAM",
        bibleId: "bba9f40183526463-01",
        abbreviation: "LAM",
        name: "Lamentations",
        nameLong: "Lamentations",
      },
      {
        id: "EZK",
        bibleId: "bba9f40183526463-01",
        abbreviation: "EZK",
        name: "Ezekiel",
        nameLong: "Ezekiel",
      },
      {
        id: "DAN",
        bibleId: "bba9f40183526463-01",
        abbreviation: "DAN",
        name: "Daniel",
        nameLong: "Daniel",
      },
      {
        id: "HOS",
        bibleId: "bba9f40183526463-01",
        abbreviation: "HOS",
        name: "Hosea",
        nameLong: "Hosea",
      },
      {
        id: "JOL",
        bibleId: "bba9f40183526463-01",
        abbreviation: "JOL",
        name: "Joel",
        nameLong: "Joel",
      },
      {
        id: "AMO",
        bibleId: "bba9f40183526463-01",
        abbreviation: "AMO",
        name: "Amos",
        nameLong: "Amos",
      },
      {
        id: "OBA",
        bibleId: "bba9f40183526463-01",
        abbreviation: "OBA",
        name: "Obadiah",
        nameLong: "Obadiah",
      },
      {
        id: "JON",
        bibleId: "bba9f40183526463-01",
        abbreviation: "JON",
        name: "Jonah",
        nameLong: "Jonah",
      },
      {
        id: "MIC",
        bibleId: "bba9f40183526463-01",
        abbreviation: "MIC",
        name: "Micah",
        nameLong: "Micah",
      },
      {
        id: "NAM",
        bibleId: "bba9f40183526463-01",
        abbreviation: "NAM",
        name: "Nahum",
        nameLong: "Nahum",
      },
      {
        id: "HAB",
        bibleId: "bba9f40183526463-01",
        abbreviation: "HAB",
        name: "Habakkuk",
        nameLong: "Habakkuk",
      },
      {
        id: "ZEP",
        bibleId: "bba9f40183526463-01",
        abbreviation: "ZEP",
        name: "Zephaniah",
        nameLong: "Zephaniah",
      },
      {
        id: "HAG",
        bibleId: "bba9f40183526463-01",
        abbreviation: "HAG",
        name: "Haggai",
        nameLong: "Haggai",
      },
      {
        id: "ZEC",
        bibleId: "bba9f40183526463-01",
        abbreviation: "ZEC",
        name: "Zechariah",
        nameLong: "Zechariah",
      },
      {
        id: "MAL",
        bibleId: "bba9f40183526463-01",
        abbreviation: "MAL",
        name: "Malachi",
        nameLong: "Malachi",
      },
      {
        id: "MAT",
        bibleId: "bba9f40183526463-01",
        abbreviation: "MAT",
        name: "Matthew",
        nameLong: "Matthew",
      },
      {
        id: "MRK",
        bibleId: "bba9f40183526463-01",
        abbreviation: "MRK",
        name: "Mark",
        nameLong: "Mark",
      },
      {
        id: "LUK",
        bibleId: "bba9f40183526463-01",
        abbreviation: "LUK",
        name: "Luke",
        nameLong: "Luke",
      },
      {
        id: "JHN",
        bibleId: "bba9f40183526463-01",
        abbreviation: "JHN",
        name: "John",
        nameLong: "John",
      },
      {
        id: "ACT",
        bibleId: "bba9f40183526463-01",
        abbreviation: "ACT",
        name: "Acts",
        nameLong: "Acts",
      },
      {
        id: "ROM",
        bibleId: "bba9f40183526463-01",
        abbreviation: "ROM",
        name: "Romans",
        nameLong: "Romans",
      },
      {
        id: "1CO",
        bibleId: "bba9f40183526463-01",
        abbreviation: "1CO",
        name: "1 Corinthians",
        nameLong: "1 Corinthians",
      },
      {
        id: "2CO",
        bibleId: "bba9f40183526463-01",
        abbreviation: "2CO",
        name: "2 Corinthians",
        nameLong: "2 Corinthians",
      },
      {
        id: "GAL",
        bibleId: "bba9f40183526463-01",
        abbreviation: "GAL",
        name: "Galatians",
        nameLong: "Galatians",
      },
      {
        id: "EPH",
        bibleId: "bba9f40183526463-01",
        abbreviation: "EPH",
        name: "Ephesians",
        nameLong: "Ephesians",
      },
      {
        id: "PHP",
        bibleId: "bba9f40183526463-01",
        abbreviation: "PHP",
        name: "Philippians",
        nameLong: "Philippians",
      },
      {
        id: "COL",
        bibleId: "bba9f40183526463-01",
        abbreviation: "COL",
        name: "Colossians",
        nameLong: "Colossians",
      },
      {
        id: "1TH",
        bibleId: "bba9f40183526463-01",
        abbreviation: "1TH",
        name: "1 Thessalonians",
        nameLong: "1 Thessalonians",
      },
      {
        id: "2TH",
        bibleId: "bba9f40183526463-01",
        abbreviation: "2TH",
        name: "2 Thessalonians",
        nameLong: "2 Thessalonians",
      },
      {
        id: "1TI",
        bibleId: "bba9f40183526463-01",
        abbreviation: "1TI",
        name: "1 Timothy",
        nameLong: "1 Timothy",
      },
      {
        id: "2TI",
        bibleId: "bba9f40183526463-01",
        abbreviation: "2TI",
        name: "2 Timothy",
        nameLong: "2 Timothy",
      },
      {
        id: "TIT",
        bibleId: "bba9f40183526463-01",
        abbreviation: "TIT",
        name: "Titus",
        nameLong: "Titus",
      },
      {
        id: "PHM",
        bibleId: "bba9f40183526463-01",
        abbreviation: "PHM",
        name: "Philemon",
        nameLong: "Philemon",
      },
      {
        id: "HEB",
        bibleId: "bba9f40183526463-01",
        abbreviation: "HEB",
        name: "Hebrews",
        nameLong: "Hebrews",
      },
      {
        id: "JAS",
        bibleId: "bba9f40183526463-01",
        abbreviation: "JAS",
        name: "James",
        nameLong: "James",
      },
      {
        id: "1PE",
        bibleId: "bba9f40183526463-01",
        abbreviation: "1PE",
        name: "1 Peter",
        nameLong: "1 Peter",
      },
      {
        id: "2PE",
        bibleId: "bba9f40183526463-01",
        abbreviation: "2PE",
        name: "2 Peter",
        nameLong: "2 Peter",
      },
      {
        id: "1JN",
        bibleId: "bba9f40183526463-01",
        abbreviation: "1JN",
        name: "1 John",
        nameLong: "1 John",
      },
      {
        id: "2JN",
        bibleId: "bba9f40183526463-01",
        abbreviation: "2JN",
        name: "2 John",
        nameLong: "2 John",
      },
      {
        id: "3JN",
        bibleId: "bba9f40183526463-01",
        abbreviation: "3JN",
        name: "3 John",
        nameLong: "3 John",
      },
      {
        id: "JUD",
        bibleId: "bba9f40183526463-01",
        abbreviation: "JUD",
        name: "Jude",
        nameLong: "Jude",
      },
      {
        id: "REV",
        bibleId: "bba9f40183526463-01",
        abbreviation: "REV",
        name: "Revelation",
        nameLong: "Revelation",
      },
    ],
  };

  let url = `https://script.googleusercontent.com/macros/echo?user_content_key=pJxiVsEgfU9a8HBcrsLaqYqrok0B1qUxaqmg-vPqqKveL7r9ZYUIY0aviOLZGkWhLpP0IOqYNQeDQM-eIHlMmkPh3-b6sR_wm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHXMYlyyKu_9pp6ApeG_DtIsCkQpiVUyEx9PHZ_YX2aatnYgACx062kT63XOTamE1rC46kzBuvBF_wctXcB0FXmXIqb0LUATbQ&lib=MnqVGq-HVhHeU1Szj8IF3gkwZ7ki6rcAH`;

  var response = {};

  try {
    response = await EleventyFetch(url, {
      duration: "0s",
      type: "json",
    });
  } catch (e) {
    console.log("error!!!!");
  }

  for (const element of response.data) {
    // console.log(element.optionalPassages)

    let mainPassageText = convertPassageToApiRef(element.passage);
    // console.log(mainPassageText)

    const mainPassage = await getFromDB(mainPassageText);

    // console.log(mainPassage)

    // element.mainPassage = element.mainPassage || []
    element.mainPassage = mainPassage;

    let memoryVerse = element.memoryVerse;

    if (memoryVerse) {
      const memBiblesOrgRef = convertPassageToApiRef(memoryVerse);

      const memPassage = await getFromDB(memBiblesOrgRef);

      element.memoryPassage = memPassage;
    }

    let passages = element.optionalPassages.split(",");

    for (const el of passages) {
      const biblesOrgRef = convertPassageToApiRef(el);

      // const longBookName = el.slice(0, el.lastIndexOf(" "))
      // const parsedRef = bcv.parse(el).osis()

      // const [fromO, toO] = parsedRef.split("-")

      // let from = fromO.slice(fromO.indexOf("."))
      // let to = toO.slice(toO.indexOf("."))

      // const nameref = bookRefs.data.filter(e => { return e.name.toUpperCase() == longBookName.trim().toUpperCase() })[0].id

      // const biblesOrgRef = `${nameref}${from}-${nameref}${to}`

      // now use the reference to pull the passage

      // let url = `https://bibles.org/site-assets/passages/${biblesOrgRef}?bibleId=f421fe261da7624f-01`

      const passage = await getFromDB(biblesOrgRef);

      element.passages = element.passages || [];
      element.passages.push(passage);

      // const response = await fetch(url)
      // element.passages = element.passages || []
      // element.passages.push(await response.json())
    }
  }

  function convertPassageToApiRef(pasage) {
    const longBookName = pasage.slice(0, pasage.lastIndexOf(" "));
    const parsedRef = bcv.parse(pasage).osis();

    const [fromO, toO] = parsedRef.split("-");

    let from = fromO.slice(fromO.indexOf("."));

    const nameref = bookRefs.data.filter((e) => {
      return e.name.toUpperCase() == longBookName.trim().toUpperCase();
    })[0].id;

    if (toO != undefined) {
      let to = toO.slice(toO.indexOf("."));
      return (biblesOrgRef = `${nameref}${from}-${nameref}${to}`);
    } else {
      return (biblesOrgRef = `${nameref}${from}`);
    }
  }

  return response.data;
};

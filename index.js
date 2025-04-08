#!/usr/bin/env node

const fs = require("fs");
const {loadSpreadsheet, getConfig} = require("./loadSheet");

function getDefaultObj(langArr){
    const finalObj = {};
    langArr.forEach(lang => {
        finalObj[lang] = [];
    });
    return finalObj;
}

function parseArrDataToJsonByLangKey(googleDocArr, langArr) {
    const finalObj = getDefaultObj(langArr);
    googleDocArr.forEach(row => {
        langArr.forEach(lang => {
            const key = row['key'];
            let value = row[lang];
            finalObj[lang].push(key+"="+value?.replaceAll("\n", ""));
        })
    });
    return finalObj;
}


async function fetchTranslationsFromSheetToJson(doc) {
    const config = await getConfig();
    const sheet = doc.sheetsById[config.sheetId];
    if (!sheet) {
        return {};
    }
    const rows = await sheet.getRows();
    return parseArrDataToJsonByLangKey(rows, config.langs);
}

async function loadInfo(){
    const doc = await loadSpreadsheet();
    const res = await fetchTranslationsFromSheetToJson(doc);
    const config = await getConfig();
    const filePath = process.cwd();

    config.langs.forEach(lang => {
        const fileName = filePath+"/messages_"+lang+".properties";
        console.log('fileName : ', fileName);
        fs.writeFileSync(fileName, res[lang].join("\n"), "utf8");
    })
    const fileName = filePath+"/messages.properties";
    fs.writeFileSync(fileName, res[config.basicLang].join("\n"), "utf8");
}

loadInfo().then(()=>{
    console.log('complete');
});


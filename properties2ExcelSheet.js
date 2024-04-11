const fs = require('fs');
const readline = require('readline');
const writeXlsxFile = require("write-excel-file/node");

const fileName = process.cwd()+'/messages_en.properties'

const langs = ["ko", "en", "zh"];

const HEADER_ROW = [
    {
        value: "key_parent",
        fontWeight: "bold",
    },
    {
        value: "key_child",
        fontWeight: "bold",
    },
    {
        value: "key",
        fontWeight: "bold",
    },
    {
        value: "분류",
        fontWeight: "bold",
    },

];

const DATA_ROW_1 = [];

const langsValues = langs.map(lang => ({
    value: lang,
    fontWeight: "bold",
}))
HEADER_ROW.push(...langsValues)



const fileData = {
    ko : {},
    en:  {},
    zh: {}
}

async function processLineByLine(lang) {
    const fileStream = fs.createReadStream(process.cwd()+`/messages_${lang}.properties`);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.


    const data = {}
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        const [key, ...rest] = line.split('=')
        const value = rest.join('_')

        data[key] = value
    }
    fileData[lang] = data
}

const insertExcelData = [HEADER_ROW];

async function mainFunc(){
    await processLineByLine('ko')
    await processLineByLine('en')
    await processLineByLine('zh')

    // key_parent, key_child, key, 분류, ko, en, zh

    Object.keys(fileData['ko']).forEach(key => {
        const row = [];
        const [key_parent, ...rest] = key.split(".")
        const key_child = rest.join(".")
        // pass key
        const classfication = key_parent
        row.push({value: key_parent}, {value : key_child}, {value: key}, {value: classfication});
        langs.map(lang => {
            row.push({value: fileData[lang][key] || ""})
        })
        insertExcelData.push(row);
    });

    await writeXlsxFile(insertExcelData, {
        filePath: "./langSheet.xlsx",
    });
}


mainFunc().then(()=>{
    console.log('data : ', fileData);
});





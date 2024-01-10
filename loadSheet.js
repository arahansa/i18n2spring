const {GoogleSpreadsheet} = require('google-spreadsheet');
const fs = require("fs");


async function getConfig(){
    const file = await fs.promises.readFile(process.cwd()+'/i18nGoogle.json', 'utf-8')
    const parsed = JSON.parse(file)
    console.log('parsed : ', parsed);
    return parsed
}

async function loadSpreadsheet() {

    const config = await getConfig();

    // eslint-disable-next-line no-console
    console.info(
        '\u001B[32m',
        '=====================================================================================================================\n',
        '# i18next auto-sync using Spreadsheet\n\n',
        '  * Download translation resources from Spreadsheet and make /assets/locales/{{lng}}/{{ns}}.json\n',
        '  * Upload translation resources to Spreadsheet.\n\n',
        `The Spreadsheet for translation is here (\u001B[34mhttps://docs.google.com/spreadsheets/d/${config.spreadsheetId}/#gid=${config.sheetId}\u001B[0m)\n`,
        '=====================================================================================================================',
        '\u001B[0m'
    );

    // spreadsheet key is the long id in the sheets URL
    console.log('config.spreadsheetId : ', config.spreadSheetId);
    const doc = new GoogleSpreadsheet(config.spreadSheetId);
    const file = await fs.promises.readFile(process.cwd()+'/i18nCred.json', 'utf-8')
    const parsed = JSON.parse(file)
    await doc.useServiceAccountAuth(parsed);
    await doc.loadInfo(); // loads document properties and worksheets

    return doc;
}


module.exports = {
    loadSpreadsheet,
    getConfig
};

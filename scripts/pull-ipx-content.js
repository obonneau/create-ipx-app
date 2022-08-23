const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');
const { getWidget } = require('../api/get-widget');

const srcPath = path.resolve(__dirname, '../src');

/**
 * Pull html body of IPX and replace the contents of the /src folder
 */
async function pullIPXHTML() {
    const { body } = await getWidget();
    const $ = cheerio.load(`<div id="root">${body}</div>`);

    const ipxCss = path.resolve(srcPath, 'ipx.css');
    fs.outputFileSync(ipxCss, '');

    const topLevelStyleTags = $('#root > style');
    topLevelStyleTags.each((_, tag) => {
        fs.appendFileSync(ipxCss, $(tag).html().toString());
    });

    const ipxHtml = path.resolve(srcPath, 'ipx.html');
    fs.outputFileSync(ipxHtml, '');
    // Append contents of top level elements not style or script to ipx.html
    $('#root > *:not(style):not(script)').each((_, tag) => {
        fs.appendFileSync(ipxHtml, $(tag).toString());
    });

    const ipxJs = path.resolve(srcPath, 'ipx.js');
    fs.outputFileSync(ipxJs, '');

    const topLevelScriptTags = $('#root > script');
    topLevelScriptTags.each((_, tag) => {
        fs.appendFileSync(ipxJs, $(tag).html().toString());
    });
    console.log('Finished pulling IPX contents.');
}

pullIPXHTML();

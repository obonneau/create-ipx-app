const { readFileSync } = require('fs');
const path = require('path');
const { getLoaderUrl } = require('../api/get-script');

/**
 * Generate a Userscript that can be used with tampermonkey to display the IPX widget in a browser.
 * The domain to match on is specified with an argument when running
 *  e.g. `npm run log:tampermonkey-script -- domain.com`
 */
async function generateTamperMonkeyScript() {
    // Throw error if domain flag is not present
    if (!process.argv[2]) {
        throw new Error('Please specify the site for which the tamper monkey script should be active.\n e.g. '
        + 'npm run log:tampermonkey-script -- google.com');
    }

    // Read tampermonkey script template
    let template = readFileSync(path.resolve(__dirname, '../templates/ipx-tampermonkey.js'), 'utf-8');
    template = template.replace('{{LOADER_URL}}', getLoaderUrl());

    // Match all pages in domain
    const domain = `*.${process.argv[2]}/*`;
    template = template.replace('{{WEBSITE_GLOB_PATTERN}}', domain);

    console.log(template);
}

generateTamperMonkeyScript();

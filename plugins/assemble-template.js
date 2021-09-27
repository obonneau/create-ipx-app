const fs = require('fs');
const path = require('path');

const pluginName = 'AssembleIPXTemplatePlugin';
const { getWidget } = require('../api/get-widget');

const distPath = path.resolve(__dirname, '../dist');

class AssembleIPXTemplatePlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tapPromise(pluginName, async () => {
            const ipxHtml = await this.buildIPXHtml();
            fs.writeFileSync(path.resolve(distPath, 'ipx-page.html'), ipxHtml);
        });
    }

    async buildIPXHtml() {
        const { head } = await getWidget();
        const body = fs.readFileSync(this.options.ipxHtmlFileName, 'utf-8');

        let ipxHtml = fs.readFileSync(path.resolve(__dirname, '../templates/ipx-template.html'), 'utf-8');
        ipxHtml = ipxHtml.replace('{{ipx-head}}', head);
        ipxHtml = ipxHtml.replace('{{ipx-body}}', body);

        return ipxHtml;
    }
}

module.exports = AssembleIPXTemplatePlugin;

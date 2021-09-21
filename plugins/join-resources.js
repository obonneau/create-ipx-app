const { appendFileSync, readFileSync } = require('fs');

const pluginName = 'JoinResourcesPlugin';

class JoinResourcesPlugin {
    constructor(options) {
        this.options = {
            htmlFileName: '',
            css: [],
            js: [],
            vendor: {
                css: [],
            },
            ...options,
        };
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tap(pluginName, () => this.appendResources());
    }

    appendResources() {
        this.appendScripts();
        this.appendVendorResources();
        this.appendStyles();
    }

    appendStyles() {
        this.options.css.forEach((css) => this.appendToFile(css, 'style'));
    }

    appendScripts() {
        this.options.js.forEach((js) => this.appendToFile(js, 'script'));
    }

    appendToFile(originFile, htmlTag) {
        const data = readFileSync(originFile, 'utf8');
        const html = `<${htmlTag}>${data}</${htmlTag}>`;
        this.appendHtml(html);
    }

    appendVendorResources() {
        const styleUrls = this.options.vendor.css;

        styleUrls.forEach((url) => {
            const html = `<link rel="stylesheet" href="${url}" type="text/css"></link>`;
            this.appendHtml(html);
        });
    }

    appendHtml(html) {
        appendFileSync(this.options.htmlFileName, html);
    }
}

module.exports = JoinResourcesPlugin;

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const JoinResourcesPlugin = require('./plugins/join-resources');
const AssembleIPXTemplatePlugin = require('./plugins/assemble-template');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

function buildPlugins() {
    return [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'templates/index.html'),
                    to: distPath,
                },
                {
                    from: path.resolve(srcPath, 'ipx.html'),
                    to: distPath,
                }, {
                    from: path.resolve(srcPath, 'ipx.css'),
                    to: distPath,
                }],
        }),
        new JoinResourcesPlugin({
            htmlFileName: path.resolve(distPath, 'ipx.html'),
            css: [path.resolve(distPath, 'ipx.css')],
            js: [path.resolve(distPath, 'ipx.js')],
        }),
        new AssembleIPXTemplatePlugin({
            ipxHtmlFileName: path.join(distPath, 'ipx.html'),
        }),
    ];
}

module.exports = () => {
    const plugins = buildPlugins();

    return {
        mode: 'production',
        entry: {
            ipx: './src/ipx.js',
        },
        output: {
            filename: '[name].js',
            path: distPath,
        },
        devServer: {
            contentBase: distPath,
            writeToDisk: true,
        },
        plugins,
    };
};

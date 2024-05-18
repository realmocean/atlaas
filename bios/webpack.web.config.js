const path = require('path');
const manifest = require('./src/manifest');

const fs = require('fs');

const copyright = `
/*! *****************************************************************************************************************************
* Copyright (c) Tuvalsoft Corporation. All rights reserved.                                                                     *
*                                                                                                                               *
* ████████╗██╗   ██╗██╗   ██╗ █████╗ ██╗         ███████╗██████╗  █████╗ ███╗   ███╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗ *
* ╚══██╔══╝██║   ██║██║   ██║██╔══██╗██║         ██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝ *
*    ██║   ██║   ██║██║   ██║███████║██║         █████╗  ██████╔╝███████║██╔████╔██║█████╗  ██║ █╗ ██║██║   ██║██████╔╝█████╔╝  *
*    ██║   ██║   ██║╚██╗ ██╔╝██╔══██║██║         ██╔══╝  ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██╔═██╗  *
*    ██║   ╚██████╔╝ ╚████╔╝ ██║  ██║███████╗    ██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗ *
*    ╚═╝    ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ *
*                                                                                                                               *
*                                                                                                                               *
* This file is part of Tuval Framework.                                                                                         *
* Copyright (c) Tuvalsoft 2019 All rights reserved.                                                                             *
*                                                                                                                               *
* Licensed under the GNU General Public License v3.0.                                                                           *
* More info at: https://choosealicense.com/licenses/gpl-3.0/                                                                    *
* Tuval Framework Created By Tuvalsoft in 2019  
* BIOS                                                                                *
******************************************************************************************************************************@*/
`;

//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const opts = {
    WEB: true,
    NODE: false,
    version: 3,
    "ifdef-verbose": true, // add this for verbose output
    //"ifdef-triple-slash": false // add this to use double slash comment instead of default triple slash
};


const webConfig = {
    //  target: 'web',
    //target: 'es5',
    mode: 'development',
    // devtool: 'source-map',  
    entry: './src/index.tsx',
    externals: {
        '@tuval/core': 'tuval$core',
        '@tuval/cg': 'tuval$core$graphics',
        '@tuval/graphics': 'tuval$graphics',
        '@tuval/gui': 'tuval$gui',
        '@tuval/forms': 'tuval$forms',
        '@realmocean/charts': 'realmocean$charts',
        '@realmocean/codeeditor': 'realmocean$codeeditor',
        '@realmocean/buttons': 'realmocean$buttons',
        '@realmocean/calendars': 'realmocean$calendars',
        '@tuval/components-charts': 'realmocean$charts',
        '@realmocean/compression': 'realmocean$compression',
        '@realmocean/core': 'realmocean$core',
        '@realmocean/data': 'realmocean$data',
        '@realmocean/diagram': 'realmocean$diagram',
        '@realmocean/dropdowns': 'realmocean$dropdowns',
        '@realmocean/excelexport': 'realmocean$excelexport',
        '@realmocean/filemanager': 'realmocean$filemanager',
        '@realmocean/fileutils': 'realmocean$fileutils',
        '@realmocean/grids': 'realmocean$grids',
        '@realmocean/inputs': 'realmocean$inputs',
        '@realmocean/layouts': 'realmocean$layouts',
        '@realmocean/lists': 'realmocean$lists',
        '@realmocean/navigations': 'realmocean$navigations',
        '@realmocean/pdfexport': 'realmocean$pdfexport',
        '@realmocean/popups': 'realmocean$popups',
        '@realmocean/splitbuttons': 'realmocean$splitbuttons',
        '@realmocean/svgbase': 'realmocean$svgbase',
        '@realmocean/query-builder': 'realmocean$query-builder',
        '@realmocean/spreadsheet': 'realmocean$spreadsheet',
        //'@realmocean/services': 'realmocean$services',
        '@realmocean/kanban': 'realmocean$kanban',
        '@realmocean/bpmn': 'realmocean$bpmn',

        '@realmocean/treegrid': 'realmocean$treegrid',
        '@realmocean/richtexteditor': 'realmocean$richtexteditor',
        '@realmocean/gantt': 'realmocean$gantt',

        '@realmocean/imageeditor': 'realmocean$imageeditor',
        '@realmocean/antd': 'realmocean$antd',
        '@realmocean/atlaskit': 'realmocean$atlaskit',
        '@realmocean/sdk': 'realmocean$sdk',
        '@realmocean/ui': 'realmocean$ui',
        '@celmino/platform': 'celmino$platform',

        'react': 'tuval$react',
        'react-dom/client': 'tuval$react$dom'


    },
    module: {
        rules: [
            /*  {
               test: /\.js$/,
               use: ['babel-loader', 'webpack-conditional-loader']
             }, */
            {
                test: /\.tsx?$/,
                use: [
                    { loader: "ts-loader", options: { configFile: 'web.tsconfig.json' } },
                    { loader: "ifdef-loader", options: opts }
                ],
                exclude: /node_modules/,

            },
            /*  {
                 test: /\.(wasm|eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                 type: 'javascript/auto',
                 loader: 'arraybuffer-loader',
             }, */
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            }
            /* {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            } */
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            child_process: false,
            fs: false,
            crypto: false,
            net: false,
            tls: false,
            ws: false,
            os: false,
            path: false
        }
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist_web'),
    },
    plugins: [
        //    new BundleAnalyzerPlugin(),
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    const file = './dist_web/index.js';
                    var data = fs.readFileSync(file); //read existing contents into data
                    //var fd = fs.openSync(file, 'w+');
                    var buffer = new Buffer(copyright);
                    fs.writeFileSync(file, buffer);
                    fs.appendFileSync(file, data);

                    var bufferEnd = new Buffer(`
                tuval$core.ModuleLoader.FireModuleLoadedEvent('${manifest.application.name}', tuval$core['__APPS__']['${manifest.application.name}']);
                `);
                    fs.appendFileSync(file, bufferEnd);
                    /*  fs.appendFile('./dist/index.js', `
            tuval$core.ModuleLoader.FireModuleLoadedEvent('${manifest.application.name}', tuval$core['__APPS__']['${manifest.application.name}']);
    `, (err) => {
            if (err) throw err;
            console.log('The lyrics were updated!');
        }); */
                });
            }
        }

    ]
};

module.exports = [webConfig /* webClientConfig */ /* umdConfig */ /* , umdWebProcess */];
// ==UserScript==
// @name         IPX Tampermonkey
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Coveo In-Product Experience
// @match        {{WEBSITE_GLOB_PATTERN}}
// @grant        none
// @noframes
// ==/UserScript==
(function() {
    'use strict';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '{{LOADER_URL}}';
    document.getElementsByTagName('head')[0].appendChild(script);
})();
// ==UserScript==
// @name         NoEMP
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  NoEMP
// @author       Pon4ick
// @match        https://kb.bvbinfo.ru/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Pon4ick/tm-userscripts/refs/heads/main/NoEMP/noemp.user.js?ts=1
// @downloadURL  https://raw.githubusercontent.com/Pon4ick/tm-userscripts/refs/heads/main/NoEMP/noemp.user.js?ts=1
// ==/UserScript==

/* Updates:
 *     - Change UpdateURL and DownloadURL
 *     - Script moved to new repository
*/

(function() {
    'use strict';
    var isChange = false

    function main() {
        if (!isChange) {
            isChange = true

            let sidebar = document.querySelectorAll(".sidebar__inner.grid.gap-4")
            sidebar[0].children[0].remove()
            sidebar[0].children[0].remove()

            let navItems = document.querySelectorAll(".pl-2.mb-1.text-sm");
            let videoText = [];
            for (let element of navItems) {
                if (element.children[0].innerText.toLowerCase().includes("ролик")) {
                    videoText.push(element)
                }
            }
            for (let i = 2; i < videoText.length; i++) {
                let element = videoText[i]
                element.remove()
            }

            let containers = document.querySelectorAll('.mb-3.last\\:mb-0');
            let videoInTitle = 0
            let elemntNumbers = 1
            for (let i = 0; i < containers.length; i++) {
                let container = containers[i]

                let titleText = container.querySelector(".text-xl.font-medium.md\\:text-2xl.xl\\:mr-3")
                if (titleText && titleText.children[0].innerText.toLowerCase().includes('ролик')) {
                    videoInTitle += 1
                    if (videoInTitle > 2) {
                        container.remove()
                        elemntNumbers -= 1
                    }
                }

                elemntNumbers += 1
                let elementText = container.querySelectorAll(".flex.lg\\:flex-row.flex-col.lg\\:items-center.lg\\:justify-between.text-black-40")
                elementText[elementText.length - 1].querySelector(".text-base.mt-1\\.5").textContent = `Элемент ${elemntNumbers}`
            }
        }
    }


    function check() {
        let items = document.querySelectorAll(".vjs-poster");
        if (items.length > 0) {
            main()
            return true;
        }
        return false;
    }
    
    // OBSERVERS
    let lastUrl = location.href;
    const observer = new MutationObserver(function(mutations) {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            isChange = false
        }
        for (let mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                check()
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();

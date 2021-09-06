/**
 * Lib created by Francesc Puig 2016
 *
 * modalLoadin.js This script allows you to include any project loading screen modal.
 *
 */
var modalLoading = {

    init : function(start) {
        var _this = this;
        if (start) {
            _this.construct();
            window.location.href = "#openModalLoading";
        } else {
            document.body.removeChild(document.getElementById('openModalLoading'))
        }
    },

    construct : function() {
        var _this = this;
        var html = '<div id="openModalLoading" class="modalDialog"><div><div class="loading-spinner"></div></div></div>';

        _this.appendHtml(document.body, html);
    },

    appendHtml : function(el, str) {
        var div = document.createElement('div');
        div.innerHTML = str;
        while (div.children.length > 0) {
            el.appendChild(div.children[0]);
        }
    },

};

modalLoading.init(true);

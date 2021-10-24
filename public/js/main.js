const { validate } = require("../../src/models/user");

function loading() {
    document.getElementById('preLoader').style.display = 'none';

}

window.onscroll = function () { scfunc() };

function scfunc() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById('arrow').style.display = "flex"

    } else if (document.body.scrollTop < 20 || document.documentElement.scrollTop < 20) {
        document.getElementById('arrow').setAttribute(
            'style', " display:none   ")
    }
}
function myFunc() {
    document.body.scrollTop = 0; //for safari
    document.documentElement.scrollTop = 0; //for chrome, firefox, ie and others
}







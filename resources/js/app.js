/********************************************************************************/
/********************************CALCULATION MODULE******************************/
/********************************************************************************/
var Calculation = (function () {
    //Profession Constructor
    //Merchant EXP for each level Calc


})();
/********************************************************************************/
/********************************UI CONTROL MODULE*******************************/
/********************************************************************************/
var UIController = (function () {
    var DOMStrings;
    DOMStrings = {
        merchantLvl: "merchant-lvl",
        merchantExp: "merchant-exp",
        merchantResources: "merchant-resources",
        merchantBtn: "merchant-calc",
        merchantAns: "merchant-answer",
        crafterLvl: "crafter-lvl",
        crafterExp: "crafter-exp",
        crafterResources: "crafter-resources",
        crafterBtn: "crafter-calc",
        crafterAns: "crafter-answer",
        workerLvl: "worker-lvl",
        workerExp: "worker-exp",
        workerResources: "worker-resources",
        workerBtn: "worker-calc",
        workerAns: "worker-answer",
        mainPanel: "main"
    };
    //Disable scroll
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = { 38: 1, 40: 1 };

    function preventDefault(e) {
        e.preventDefault();
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    // modern Chrome requires { passive: false } when adding event
    var supportsPassive = false;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () { supportsPassive = true; }
        }));
    } catch (e) { }

    var wheelOpt = supportsPassive ? { passive: false } : false;
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    //Public functions
    return {
        getDOMStrings: function () {
            return DOMStrings
        },
        getInput: function (type) {
            return {
                lvl: parseFloat(document.getElementById(DOMStrings[type + "Lvl"]).value),
                exp: parseFloat(document.getElementById(DOMStrings[type + "Exp"]).value),
                resources: parseFloat(document.getElementById(DOMStrings[type + "Resources"]).value),
            };
        },
        disableScroll: function () {
            window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
            window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
            window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
            window.addEventListener('keydown', preventDefaultForScrollKeys, false);
        },
        enableScroll: function () {
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
            window.removeEventListener('touchmove', preventDefault, wheelOpt);
            window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
        }
    }
})()
/********************************************************************************/
/*********************GLOBAL APP CONTROLER MODULE********************************/
/********************************************************************************/
var controller = (function (Calcs, UICtrl) {
    var DOMStrings, input;
    DOMStrings = UICtrl.getDOMStrings();
    var setupEventListener = function () {
        document.getElementById(DOMStrings.mainPanel).addEventListener("click", function (event) {
            var clicked, input, type;
            clicked = event.target.id;
            type = clicked.split("-")[0];
            if (clicked === DOMStrings.merchantBtn) {
                input = UICtrl.getInput(type);
                console.log(input);
            } else if (clicked === DOMStrings.workerBtn) {
                input = UICtrl.getInput(type);
                console.log(input);
            } else if (clicked === DOMStrings.crafterBtn) {
                input = UICtrl.getInput(type);
                console.log(input);
            };
        })
    }
    //1. get input

    //2. calc values
    //3. print Ans to UI

    return {
        test: function () {
        },
        init: function () {
            console.log("App started...")
            UICtrl.disableScroll();
            setupEventListener();
        }
    }

})(Calculation, UIController);
controller.init();
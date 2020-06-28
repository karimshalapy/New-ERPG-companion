/********************************************************************************/
/********************************CALCULATION MODULE******************************/
/********************************************************************************/
var Calculation = (function () {
    var Answers = function (lvl, exp, maxExp) {
        this.lvl = lvl;
        this.exp = exp;
        this.maxExp = maxExp;
    };
    var merchantAns = new Answers(NaN, NaN, NaN);
    var workerAns = new Answers(NaN, NaN, NaN);
    var crafterAns = new Answers(NaN, NaN, NaN);

    var merchantEq = function (i) {
        var merchantReqEXP =
            3.073809219 * Math.pow(10, -12) * Math.pow(i, 8) -
            1.382695292 * Math.pow(10, -9) * Math.pow(i, 7) +
            2.623942521 * Math.pow(10, -7) * Math.pow(i, 6) -
            2.743200457 * Math.pow(10, -5) * Math.pow(i, 5) +
            1.739542291 * Math.pow(10, -3) * Math.pow(i, 4) -
            7.060781121 * Math.pow(10, -2) * Math.pow(i, 3) +
            2.063734323 * Math.pow(i, 2) +
            244.2821047 * i -
            147.8064184;
        return merchantReqEXP;
    };
    //Global functions
    return {
        merchantCalc: function (lvl, exp, resources) {
            var resourcesExp, totalExp, remainginExp;
            resourcesExp = resources / 5;
            totalExp = resourcesExp + exp;
            remainginExp = totalExp - merchantEq(lvl)
            while (remainginExp > 0 && lvl < 100) {
                lvl++;
                remainginExp -= merchantEq(lvl);
            };
            remainginExp += merchantEq(lvl);
            merchantAns.lvl = lvl;
            merchantAns.exp = Math.floor(remainginExp);
            merchantAns.maxExp = Math.floor(merchantEq(lvl));
        },
        getAnswers: function () {
            return {
                merchant: merchantAns,
                worker: workerAns,
                crafter: crafterAns,
            };
        },
    };

})();
/********************************************************************************/
/********************************UI CONTROL MODULE*******************************/
/********************************************************************************/
var UIController = (function (calcs) {
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
        mainPanel: "main",
        type: ["merchant", "crafter", "worker"],
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
        displayAns: function (type, input) {
            var answers = calcs.getAnswers();
            if (input.lvl > 0 && input.resources > 0 && input.lvl < 100) {
                if (answers[type].lvl === 100) {
                    if (type === DOMStrings.type[0]) {
                        document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>You will reach <span class="big">The Max Level</span> and your remaining logs will be <span class="big">' + answers[type].exp * 5 + '</span></p>'
                    }
                } else {
                    document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>Your will be level <span class="big">' + answers[type].lvl + '</span> and your EXP will be <span class="big">' + answers[type].exp + "/" + answers[type].maxExp + '</span> EXP</p>'
                }
            } else {
                document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>Please, input <span class="big"> proper values</span>!!</p>'
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
})(Calculation)
/********************************************************************************/
/*********************GLOBAL APP CONTROLER MODULE********************************/
/********************************************************************************/
var controller = (function (Calcs, UICtrl) {
    var DOMStrings, input;
    DOMStrings = UICtrl.getDOMStrings();
    var setupEventListener = function () {
        document.getElementById(DOMStrings.mainPanel).addEventListener("click", calcPrLvl)
    };
    var calcPrLvl = function (event) {
        var clicked, type, input;
        clicked = event.target.id;
        type = clicked.split("-")[0];
        if (clicked === DOMStrings.merchantBtn) {
            //get input
            input = UICtrl.getInput(type);
            //calc merchant
            Calcs.merchantCalc(input.lvl, input.exp, input.resources);
            //display merchant
            UICtrl.displayAns(type, input);
        } else if (clicked === DOMStrings.workerBtn) {
            //get input
            input = UICtrl.getInput(type);
            //calc worker

            //display worker
            UICtrl.displayAns(type, input);
        } else if (clicked === DOMStrings.crafterBtn) {
            //get input 
            input = UICtrl.getInput(type);
            //calc crafter

            //display crafter
            UICtrl.displayAns(type, input);
        };
    };
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
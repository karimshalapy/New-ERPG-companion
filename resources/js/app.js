/********************************************************************************/
/********************************CALCULATION MODULE******************************/
/********************************************************************************/
var Calculation = (function () {
    var Answers = function (lvl, exp, maxExp) {
        this.lvl = lvl;
        this.exp = exp;
        this.maxExp = maxExp;
    };
    var merchantAns = new Answers(0, 0, 0);
    var workerAns = new Answers(0, 0, 0);
    var crafterAns = new Answers(0, 0, 0);

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
    var crafterEq = function (logs) {
        var xp, epic;
        epic = 0;
        xp = 0;
        while (logs >= 25 || epic != 0) {
            if (logs >= 25) {
                xp += Math.floor(logs / 25);
                epic += Math.floor(logs / 25);
                logs %= 25;
            } else {
                logs += epic * 20;
                xp += epic;
                epic = 0;
            }
        }
        return xp;
    };
    //Old worker Eq
    /*var workerEq = function (i) {
        var workerReqEXP =
            1.076878361 * Math.pow(10, -9) * Math.pow(i, 7) -
            2.321194444 * Math.pow(10, -12) * Math.pow(i, 8) -
            2.114897735 * Math.pow(10, -7) * Math.pow(i, 6) +
            2.296274283 * Math.pow(10, -5) * Math.pow(i, 5) -
            1.515876881 * Math.pow(10, -3) * Math.pow(i, 4) +
            6.376572453 * Math.pow(10, -2) * Math.pow(i, 3) -
            1.83818616 * Math.pow(i, 2) +
            80.80037472 * i +
            13.55549276;
        return workerReqEXP;
    };*/
    var workerExpReqForLvl = [0, 64, 157, 237, 310, 379, 445, 508, 570, 630, 688, 746, 802, 857, 912, 965, 1018, 1070, 1122, 1173, 1223, 1273, 1322, 1371, 1420, 1468, 1516, 1563, 1610, 1657, 1703, 1749, 1795, 1840, 1885, 1930, 1975, 2019, 2063, 2107, 2151, 2194, 2238, 2281, 2324, 2366, 2409, 2451, 2493, 2535, 2577, 2618, 2659, 2701, 2742, 2783, 2823, 2864, 2905, 2945, 2985, 3025, 3065, 3105, 3145, 3184, 3224, 3263, 3302, 3341, 3380, 3419, 3458, 3496, 3535, 3573, 3612, 3650, 3688, 3726, 3764, 3802, 3839, 3877, 3915, 3952, 3989, 4027, 4064, 4101, 4138, 4175, 4212, 4249, 4285, 4322, 4358, 4395, 4431, 4468]
    //Global functions
    return {
        merchantCalc: function (lvl, exp, resources) {
            var resourcesExp, totalExp, remainingExp;
            resourcesExp = resources / 5;
            totalExp = resourcesExp + exp;
            remainingExp = totalExp - merchantEq(lvl);
            while (remainingExp > 0 && lvl < 100) {
                lvl++;
                remainingExp -= merchantEq(lvl);
            }
            remainingExp += merchantEq(lvl);
            merchantAns.lvl = lvl;
            merchantAns.exp = Math.round(remainingExp);
            merchantAns.maxExp = Math.round(merchantEq(lvl));
        },
        crafterCalc: function (lvl, exp, resources) {
            var resourcesExp, maxExpReqForLvl, remainingExpToLvlUp;
            resourcesExp = crafterEq(resources);
            maxExpReqForLvl = (lvl * 200) - 100;
            remainingExpToLvlUp = maxExpReqForLvl - exp;
            while (resourcesExp >= remainingExpToLvlUp && lvl !== 100) {
                if (remainingExpToLvlUp < maxExpReqForLvl) {
                    maxExpReqForLvl = lvl * 200 - 100;
                    remainingExpToLvlUp = maxExpReqForLvl - exp;
                    resourcesExp -= remainingExpToLvlUp;
                    lvl++;
                    exp = 0;
                    maxExpReqForLvl = lvl * 200 - 100;
                    remainingExpToLvlUp = maxExpReqForLvl - exp;
                } else {
                    maxExpReqForLvl = lvl * 200 - 100;
                    remainingExpToLvlUp = maxExpReqForLvl - exp;
                    resourcesExp -= remainingExpToLvlUp;
                    lvl++;
                }
            }
            crafterAns.lvl = lvl;
            crafterAns.exp = exp + resourcesExp;
            crafterAns.maxExp = maxExpReqForLvl;
        },
        workerCalc: function (lvl, exp, resources) {
            var resourcesExp, totalExp;
            resourcesExp = resources / 151.2;
            totalExp = resourcesExp + exp;
            while (totalExp > workerExpReqForLvl[lvl] && lvl !== 100) {
                totalExp -= workerExpReqForLvl[lvl];
                lvl++;
            }
            workerAns.lvl = lvl;
            workerAns.exp = Math.round(totalExp);
            workerAns.maxExp = workerExpReqForLvl[lvl];
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
        merchantOldLvl: "merchant__lvl-old-input",
        merchantOldExp: "merchant__exp-old-input",
        merchantOldResources: "merchant__resources-old-input",
        crafterOldLvl: "crafter__lvl-old-input",
        crafterOldExp: "crafter__exp-old-input",
        crafterOldResources: "crafter__resources-old-input",
        workerOldLvl: "worker__lvl-old-input",
        workerOldExp: "worker__exp-old-input",
        workerOldResources: "worker__resources-old-input",

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
            return DOMStrings;
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
                        document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>You will reach <span class="big">The Max Level</span> and your remaining logs will be <span class="big">' + answers[type].exp * 5 + '</span></p>';
                    } else if (type === DOMStrings.type[1]) {
                        document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>You will reach <span class="big">The Max Level</span></p>';
                    } else if (type === DOMStrings.type[2]) {
                        document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>You will reach <span class="big">The Max Level</span> and your remaining logs will be <span class="big">' + Math.floor(answers[type].exp * 151.2) + '</span></p><p class="sub-text">P.S. this function calculates the exp gained from Banana Pickaxe according to A11 trade rates.</p>';
                    }
                } else {
                    if (type === DOMStrings.type[1]) {
                        document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>Your will be level <span class="big">' + answers[type].lvl + '</span> and your EXP will be <span class="big">' + answers[type].exp + "/" + answers[type].maxExp + '</span> EXP</p><p class="sub-text">P.S. this function calculates the exp gained from the raw resources you have and not the 10% crafter proc so you will definitely have higher lvl</p>';
                    } else if (type === DOMStrings.type[2]) {
                        document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>Your will be level <span class="big">' + answers[type].lvl + '</span> and your EXP will be <span class="big">' + answers[type].exp + "/" + answers[type].maxExp + '</span> EXP</p><p class="sub-text">P.S. this function calculates the exp gained from Banana Pickaxe according to A11 trade rates.</p>';
                    } else if (type === DOMStrings.type[0]) {
                        document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>Your will be level <span class="big">' + answers[type].lvl + '</span> and your EXP will be <span class="big">' + answers[type].exp + "/" + answers[type].maxExp + '</span> EXP</p>';
                    }
                }
                //display old input
                document.getElementById(DOMStrings[type + "OldLvl"]).innerText = "Old Input: " + input.lvl;
                document.getElementById(DOMStrings[type + "OldExp"]).innerText = "Old Input: " + input.exp;
                document.getElementById(DOMStrings[type + "OldResources"]).innerText = "Old Input: " + input.resources;
            } else {
                document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>Please, input <span class="big"> proper values</span>!!</p>';
            }
        },
        clearFields: function (type) {
            var fields, fieldsArr;
            fields = document.querySelectorAll("#" + DOMStrings[type + "Lvl"] + ", " + "#" + DOMStrings[type + "Exp"] + ", " + "#" + DOMStrings[type + "Resources"]);
            fieldsArr = Array.from(fields);
            fieldsArr.forEach(function (current) {
                current.value = "";
            });
            fieldsArr[0].focus();
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
    };
})(Calculation);
/********************************************************************************/
/*********************GLOBAL APP CONTROLER MODULE********************************/
/********************************************************************************/
var controller = (function (Calcs, UICtrl) {
    var DOMStrings;
    DOMStrings = UICtrl.getDOMStrings();
    var setupEventListener = function () {
        document.getElementById(DOMStrings.mainPanel).addEventListener("click", function (event) {
            var clicked = event.target.id;
            if (clicked === DOMStrings.merchantBtn || clicked === DOMStrings.crafterBtn || clicked === DOMStrings.workerBtn) {
                calcPrLvl(event);
            }
        });
        document.getElementById(DOMStrings.mainPanel).addEventListener("keypress", function (event) {
            if (event.which === 13 || event.keyCode === 13) {
                calcPrLvl(event);
            }
        });
    };
    var calcPrLvl = function (event) {
        var clicked, type, input;
        clicked = event.target.id;
        type = clicked.split("-")[0];
        if (type === DOMStrings.type[0]) {
            //get input
            input = UICtrl.getInput(type);
            //calc merchant
            Calcs.merchantCalc(input.lvl, input.exp, input.resources);
            //display merchant
            UICtrl.displayAns(type, input);
        } else if (type === DOMStrings.type[2]) {
            //get input
            input = UICtrl.getInput(type);
            //calc worker
            Calcs.workerCalc(input.lvl, input.exp, input.resources);
            //display worker
            UICtrl.displayAns(type, input);
        } else if (type === DOMStrings.type[1]) {
            //get input 
            input = UICtrl.getInput(type);
            //calc crafter
            Calcs.crafterCalc(input.lvl, input.exp, input.resources);
            //display crafter
            UICtrl.displayAns(type, input);
        }
        UICtrl.clearFields(type);
    };
    return {
        init: function () {
            console.log("App started...");
            UICtrl.disableScroll();
            setupEventListener();
        }
    };

})(Calculation, UIController);
controller.init();
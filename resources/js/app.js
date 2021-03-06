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
    var resourcesAns = {
        logs: 0,
        apples: 0,
    }

    //Old Merchant Eq
    /*var merchantEq = function (i) {
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
    };*/
    var merchantExpReqForLvl = [0, 113, 353, 603, 858, 1117, 1378, 1642, 1909, 2176, 2446, 2717, 2989, 3263, 3537, 3813, 4089, 4367, 4645, 4924, 5204, 5485, 5766, 6048, 6330, 6613, 6897, 7181, 7466, 7751, 8037, 8323, 8610, 8897, 9185, 9473, 9762, 10050, 10340, 10629, 10919, 11210, 11501, 11792, 12083, 12375, 12667, 12960, 13253, 13546, 13839, 14133, 14427, 14721, 15016, 15310, 15605, 15901, 16196, 16492, 16788, 17085, 17381, 17678, 17975, 18273, 18570, 18868, 19166, 19464, 19763, 20062, 20360, 20659, 20959, 21258, 21558, 21858, 22158, 22458, 22759, 23059, 23360, 23661, 23963, 24264, 24566, 24867, 25169, 25471, 25774, 26076, 26379, 26682, 26984, 27288, 27591, 27894, 28198, 28502];
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
    //Making lvls Array for crafter
    var crafterExpReqForLvl = [0];
    (function () {
        for (var i = 1; i < 100; i++) {
            crafterExpReqForLvl.push((i * 200) - 100);
        }
    })();
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
    var workerExpReqForLvl = [0, 64, 157, 237, 310, 379, 445, 508, 570, 630, 688, 746, 802, 857, 912, 965, 1018, 1070, 1122, 1173, 1223, 1273, 1322, 1371, 1420, 1468, 1516, 1563, 1610, 1657, 1703, 1749, 1795, 1840, 1885, 1930, 1975, 2019, 2063, 2107, 2151, 2194, 2238, 2281, 2324, 2366, 2409, 2451, 2493, 2535, 2577, 2618, 2659, 2701, 2742, 2783, 2823, 2864, 2905, 2945, 2985, 3025, 3065, 3105, 3145, 3184, 3224, 3263, 3302, 3341, 3380, 3419, 3458, 3496, 3535, 3573, 3612, 3650, 3688, 3726, 3764, 3802, 3839, 3877, 3915, 3952, 3989, 4027, 4064, 4101, 4138, 4175, 4212, 4249, 4285, 4322, 4358, 4395, 4431, 4468];
    //Global functions
    return {
        merchantCalc: function (lvl, exp, resources) {
            var resourcesExp, totalExp;
            resourcesExp = Math.floor(resources / 5);
            totalExp = resourcesExp + exp;
            while (totalExp >= merchantExpReqForLvl[lvl] && lvl < 100) {
                totalExp -= merchantExpReqForLvl[lvl];
                lvl++;
            }
            merchantAns.lvl = lvl;
            merchantAns.exp = totalExp;
            merchantAns.maxExp = merchantExpReqForLvl[lvl];
        },
        crafterCalc: function (lvl, exp, resources) {
            var resourcesExp, maxExpReqForLvl, remainingExpToLvlUp;
            resourcesExp = crafterEq(resources);
            maxExpReqForLvl = crafterExpReqForLvl[lvl];
            remainingExpToLvlUp = maxExpReqForLvl - exp;
            while (resourcesExp >= remainingExpToLvlUp && lvl !== 100) {
                if (remainingExpToLvlUp < maxExpReqForLvl) {
                    maxExpReqForLvl = crafterExpReqForLvl[lvl];
                    remainingExpToLvlUp = maxExpReqForLvl - exp;
                    resourcesExp -= remainingExpToLvlUp;
                    lvl++;
                    exp = 0;
                    maxExpReqForLvl = crafterExpReqForLvl[lvl];
                    remainingExpToLvlUp = maxExpReqForLvl - exp;
                } else {
                    maxExpReqForLvl = crafterExpReqForLvl[lvl];
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
            var resourcesExp, totalExp, remainingResources, remainingResAfer100;
            resourcesExp = Math.floor(resources / 15120) * 100;
            remainingResources = resources % 15120;
            totalExp = resourcesExp + exp;
            while (totalExp > workerExpReqForLvl[lvl] && lvl !== 100) {
                totalExp -= workerExpReqForLvl[lvl];
                lvl++;
            }
            if (lvl === 100) {
                remainingResAfer100 = (totalExp - totalExp % 100) * 151.2;
                remainingResources += remainingResAfer100;
            }
            workerAns.lvl = lvl;
            workerAns.exp = totalExp;
            workerAns.maxExp = workerExpReqForLvl[lvl];
            workerAns.remainingResources = Math.round(remainingResources);
        },
        expReqForLvl: {
            merchant: merchantExpReqForLvl,
            worker: workerExpReqForLvl,
            crafter: crafterExpReqForLvl,
        },
        resourcesCalc: function (type, resources) {
            if (type === "a3") {
                resourcesAns.log = resources * 2 * 3.75 * 1.5 * 1.5
            } else if (type === "a5") {
                resourcesAns.log = resources * 4 * 3.75 * 1.5 * 1.5
            } else if (type === "a7") {
                resourcesAns.log = resources * 1.5 * 1.5
            } else if (type === "a8") {
                resourcesAns.log = resources * 8 * 1.5 * 1.5
            } else if (type === "a9") {
                resourcesAns.log = resources * 2 * 1.5
            };
            resourcesAns.apples = resourcesAns.log / 8
        },
        getAnswers: function () {
            return {
                merchant: merchantAns,
                worker: workerAns,
                crafter: crafterAns,
                resources: resourcesAns,
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
        choice: "choose-panel",
        goBack: "go-back-location",
        merchantChoice: "merchant-start",
        crafterChoice: "crafter-start",
        workerChoice: "worker-start",
        resourcesChoice: "resources-start",
        swiperNext: "swiper-button-next",
        resourcesType: "resources-type",
        resourcesResources: "resources-resources",
        resourcesOldResources: "resources__resources-old-input",
        resourcesBtn: "resources-calc",
        resourcesAns: "resources-answer",
        type: ["welcome", "merchant", "crafter", "worker", "resources"],
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
            var lvl, exp, resources, type;
            if (DOMStrings[type + "Lvl"] && DOMStrings[type + "Exp"] && DOMStrings[type + "Resources"]) {
                lvl = parseFloat(document.getElementById(DOMStrings[type + "Lvl"]).value);
                exp = parseFloat(document.getElementById(DOMStrings[type + "Exp"]).value);
                resources = parseFloat(document.getElementById(DOMStrings[type + "Resources"]).value);
            } else if (DOMStrings[type + "Type"]) {
                type = document.getElementById(DOMStrings[type + "Type"]).value
                resources = parseFloat(document.getElementById(DOMStrings["resourcesResources"]).value);
            }
            return {
                lvl: lvl,
                exp: exp,
                resources: resources,
                type: type,
            };
        },
        displayAns: function (type, input) {
            var answers = calcs.getAnswers();
            if (input.lvl > 0 && input.resources > 0 && input.lvl < 100 && input.exp < calcs.expReqForLvl[type][input.lvl]) {
                if (answers[type].lvl === 100) {
                    if (type === DOMStrings.type[1]) {
                        document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>You will reach <span class="big">The Max Level</span> and your remaining logs will be <span class="big">' + answers[type].exp * 5 + '</span></p>';
                    } else if (type === DOMStrings.type[2]) {
                        document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>You will reach <span class="big">The Max Level</span></p>';
                    } else if (type === DOMStrings.type[3]) {
                        document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>You will reach <span class="big">The Max Level</span> and your remaining logs will be <span class="big">' + answers[type].remainingResources + '</span></p><p class="sub-text">P.S. this function calculates the exp gained from Banana Pickaxe according to A11 trade rates.</p>';
                    }
                } else {
                    if (type === DOMStrings.type[2]) {
                        document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>Your will be level <span class="big">' + answers[type].lvl + '</span> and your EXP will be <span class="big">' + answers[type].exp + "/" + answers[type].maxExp + '</span> EXP</p><p class="sub-text">P.S. this function calculates the exp gained from the raw resources you have and not the 10% crafter proc so you will definitely have higher lvl</p>';
                    } else if (type === DOMStrings.type[3]) {
                        document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>Your will be level <span class="big">' + answers[type].lvl + '</span> and your EXP will be <span class="big">' + answers[type].exp + "/" + answers[type].maxExp + '</span> and your remaining logs will be <span class="big">' + answers[type].remainingResources + '</span></p><p class="sub-text">P.S. this function calculates the exp gained from Banana Pickaxe according to A11 trade rates.</p>';
                    } else if (type === DOMStrings.type[1]) {
                        document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>Your will be level <span class="big">' + answers[type].lvl + '</span> and your EXP will be <span class="big">' + answers[type].exp + "/" + answers[type].maxExp + '</span> EXP</p>';
                    }
                }
                //display old input
                document.getElementById(DOMStrings[type + "OldLvl"]).innerText = "Old Input: " + input.lvl;
                document.getElementById(DOMStrings[type + "OldExp"]).innerText = "Old Input: " + input.exp;
                document.getElementById(DOMStrings[type + "OldResources"]).innerText = "Old Input: " + input.resources;
            } else if (DOMStrings[type + "Type"] && input.resources > 0 && input.type !== "select") {
                document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>Your A10 Logs will be <span class="big">' + Math.round(answers[type].log) + '</span> or your A11 Apples will be <span class="big">' + Math.round(answers[type].apples) + '</span></p>'
                document.getElementById(DOMStrings[type + "OldResources"]).innerText = "Old Input: " + input.resources;
            } else {
                document.getElementById(DOMStrings[type + "Ans"]).innerHTML = '<p>Please, input <span class="big"> proper values</span>!!</p>';
            }
        },
        clearFields: function (type) {
            var fields, fieldsArr;
            if (DOMStrings[type + "Lvl"] && DOMStrings[type + "Exp"] && DOMStrings[type + "Resources"]) {
                fields = document.querySelectorAll("#" + DOMStrings[type + "Lvl"] + ", " + "#" + DOMStrings[type + "Exp"] + ", " + "#" + DOMStrings[type + "Resources"]);
            } else if (DOMStrings[type + "Type"]) {
                fields = document.querySelectorAll("#" + DOMStrings[type + "Resources"]);
            }
            fieldsArr = Array.from(fields);
            fieldsArr.forEach(function (current) {
                current.value = "";
            });
            fieldsArr[0].focus();
        },
        hideGoBackBtn: function () {
            document.getElementById(DOMStrings.goBack).classList.remove("hide");
            document.getElementById(DOMStrings.goBack).classList.add("hide");
        },
        showGoBackBtn: function () {
            document.getElementById(DOMStrings.goBack).classList.remove("hide");
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
            if (clicked === DOMStrings.merchantBtn || clicked === DOMStrings.crafterBtn || clicked === DOMStrings.workerBtn || clicked === DOMStrings.resourcesBtn) {
                calcPrLvl(event);
            }
        });
        document.getElementById(DOMStrings.mainPanel).addEventListener("keypress", function (event) {
            if (event.which === 13 || event.keyCode === 13) {
                calcPrLvl(event);
            }
        });
        document.getElementById(DOMStrings.choice).addEventListener("click", function (event) {
            var clicked, type;
            clicked = event.target.id;
            type = clicked.split("-")[0];
            if (clicked === DOMStrings[type + "Choice"]) {
                changeSlide(type);
            }
        });

        document.getElementById(DOMStrings.goBack).addEventListener("click", goBackToChoice);
        document.querySelector("." + DOMStrings.swiperNext).addEventListener("click", UICtrl.showGoBackBtn);
    };
    var changeSlide = function (type) {
        mySwiper.slideTo(DOMStrings.type.indexOf(type));
        UICtrl.showGoBackBtn();
    };
    var goBackToChoice = function () {
        UICtrl.hideGoBackBtn();
        mySwiper.slideTo(0);
    };
    var calcPrLvl = function (event) {
        var clicked, type, input;
        clicked = event.target.id;
        type = clicked.split("-")[0];
        input = UICtrl.getInput(type);
        if (type === DOMStrings.type[1]) {
            Calcs.merchantCalc(input.lvl, input.exp, input.resources);
        } else if (type === DOMStrings.type[3]) {
            Calcs.workerCalc(input.lvl, input.exp, input.resources);
        } else if (type === DOMStrings.type[2]) {
            Calcs.crafterCalc(input.lvl, input.exp, input.resources);
        } else if (type === DOMStrings.type[4]) {
            Calcs.resourcesCalc(input.type, input.resources);
            console.log(clicked, type)
        }
        UICtrl.displayAns(type, input);
        UICtrl.clearFields(type);
    };
    return {
        init: function () {
            console.log("App started...");

            //app functions
            UICtrl.disableScroll();
            setupEventListener();
        }
    };

})(Calculation, UIController);

controller.init();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//swiper functions
var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    simulateTouch: false,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
/*********************************************/
/***Dropdown menu code************************/

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
//CALCULATION MODULE
var Calculation = (function () {

})();
//UI CONTROL MODULE
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
    };
    //Public functions
    return {
        getDOMStrings: function () {
            return DOMstrings
        },
    }
})()
//GLOBAL APP CONTROLER MODULE
var Controller = (function (Calcs, UICtrl) {
    var DOMStrings = UICtrl.getDOMStrings()
})(Calculation, UIController);

let app = angular.module('app-calculator', []);


app.controller('mainController', function($scope, $http){

    $scope.reward = 3804.80;
    $scope.difficulty = 0;

    $scope.hashingPower = 0.5;
    $scope.machineWattage = 800;
    $scope.powerCost = 0.12;

    $scope.bitcoin = {
        time: Date.now(),
        exchangerates: {
            usd: 0,
            gbp: 0,
            eur: 0
        }
    };

    $scope.hashingUnitOptions = {
        availablehashingUnits: [
            {value: 1, name: 'H/s'},
            {value: 1000, name: 'KH/s'},
            {value: 1000000, name: 'MH/s'},
            {value: 1000000000, name: 'GH/s'},
            {value: 1000000000000, name: 'TH/s'},

        ],
        selectedHashingUnit: {value: 1000000000, name: 'GH/s'}
    };

    $http.get('https://api.coingecko.com/api/v3/simple/price?ids=note-blockchain&vs_currencies=USD%2CGBP%2CEUR').then(function (response) {

        let cdr = response.data;

        $scope.bitcoin.exchangerates.usd = parseFloat(cdr['note-blockchain'].usd);
        $scope.bitcoin.exchangerates.gbp = parseFloat(cdr['note-blockchain'].gbp);
        $scope.bitcoin.exchangerates.eur = parseFloat(cdr['note-blockchain'].eur);

    });

    $http.get('https://blocks.notebc.space/api/getdifficulty').then(function (response) {
        $scope.difficulty = parseFloat(response.data);
    });

    // Get current Network Hashps
    $http.get('https://blocks.notebc.space/api/getnetworkhashps').then(function (response) {
        $scope.globalhashps = parseInt(response.data);
    });

    // Get pool HashPS
    $http.get('https://cors-anywhere.herokuapp.com/https://mining.notebc.space/api/currencies').then(function (reponse) {
        let cdr = reponse.data;
        $scope.ntbcspacehash = parseInt(cdr['NTBC'].hashrate);
    });

    $http.get('https://cors-anywhere.herokuapp.com/http://farm.cryptocrop.net/api/currencies').then(function (reponse) {
        let cdr = reponse.data;
        $scope.cryptocrophash = parseInt(cdr['ntbc'].hashrate);
    });

    $scope.getBTCPerDay_Exact = function () {
        return 86400 / ($scope.difficulty * (Math.pow(2,32)) / ($scope.hashingPower * $scope.hashingUnitOptions.selectedHashingUnit.value)) * $scope.reward;
    };

    // Use precision when returns are less than zero.
    $scope.getBTCPerDay = function () {
        let temp = $scope.getBTCPerDay_Exact();
        if (temp < 0) {
            return temp.toPrecision(2);
        }
        else {
            return temp.toFixed(2);
        }
    };

    $scope.getUSDPerDay = function () {
        let temp = $scope.getBTCPerDay_Exact();
        temp *= $scope.bitcoin.exchangerates.usd;
        return temp.toFixed(2);
    };

    $scope.getGBPPerDay = function () {
        let temp = $scope.getBTCPerDay_Exact();
        temp *= $scope.bitcoin.exchangerates.gbp;
        return temp.toFixed(2);
    };

    $scope.getEURPerDay = function () {
        let temp = $scope.getBTCPerDay_Exact();
        temp *= $scope.bitcoin.exchangerates.eur;
        return temp.toFixed(2);
    };

    $scope.getPowerCostPerDay = function () {
        let temp = $scope.machineWattage * $scope.powerCost / 1000 * 24;
        return temp.toFixed(2);
    };

    $scope.getProfitPerDay = function () {
        let temp = $scope.getUSDPerDay() - $scope.getPowerCostPerDay();
        return temp.toFixed(2);
    };

    // Additional Functions added
    $scope.hashtohuman = function($hashrate) {
        let hunit = " H/s";
        let temp = $hashrate;
        if (temp > 1000000000000) {
            temp = temp / 1000000000000;
            hunit = " TH/s";
        } else if (temp > 1000000000) {
            temp = temp / 1000000000;
            hunit = " GH/s";
        } else if (temp > 1000000) {
            temp = temp / 1000000;
            hunit = " MH/s";
        } else if (temp > 1000) {
            temp = temp / 1000;
            hunit = " KH/s";
        }
        temp = temp.toFixed(2);
        return temp + hunit;
    }
    // Current Global network Hash/s
    $scope.getGlobalHashps = function () {
        let temp = $scope.hashtohuman($scope.globalhashps);
        return temp;
    }
    // Current difficulty
    $scope.getDifficulty = function () {
        let temp = $scope.difficulty.toFixed(4);
        return temp;
    }

    // Pool Hashps
    $scope.hashnotebcspace = function() {
        let temp = $scope.hashtohuman($scope.ntbcspacehash);
        return temp;
    }
    $scope.percnotebcspace = function() {
        let temp = 100 * ($scope.ntbcspacehash/$scope.globalhashps);
        return temp.toFixed(2);
    }
    $scope.hashcryptocrop = function() {
        let temp = $scope.hashtohuman($scope.cryptocrophash);
        return temp;
    }
    $scope.perccryptocrop = function() {
        let temp = 100 * ($scope.cryptocrophash/$scope.globalhashps);
        return temp.toFixed(2);
    }
    // Rejected code
    $scope.hashnotebcspacev1 = function() {
        //let temp =
        let temp = '<td>' + $scope.hashtohuman($scope.ntbcspacehash); + '</td>';
        let perce = 100 * ($scope.ntbcspacehash/$scope.globalhashps);
        temp += '<td><progress class="progress is-primary" value="'+ perce.toFixed(0) +'" max="100">' + perce.toFixed(2) + '%</progress></td>';
        return temp;
    }
});

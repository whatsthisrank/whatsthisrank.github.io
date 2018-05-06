const IMG_URL_PLACEHOLDER = "@IMGID@";
const CSS_RANK_IMG_HEIGHT = 40;

var gameData = {
    csgo: {
        "numRanks": 18,
        "name": "Counter Strike: Global Offensive",
        "baseUrl": "https://csgo-stats.com",
        "imgUrl": "/custom/img/ranks/" + IMG_URL_PLACEHOLDER + ".png",
        "startIdx": 1,
        "rankNames": [
            "Silver I",
            "Silver II",
            "Silver III",
            "Silver IV",
            "Silver Elite",
            "SEM",
            "Gold Nova I",
            "Gold Nova II",
            "Gold Nova III",
            "GNM",
            "MG1",
            "MG2",
            "MGE",
            "DMG",
            "LE",
            "LEM",
            "SMFC",
            "Global Elite"
        ]
    },
    lol: {
        "numRanks": 7,
        "name": "League of Legends",
        "baseUrl": "https://cdn.leagueofgraphs.com",
        "imgUrl": "/img/league-icons/160/" + IMG_URL_PLACEHOLDER + "-1.png",
        "startIdx": 1,
        "rankNames": [
            "Bronze",
            "Silver",
            "Gold",
            "Platinum",
            "Diamond",
            "Master",
            "Challenger"
        ]
    },
    dota2: {
        "numRanks": 8,
        "name": "Dota 2",
        "baseUrl": "./assets/img/dota2",
        "imgUrl": "/dota2-" + IMG_URL_PLACEHOLDER + ".png",
        "startIdx": 0,
        "rankNames": [
            "Herald",
            "Guardian",
            "Crusader",
            "Archon",
            "Legend",
            "Ancient",
            "Divine",
            "Divine 5-stars"
        ]
    },
    rl: {
        "numRanks": 19,
        "name": "Rocket League",
        "baseUrl": "https://rocketleague.tracker.network",
        "imgUrl": "/Images/RL/ranked/s4-" + IMG_URL_PLACEHOLDER + ".png",
        "startIdx": 1,
        "rankNames": [
            "Bronze 1",
            "Bronze 2",
            "Bronze 3",
            "Silver 1",
            "Silver 2",
            "Silver 3",
            "Gold 1",
            "Gold 2",
            "Gold 3",
            "Platinum 1",
            "Platinum 2",
            "Platinum 3",
            "Diamond 1",
            "Diamond 2",
            "Diamond 3",
            "Champion 1",
            "Champion 2",
            "Champion 3",
            "Grand Champ"
        ]
    },
    hots: {
        "numRanks": 7,
        "name": "Heroes of the Storm",
        "baseUrl": "./assets/img/hots",
        "imgUrl": "/" + IMG_URL_PLACEHOLDER + ".png",
        "startIdx": 0,
        "rankNames": [
            "Bronze",
            "Silver",
            "Gold",
            "Platinum",
            "Diamond",
            "Master",
            "Grand Master"
        ]
    },
    ow:{
        "numRanks": 7,
        "name": "Overwatch",
        "baseUrl": "./assets/img/ow",
        "imgUrl": "/" + IMG_URL_PLACEHOLDER + ".png",
        "startIdx": 0,
        "rankNames": [
            "Bronze",
            "Silver",
            "Gold",
            "Platinum",
            "Diamond",
            "Master",
            "Grand Master"
        ]
    }
}

var fetchGameRanks = function(game, column){
    if(game == "def"){
        return;
    }
    resetColumnAdjustedSpacing();

    var columnId = "#" + column;
    $(columnId).empty();

    var columnCssIdentifier = column == "rightColumn" ? "right-column" : "left-column";

    var data = gameData[game];
    for(var i = 0; i < data.numRanks; i++){
        var newRankEle = ''+
        '<div class="rank-container ' + column + '">'+
            '<img class="rank-img ' + columnCssIdentifier + '" src="' + data.baseUrl + data.imgUrl.replace(IMG_URL_PLACEHOLDER, i+data.startIdx) + '" />'+
            '<span class="rank-txt ' + columnCssIdentifier + '">' + data.rankNames[i] + '</span>'+
        '</div>';

        $(columnId).append(newRankEle);
    }

    if($("#leftColumnGame").val() != "def" && $("#rightColumnGame").val() != "def"){
        calculateSpacing();
    }
}

var calculateSpacing = function(){
    var game1 = $("#leftColumnGame").val();
    var game2 = $("#rightColumnGame").val();

    if(gameData[game1].numRanks != gameData[game2].numRanks){
        var game1Ranks = gameData[game1].numRanks;
        var game2Ranks = gameData[game2].numRanks;
        // we need to adjust the margins to properly align the game ranks
        var gameToAdjust = game1Ranks > game2Ranks ? game2 : game1;
        var gameToAdjustTo = game1Ranks > game2Ranks ? game1 : game2;

        var differenceInNumOfRanks = gameData[gameToAdjustTo].numRanks - gameData[gameToAdjust].numRanks;
        
        //NOTE the following logic will be directly tied to the height of the img elements
        // currently set to 40px
        var verticalPixelsToMakeUp = 40 * differenceInNumOfRanks;
        var pixelsToMakeUpPerRank = verticalPixelsToMakeUp / gameData[gameToAdjust].numRanks;
        var pixelsToMakeUpPerRankHalf = pixelsToMakeUpPerRank / 2;

        var columnWeAreAdjusting = gameToAdjust == game1 ? "leftColumn" : "rightColumn";
        var columnClass = ".rank-container." + columnWeAreAdjusting;
        $(columnClass).css("margin-bottom", pixelsToMakeUpPerRank + "px"); // make up the pixels
        $(columnClass).css("margin-top", pixelsToMakeUpPerRankHalf + "px"); // shift them all down
    }
}

var resetColumnAdjustedSpacing = function(){
    $(".rank-container.leftColumn").css("margin-bottom", 0);
    $(".rank-container.leftColumn").css("margin-top", 0);
    $(".rank-container.rightColumn").css("margin-bottom", 0);
    $(".rank-container.rightColumn").css("margin-top", 0);
}

$(document).ready(function(){
    // populate the select inputs with games
    var dropdowns = $(".gameSelector");
    for(var i = 0; i < dropdowns.length; i++){
        var thisDropdown = dropdowns[i];
        for(var key in gameData){
            $(thisDropdown).append("<option value='" + key + "'>" + gameData[key].name + "</option>");
        }
    }
});
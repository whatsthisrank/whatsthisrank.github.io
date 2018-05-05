const IMG_URL_PLACEHOLDER = "@IMGID@";
const CSS_RANK_IMG_HEIGHT = 40;

var gameData = {
    csgo: {
        "numRanks": 18,
        "name": "Counter Strike: Global Offensive",
        "baseUrl": "https://csgo-stats.com",
        "imgUrl": "/custom/img/ranks/" + IMG_URL_PLACEHOLDER + ".png",
        "startIdx": 1
    },
    lol: {
        "numRanks": 7,
        "name": "League of Legends",
        "baseUrl": "https://cdn.leagueofgraphs.com",
        "imgUrl": "/img/league-icons/160/" + IMG_URL_PLACEHOLDER + "-1.png",
        "startIdx": 1
    },
    dota2: {
        "numRanks": 8,
        "name": "Dota 2",
        "baseUrl": "./assets/img/dota2",
        "imgUrl": "/dota2-" + IMG_URL_PLACEHOLDER + ".png",
        "startIdx": 0
    },
    rl: {
        "numRanks": 19,
        "name": "Rocket League",
        "baseUrl": "https://rocketleague.tracker.network",
        "imgUrl": "/Images/RL/ranked/s4-" + IMG_URL_PLACEHOLDER + ".png",
        "startIdx": 1
    },
    hots: {
        "numRanks": 7,
        "name": "Heroes of the Storm",
        "baseUrl": "./assets/img/hots",
        "imgUrl": "/" + IMG_URL_PLACEHOLDER + ".png",
        "startIdx": 0
    },
    ow:{
        "numRanks": 7,
        "name": "Overwatch",
        "baseUrl": "./assets/img/ow",
        "imgUrl": "/" + IMG_URL_PLACEHOLDER + ".png",
        "startIdx": 0
    }
}

var fetchGameRanks = function(game, column){
    if(game == "def"){
        return;
    }
    resetColumnAdjustedSpacing();

    var columnId = "#" + column;
    $(columnId).empty();
    var data = gameData[game];
    for(var i = 0; i < data.numRanks; i++){
        $(columnId).append("<img height='" + CSS_RANK_IMG_HEIGHT + "' class='rank rank-" + column + "' src='" + data.baseUrl + data.imgUrl.replace(IMG_URL_PLACEHOLDER, i+data.startIdx) + "'/>")
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
        var columnClass = ".rank-" + columnWeAreAdjusting;
        $(columnClass).css("margin-bottom", pixelsToMakeUpPerRank + "px"); // make up the pixels
        $(columnClass).css("margin-top", pixelsToMakeUpPerRankHalf + "px"); // shift them all down
    }
}

var resetColumnAdjustedSpacing = function(){
    $(".rank-leftColumn").css("margin-bottom", 0);
    $(".rank-leftColumn").css("margin-top", 0);
    $(".rank-rightColumn").css("margin-bottom", 0);
    $(".rank-rightColumn").css("margin-top", 0);
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
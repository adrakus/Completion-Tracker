import apiClientSteam from './clientSteam';

const API_KEY = process.env.REACT_APP_STEAM_API_KEY;

const libraryEndpoint = '/IPlayerService/GetOwnedGames/v0001';
const achievementsEndpoint = '/ISteamUserStats/GetPlayerAchievements/v1';

//Gets steam library
export const getLibrary = async (steamID, cancelToken) => {
    let error;
    let games;

    const response = await apiClientSteam(cancelToken).get(libraryEndpoint+`/?key=${API_KEY}&steamid=${steamID}&format=json&include_appinfo=true`);

    if (response.ok){
        games = response.data.response.games;
    }else{
        error = 'An unexpected error has occured. Please try again later.';
    };

    return{
        error,
        games
    };
};

//Gets steam achievements
export const getAchievements = async (steamID, appID, cancelToken) => {
    let error;
    let achievements;

    const response = await apiClientSteam(cancelToken).get(achievementsEndpoint+`/?key=${API_KEY}&steamid=${steamID}&appid=${appID}`);

    if (response.ok){
        achievements = response.data.playerstats.achievements;
    }else{
        error = 'An unexpected error has occured. Please try again later.';
    };

    return{
        error,
        achievements
    };
};

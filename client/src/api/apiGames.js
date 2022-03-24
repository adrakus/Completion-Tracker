import apiClientTokenAuth from './clientTokenAuth';

const endpoint = '/api/game';

//TOKEN AUTH

//Gets user's games
export const getGames = async (token, cancelToken) => {
    let error;
    let games;
    
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint);
    if (response.ok){
        games = response.data.games;
    }
    else{
        error = 'An unexpected error has occured. Please try again later.';
    };

    return{
        error,
        games
    };
};

//Gets a single game
export const getGame = async (appID, token, cancelToken) => {
    let error;
    let game;
    
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+`/${appID}`);
    if (response.ok){
        game = response.data;
    }
    else{
        error = 'An unexpected error has occured. Please try again later.';
    };

    return{
        error,
        game
    };
};

//Adds one or more games to the user's list
export const postGames = async (games, token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).post(endpoint, games);

    return response.ok;
};

//Updates a game's tags
export const putGame = async (appID, data, token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint+`/${appID}`, data);

    return response.ok;
};

//Deletes a game
export const deleteGame = async (appID, token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint+`/${appID}`);

    return response.ok;
};

import Typography from '@mui/material/Typography';

export default function Homepage() {
    return (
        <>
            <h1>Welcome to my site!</h1>
            <Typography sx={{ml: 3, mt:4}} variant="h5">Future Features:</Typography>
            <Typography sx={{ml: 7, mt: 2}} variant="h6">- User:</Typography>
            <Typography sx={{ml: 11}}>- OpenID integration</Typography>
            <Typography sx={{ml: 7, mt: 2}} variant="h6">- Games:</Typography>
            <Typography sx={{ml: 11}}>- Average Completion time stats for games</Typography>
            <Typography sx={{ml: 11}}>- Game genres</Typography>
            <Typography sx={{ml: 11}}>- Achievments data for each game</Typography>
            <Typography sx={{ml: 11}}>- Allow for searching, filtering, and sorting</Typography>
            <Typography sx={{ml: 11}}>- Allow user to add in non-steam games (Other APIs?)</Typography>
            <Typography sx={{ml: 11}}>- Games list automatically updating whenever a new game is in your library</Typography>
            <Typography sx={{ml: 7, mt: 3}} variant="h6">- Style:</Typography>
            <Typography sx={{ml: 11}}>- A good looking dark theme</Typography>
            <Typography sx={{ml: 11}}>- Better responsiveness for smaller devices</Typography>
        </>
    );
};

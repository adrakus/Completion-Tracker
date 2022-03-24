import { useState, useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyButton from './MyButton';
import { AppContext } from '../context/AppContext';
import useGetGames from '../hooks/useGetGames';
import useSteamLibrary from '../hooks/useSteamLibrary';
import useAddGames from '../hooks/useAddGames';
import useDeleteGame from '../hooks/useDeleteGame';
import useEditGame from '../hooks/useEditGame';

export default function Games(){
  const {games, setGames} = useContext(AppContext);
  const [library, setLibrary] = useState([]);
  const [error, setError] = useState('');
  const [migrate, setMigrate] = useState(false);
  const [migrateProgress, setMigrateProgress] = useState(false);
  const [updateGames, setUpdate] = useState(false);
  const [deleteApp, setDeleteApp] = useState();
  const [updateGame, setUpdateGame] = useState({appID:null, main:false, dlc:false})
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [_page, _setPage] = useState(0);
  const [addAppIDs, setAddAppIDs] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useSteamLibrary(library, setError, setLibrary)
  useGetGames(setGames, setError, updateGames, setUpdate);
  useAddGames(addAppIDs, migrate, setMigrate, setUpdate);
  useDeleteGame(deleteApp, setDeleteApp);
  useEditGame(updateGame, setUpdateGame);

  const handleMigrate = () => {
    setAddAppIDs(library?.map(game => game.appID));
    setMigrate(true);
    setMigrateProgress(true);
  };

  const handleDelete = (appID) => {
    setGames(games.filter(game => game.app_id!==appID));
    setDeleteApp(appID);
  };

  const handleMainChange = (appID) => {
    let updatedGame = games.filter(game => game.app_id===appID)[0]
    let updatedList = games.filter(game => game.app_id!==appID)
    updatedGame.main_complete = !updatedGame.main_complete
    updatedList.push(updatedGame);
    setGames(updatedList);
    setUpdateGame({appID:appID, main:true, dlc:false});
  };

  const handleDLCChange = (appID) => {
    let updatedGame = games.filter(game => game.app_id===appID)[0]
    let updatedList = games.filter(game => game.app_id!==appID)
    updatedGame.dlc_complete = !updatedGame.dlc_complete
    updatedList.push(updatedGame);
    setGames(updatedList);
    setUpdateGame({appID:appID, main:false, dlc:true}); 
  };

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const _handleChangePage = (event, newPage) => {
    _setPage(newPage);
  };

  const handleAddGame = (appID) => {
    setAddAppIDs([appID]);
    setMigrate(true);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
};

  return(
    <>
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4">Steam</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          {games[0]==='empty' ? 
            <>
              {!migrateProgress ? 
                <MyButton onClick={handleMigrate}>Migrate Library</MyButton>
              :
                <Box sx={{display: "flex"}}>
                  <MyButton>Migrating Library</MyButton>
                  <CircularProgress sx={{ml: 2}}/>
                </Box>
              }
            </>
          : 
            <> 
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell><Typography variant="h6">Name</Typography></TableCell>
                      <TableCell align="right" ><Typography variant="h6">Playtime (Hours)</Typography></TableCell>
                      {/*<TableCell align="right"><Typography variant="h6">Achievements</Typography></TableCell>*/}
                      <TableCell align="right"><Typography variant="h6">Main Game</Typography></TableCell>
                      <TableCell align="right"><Typography variant="h6">DLC</Typography></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {library.filter(game => games?.map(game => game.app_id).includes(game.appID)).slice(page*rowsPerPage, (page+1)*rowsPerPage).map((game) => (
                      <TableRow
                        key={game.appID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          <Link 
                            href={`https://store.steampowered.com/app/${game.appID}`} 
                            target="blank" 
                            rel="noopener noreferrer" 
                            sx={{color: "black", textDecoration: "none", display: "flex", alignItems: "center"}}
                          >
                            <img 
                              src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appID}/${game.icon}.jpg`} 
                              style={{marginRight: 5}}
                              alt={game.name}
                            />
                            {game.name}
                          </Link>
                        </TableCell>
                        <TableCell align="right">{(game.playtime/60).toFixed(1)}</TableCell>
                        {/*<TableCell align="right">{}</TableCell>*/}
                        <TableCell align="right">
                          <Checkbox checked={games.filter(_game => _game.app_id===game.appID)[0].main_complete} onChange={() => handleMainChange(game.appID)} disableRipple={true}/>
                        </TableCell>
                        <TableCell align="right">
                          <Checkbox checked={games?.filter(_game => _game.app_id===game.appID)[0].dlc_complete} onChange={() => handleDLCChange(game.appID)} disableRipple={true}/>
                        </TableCell>
                        <TableCell align="right"><MyButton onClick={()=>handleDelete(game.appID)}>Delete</MyButton></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <TablePagination
                  component="div"
                  count={Object.keys(games).length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <MyButton sx={{position: "absolute", right: "32px"}} onClick={handleOpen}>Add Game</MyButton>
              </Box>
            </>
          }
        </AccordionDetails>
      </Accordion>
      <Typography sx={{color: 'red', marginTop: "10px"}}>{error}</Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{alignSelf: "center"}}>
              Add Game:
            </Typography>
            <Box id="modal-modal-description" sx={{ mt: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                  {library.filter(game => !games.map(game => game.app_id).includes(game.appID)).slice(_page*10, (_page+1)*10).map(game => (
                    <TableRow
                      key={game.appID}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link 
                          href={`https://store.steampowered.com/app/${game.appID}`} 
                          target="blank" 
                          rel="noopener noreferrer" 
                          sx={{color: "black", textDecoration: "none", display: "flex", alignItems: "center"}}
                        >
                          <img 
                            src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appID}/${game.icon}.jpg`} 
                            style={{marginRight: 5}}
                            alt={game.name}
                          />
                          {game.name}
                        </Link>
                      </TableCell>
                      <TableCell align="right"><MyButton onClick={()=>handleAddGame(game.appID)}>Add Game</MyButton></TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={Object.keys(library).length-Object.keys(games).length}
                page={_page}
                onPageChange={_handleChangePage}
                rowsPerPage={10}
                rowsPerPageOptions={[]}
              />
            </Box>
          </>
        </Box>
      </Modal>
    </>
  );
}

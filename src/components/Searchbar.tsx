// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import Autocomplete from "@mui/material/Autocomplete";
import { getAllGames, Game } from "../api";
import { useEffect, useState } from "react";

export default function Searchbar() {
  const [allGames, setAllGames] = useState<Game[]>([]);
  useEffect(() => {
    getAllGames().then((gameData) => {
      setAllGames(gameData);
    });
  }, []);

  return (
    <p>Searchbar</p>
    // <Stack spacing={2} sx={{ width: 300 }}>
    //   <Autocomplete
    //     freeSolo
    //     id="free-solo-2-demo"
    //     disableClearable
    //     options={allGames.map((game) => game.name)}
    //     renderInput={(params) => (
    //       <TextField
    //         {...params}
    //         label="Search input"
    //         slotProps={{
    //           input: {
    //             ...params.InputProps,
    //             type: "search",
    //           },
    //         }}
    //       />
    //     )}
    //   />
    // </Stack>
  );
}

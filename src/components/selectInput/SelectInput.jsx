import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import lupa from "../../utils/assets/lupa.svg"; // Certifique-se de importar sua imagem de lupa aqui

const SelectInput = ({}) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{
        width: 250,
        '& .MuiOutlinedInput-root': {
          borderRadius: '50px', // Bordas arredondadas
          backgroundColor: '#ECEAE5', // Cor de fundo personalizada
          height: '40px', // Altura reduzida
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ECEAE5', // Cor da borda
        },
        '& .MuiAutocomplete-endAdornment': {
          right: 0, // Alinha o ícone à direita
        },
        '& .MuiAutocomplete-inputRoot': {
          paddingRight: "35px", // Ajusta o espaço para o ícone da lupa
        },
        '& .MuiAutocomplete-listbox': {
          fontFamily: "'Product Sans', sans-serif", // Define a fonte para a caixa de opções
        },
        '& .MuiSvgIcon-root': {
          fill: "#9e9e9e", // Cor do ícone
          width: "20px", // Tamanho do ícone
          height: "20px", // Tamanho do ícone
        },
      }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label="" 
          style={{ fontFamily: "'Product Sans', sans-serif" }} // Aplicando a fonte diretamente no estilo
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <img id="lupaIcon" src={lupa} alt="Ícone de lupa" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }} />
            ),
          }}
        />
      )}
    />
  );
};

const top100Films = [
  { label: 'Simone Juhrs'},
  { label: 'Sergio Santos' },
  { label: 'Patricia Abilio'},
];

export default SelectInput;
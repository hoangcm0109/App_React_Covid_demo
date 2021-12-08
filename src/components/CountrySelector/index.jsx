import React from "react";
import { FormControl, FormHelperText, InputLabel, NativeSelect } from "@mui/material";

export default function CountrySelector({ value, handleOnChange, countries }) {
    return (
        <FormControl style={{ margin: '30px 0px'}}>
            <InputLabel htmlFor="" shrink>
                Quốc gia
            </InputLabel>
            <NativeSelect
                value={value}
                onChange={handleOnChange}
                inputProps={{
                    name: "country",
                    id: "country-selector",
                }}
            >
                {countries.map((country) => {
                    return (
                        <option
                            value={country.ISO2.toLowerCase()}
                            onChange={handleOnChange}
                            key={country.ISO2}
                        >
                            {country.Country}
                        </option>
                    );
                })}
            </NativeSelect>
            <FormHelperText>Lựa chọn quốc gia </FormHelperText>
        </FormControl>
    );
}

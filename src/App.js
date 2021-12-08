import { Container, Typography } from "@mui/material";
import { sortBy } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from './apis'
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";
import 'moment/locale/vi'
import '@fontsource/roboto'

moment.locale('vi')

function App() {
  const [countries, setCounties] = useState([])
  const [selectedCountryID, setSelectedCountryID] = useState('')
  const [report, setReport] = useState([])

  useEffect(() => {
    getCountries()
      .then(res => {
        
        const countries = sortBy(res.data, 'Country')
        setCounties(countries)
        setSelectedCountryID('vn')
      })
  }, [])

  const handleOnChange = (e) => {
    setSelectedCountryID(e.target.value)
    
  }

  useEffect(() => {
    if(selectedCountryID) {
      const { Slug } = countries.find(country => country.ISO2.toLowerCase() === selectedCountryID)
  
      getReportByCountry(Slug)
        .then(res => {
          console.log(res)
          res.data.pop()
          setReport(res.data)
        })
    }
  }, [countries, selectedCountryID])

  return (
    <Container>
      <Typography variant="h2" component="h2">
        DEMO COVID-19
      </Typography>
      <Typography>
        {moment().format('LLL')}
      </Typography>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryID} />
      <Highlight report={report} />
      <Summary report={report} selectedCountryID={selectedCountryID} />
    </Container>
  );
}

export default App;

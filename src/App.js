import React from "react";

// import { Button } from '@material-ui/core';
import { Cards, Chart, CountryPicker, Tables } from "./components";

import { fetchData } from "./api";

import styles from "./App.module.css";

import coronoImage from "./images/image.png";
import coronagif from "./images/covid-19.gif";

class App extends React.Component {
  state = {
    data: {},
    country: "",
    table: [],
  };

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  };
  render() {
    const { data, country, table } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronoImage} alt="COVID-19" />
        <img className={styles.gif} src={coronagif} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Tables />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;

import React from 'react';


import { Cards, Chart, CountryPicker } from './components'
import { fetchData } from './api'

import styles from './App.module.css';

import coronoImage from './images/image.png';

class App extends React.Component {

    state = {
        data: {},
        country: '',
        table: {},
    }
    

   async componentDidMount(){
        const fetchedData = await fetchData();

        this.setState({data:fetchedData}); 
    }

//    async fetchedTableData() { 
//      const tabledata =  await fetchCountryData();
//      this.setState({table:tabledata});
//      console.log('Table',tabledata)

//    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({data:fetchedData, country: country});
    }
    render() {
        const  { data, country, table } = this.state;
        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronoImage} alt='COVID-19' />
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;



{/* <Tables table={table}/>
<button  onClick={() => this.fetchedTableData()}/> */}
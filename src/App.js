// import logo from './logo.svg';
import './App.css';
import Cities from './components/Cities.js';
import Weather from './components/Weather.js';
import React, { useState /*, useEffect*/ } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';

function App() {

    const cities = ['Canberra', 'Dublin', 'Jakarta', 'Kyiv', 'Monaco', 'Moscow', 'Paris', 'Riga', 'Tallinn', 'Tokyo', 'Warsaw', 'Washington', 'Zagreb'];

    const [currentCity, setCity] = useState(null);
    // useEffect(() => {  console.log('setCity--- ' + currentCity) });

    function handleClick(e) {
        setCity(e);
    }

    return (
        <Jumbotron fluid className="text-center" style={{margin: 0, minHeight: 100 + 'vh'}}>
            <h1>Погода в столицах мира</h1>

            <Cities cities={cities} onClick={handleClick}/>
            <Card style={{minWidth: '300px', width: '80%', margin: '0 auto'}}>
                {currentCity !== null
                    ? <Weather currentCity={currentCity} />
                    : <Card.Body><Card.Title>Выберите город</Card.Title></Card.Body>
                }
            </Card>
        </Jumbotron>
    )
}

export default App;
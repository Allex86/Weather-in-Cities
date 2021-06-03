// import logo from './logo.svg';
import './App.css';
import Cities from './components/Cities.js';
import Weather from './components/Weather.js';
import React, { useState/*, useEffect*/ } from 'react';

function App() {

    const cities = ['Canberra', 'Dublin', 'Jakarta', 'Kyiv', 'Monaco', 'Moscow', 'Paris', 'Riga', 'Tallinn', 'Tokyo', 'Warsaw', 'Washington', 'Zagreb'];

    const [currentCity, setCity] = useState(null);
    // useEffect(() => {
    //     console.log('setCity--- ' + currentCity);
    // });

    function handleClick(e) {
        // e.preventDefault();
        setCity(e);
        // console.log('log-- ' + e);
    }

    return (
        <div className="App" style={{backgroundColor: '#282c34', minHeight: 100 +'vh'}}>
            {/*<header className="App-header">
            </header>*/}
            <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                {/*<p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>*/}
                <p>
                    погода в столицах мира
                </p>
                {/*<a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>*/}

                <Cities cities={cities} onClick={handleClick}/>

                {currentCity !== null
                    ? <Weather currentCity={currentCity} />
                    : <p>выберите город</p>
                }
            
              </header>
        </div>
    );
}

export default App;
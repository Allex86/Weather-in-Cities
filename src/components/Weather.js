import React, { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Spinner from 'react-bootstrap/Spinner';

function Weather(props) {
    //  props
    const cityName = props.currentCity;

    //  .env api
    // const baseUrl = 'http://api.openweathermap.org/data/2.5/weather',
    const baseUrl = process.env.REACT_APP_OWM_API_URL;
    //const apiKey = 'example';
    const apiKey = process.env.REACT_APP_OWM_API_KEY;
    //const apiLang = 'ru';
    const apiLang = process.env.REACT_APP_OWM_API_LANG;
    // const units = 'metric'; // формат данных: standard, metric, and imperial
    const units = process.env.REACT_APP_OWM_API_UNITS;
    // icons URL
    const iconsUrl = process.env.REACT_APP_OWM_ICONS_URL;
    const iconsAfterCode = process.env.REACT_APP_OWM_ICONS_AFTER_CODE;
    // Example of API response (JSON)
    // const exampleResponse = {
    //     "coord": {
    //         "lon": -122.08,
    //         "lat": 37.39
    //     },
    //     "weather": [{
    //         "id": 800,
    //         "main": "Clear",
    //         "description": "clear sky",
    //         "icon": "01d"
    //     }],
    //     "base": "stations",
    //     "main": {
    //         "temp": 282.55,
    //         "feels_like": 281.86,
    //         "temp_min": 280.37,
    //         "temp_max": 284.26,
    //         "pressure": 1023,
    //         "humidity": 100
    //     },
    //     "visibility": 16093,
    //     "wind": {
    //         "speed": 1.5,
    //         "deg": 350
    //     },
    //     "clouds": {
    //         "all": 1
    //     },
    //     "dt": 1560350645,
    //     "sys": {
    //         "type": 1,
    //         "id": 5122,
    //         "message": 0.0139,
    //         "country": "US",
    //         "sunrise": 1560343627,
    //         "sunset": 1560396563
    //     },
    //     "timezone": -25200,
    //     "id": 420006353,
    //     "name": "Mountain View",
    //     "cod": 200
    // };

    // const checkInterval = 30000;
    const checkInterval = process.env.REACT_APP_TIME_FOR_UPDATE;

    // конструктор URL API fetchUrl
    const fetchUrl = baseUrl + '?q=' + cityName + '&appid=' + apiKey + '&units=' + units + '&lang=' + apiLang;

    // Перевод градусов в направление ветра
    function  windDegToTextualDescription(degree){
        if (degree>337.5) return 'Северный';            // Northerly - Северный
        if (degree>292.5) return 'Северо-Западный';     // North Westerly - Северо-Западный
        if(degree>247.5) return 'Западный';             // Westerly - Западный
        if(degree>202.5) return 'Юго-Западный';         // South Westerly - Юго-Западный
        if(degree>157.5) return 'Южный';                // Southerly - Южный
        if(degree>122.5) return 'Юго-Восточный';        // South Easterly - Юго-Восточный
        if(degree>67.5) return 'Восточный';             // Easterly - Восточный
        if(degree>22.5){return 'Северо-Восточный';}     // North Easterly - Северо-Восточный
        return 'Северный';
    }

    // ajaxHook
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [weather, setWeather] = useState(null);

    // currentTimeHook
    const [currentTimeHook, setTime] = useState(new Date().toLocaleTimeString());
    const [refrashTime, setTimeRefresh] = useState(currentTimeHook);

    // timer
    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, checkInterval);
        return () => clearInterval(id);
    }, [cityName]);

    // ajax
    useEffect(
        () => {
            fetch(fetchUrl)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setWeather(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                );
                setTimeRefresh(new Date().toLocaleTimeString());
        },
        [ currentTimeHook, fetchUrl ]);

    // render
    if (error || weather == undefined) {
        // return <div>Ошибка: {error.message}</div>;
        return <Card.Body><Card.Title>Ошибка загрузки информации о погоде</Card.Title></Card.Body>;
    } else if (!isLoaded) {
        return (
            // <div className="isLoaded">Загрузка...</div>
            <Card.Body><Spinner animation="border" /></Card.Body>
        );
    } else {
        return (
            <>
            <Card.Body>
                <Card.Title>
                    {weather.name}
                    <img 
                    style={{width: '100px'}} 
                    src={iconsUrl + weather.weather[0].icon + iconsAfterCode} 
                    alt={weather.weather[0].main} 
                    />
                </Card.Title>
                <Card.Text>{weather.weather[0].main}</Card.Text>
                <Card.Text>{weather.weather[0].description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <Card.Text>температура: от {weather.main.temp_min}°C до {weather.main.temp_max} °C</Card.Text>
                <Card.Text>средняя температура: {weather.main.temp} °C</Card.Text>
                <ListGroupItem>ощущается как: {weather.main.feels_like} °C</ListGroupItem>
                {/*<ListGroupItem>давление: {weather.main.pressure} hPa</ListGroupItem>*/}
                <ListGroupItem>давление: {Math.floor(weather.main.pressure * 100 * 0.0075)} мм рт. ст.</ListGroupItem>
                <ListGroupItem>влажность: {weather.main.humidity} %</ListGroupItem>
                <ListGroupItem>ветер: {windDegToTextualDescription(weather.wind.deg)} {weather.wind.speed} м/с</ListGroupItem>
            </ListGroup>
            <Card.Footer>
                <small className="text-muted">Последнее обновления данных: {refrashTime}</small>
            </Card.Footer>
            </>
        );
    }
}

export default Weather;
import React, { useState, useEffect/*, useCallback*/ } from 'react';

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
    const exampleResponse = {
        "coord": {
            "lon": -122.08,
            "lat": 37.39
        },
        "weather": [{
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }],
        "base": "stations",
        "main": {
            "temp": 282.55,
            "feels_like": 281.86,
            "temp_min": 280.37,
            "temp_max": 284.26,
            "pressure": 1023,
            "humidity": 100
        },
        "visibility": 16093,
        "wind": {
            "speed": 1.5,
            "deg": 350
        },
        "clouds": {
            "all": 1
        },
        "dt": 1560350645,
        "sys": {
            "type": 1,
            "id": 5122,
            "message": 0.0139,
            "country": "US",
            "sunrise": 1560343627,
            "sunset": 1560396563
        },
        "timezone": -25200,
        "id": 420006353,
        "name": "Mountain View",
        "cod": 200
    };

    const checkInterval = 30000;
    // const checkInterval = process.env.REACT_APP_TIME_FOR_UPDATE;

    // конструктор URL API fetchUrl
    const fetchUrl = baseUrl + '?q=' + cityName + '&appid=' + apiKey + '&units=' + units + '&lang=' + apiLang;

    // hook
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    // const [items, setItems] = useState([]);
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
                        // Заглушка //
                        setWeather(exampleResponse);
                    }
                );
                setTimeRefresh(new Date().toLocaleTimeString());
        },
        [ currentTimeHook, fetchUrl ]);

    // render
    // if (error) {
    // Заглушка //
    if (!error) {
        // return <div>Ошибка: {error.message}</div>;
        return <div className="error">Ошибка загрузки информации о погоде</div>;
    } else if (!isLoaded) {
        return <div className="isLoaded">Загрузка...</div>;
    } else if (weather == null) {
        return <div className="error">Что-то (ВСЁ) пошло не так =(</div>;
    } else {
        return (
            <div className="Weather-info">
                
                <div>
                    <p>Последнее обновления данных:</p>
                    <p>{refrashTime}</p>
                </div>
                <p>{weather.name}</p>
                {/*<p>координаты:</p>*/}
                {/*<p>долгота: {weather.coord.lon} / широта: {weather.coord.lat}</p>*/}
                <p>температура: от {weather.main.temp_min}C до {weather.main.temp_max} C</p>
                <p>средняя температура: {weather.main.temp} C</p>
                <p>ощущается как: {weather.main.feels_like} C</p>
                <p>давление: {weather.main.pressure} hPa</p>
                <p>влажность: {weather.main.humidity} %</p>
                <div className="weather">
                    <p>погода:</p>
                    <img src={iconsUrl + weather.weather[0].icon + iconsAfterCode} alt={weather.weather[0].main}/>
                    <p>{/*погода: */}{weather.weather[0].main}</p>
                    <p>{weather.weather[0].description}</p>
                </div>
                <p>скорость ветера: {weather.wind.speed} м/с</p>
                
            </div>
        );
    }
}

export default Weather;
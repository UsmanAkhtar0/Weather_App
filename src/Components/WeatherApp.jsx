import Search from "../Components/Search"
import Info from '../Components/info';
import { useState } from "react";

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        temp: 24,
        wind: 2,
        feelsLike: 25,
        tempMin: 20,
        tempMax: 30,
        humidity: 47,
        weather: "haze",

    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Weather App</h1>
            <Search updateInfo={updateInfo}/>
            <Info info={weatherInfo} />
        </div>
    );
}
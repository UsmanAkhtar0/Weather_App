import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Style/Search.css";
import { useState } from "react";

export default function Search({ updateInfo }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "f265d7bc7701e2d53b9af1f1e0d51bde";

    const getWeatherInfo = async () => {
        try {
            const response = await fetch(
                `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
            );
            const jsonResponse = await response.json();
            // console.log(jsonResponse);

            return {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                wind: jsonResponse.wind.speed,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };
        } catch (err) {
            throw err;
        }
    };

    const handleChange = (event) => {
        setCity(event.target.value);
        setError(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newInfo = await getWeatherInfo();
            // console.log(newInfo);
            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    value={city}
                    onChange={handleChange}
                    required
                />
                <br />
                <Button variant="contained" type="submit">
                    Search
                </Button>
                {error && <p style={{ color: "red" }}>No such place found!</p>}
            </form>
        </div>
    );
}

"use client";
import WelcomeBanner from "@/components/welcome_banner";
import { useEffect, useState } from "react";

export default function Home() {
    const [weather, setWeather] = useState("");
    const API_KEY = process.env.WEATHER_API;
    /*useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=Adelaide&appid=${process.env.WEATHER_API}`) // call your own API route for security
            .then(res => res.json())
            .then(data => {
                setWeather(`${data.weather[0].description} (${data.main.temp}°C)`);
            })
            .catch(err => console.error(err));
    }, []);*/
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=Adelaide&appid=${API_KEY}`) // call your own API route for security
            .then(res => res.json())
            .then(data => {
                //setWeather(`${data.weather[0].description} (${data.main.temp}°C)`);
                console.log(data);
            })
            .catch(err => console.error(err));

    return (
        <div className="px-4">
            <WelcomeBanner name="Benjamin Harvey" weather={weather || "Loading..."} />
        </div>
    )
}
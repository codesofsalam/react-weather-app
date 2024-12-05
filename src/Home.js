import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const Home = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "Karachi",
    humidity: 10,
    speed: 2,
    image: "/images/clouds.png",
  });

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a0ec1e2af93c5dac724e17c0a288b00a&&units=metric`;
      axios
        .get(apiURL)
        .then((res) => {
          let imagePath = "";
          if (res.data.weather[0].main === "Clouds") {
            imagePath = "/images/clouds.png";
          } else if (res.data.weather[0].main === "Clear") {
            imagePath = "/images/clear.png";
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = "/images/rain.png";
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = "/images/drizzle.png";
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = "/images/mist.png";
          } else {
            imagePath = "/images/weather.png";
          }
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("Invalid City Name!");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <img src="/images/searchicon.png" alt="" onClick={handleClick} />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>

        <div className="winfo">
          <img src={data.image} alt="" />
          <h1>{Math.round(data.celcius)}</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/images/humidity.png" alt="" />
              <div className="humidity">
                <p>{Math.round(data.humidity)} % </p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/images/wind.png" alt="" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

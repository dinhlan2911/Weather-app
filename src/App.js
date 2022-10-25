
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Input } from 'reactstrap'
import backGround from './assets/background.jpg';
import iconHome from './assets/iconHome.svg'
import {  useState } from 'react';

function App() {
  const api = {
    key: "9700e069252a14ed6f05f5f5871c67f8",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [placeholder, setPlaceholder] = useState("Enter a city...");
  const [home, setHome] = useState(false)
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState("")
  const [icon, setIcon] = useState("")
  const [listDay, setListDay] = useState("")

  let d = new Date();
  let dayInWeek = weekday[d.getDay()];
  const forecastDay = weekday.slice(dayInWeek, weekday.length).concat(weekday.slice(0, dayInWeek));

  const search = async (evt) => {
    if (evt.key === "Enter") {
      let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=63f095bfa4506aeeb29d26296958a5fd`)
      let resultss = await result.json()
      if (resultss.cod != '404') {
        setHome(true)
        setWeather(resultss)
        setQuery("")
        setPlaceholder("Enter a city...")
        setIcon(resultss.weather[0].icon)
      } else {
        console.log("err");
        setQuery("");
        setPlaceholder("City was not found, try again,...")
      }

      //Forecast
      let resultForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=63f095bfa4506aeeb29d26296958a5fd`)
      let resultssForecast = await resultForecast.json()
      if (resultssForecast.cod != '404') {
        setListDay(resultssForecast)
        console.log(resultssForecast)
        console.log("success")
      } else {
        console.log("err");
      }
    }

    console.log(listDay)
  }
  return (
    <div style={{ backgroundImage: `url(${backGround})`, padding: "100px" }} >
      <div className='container boder'>
        {/* man hinh chinh */}
        <div className='container  ' >
          <div className='row' style={!home ? { display: "" } : { display: "none" }}>
            <div className='col-sm-6'>
              <img src={iconHome} alt="" className='iconTheme' />
            </div>
            <div className='col-sm-6'>
              <h1> Weather Forecast</h1>
            </div>
          </div>

          {/* input */}
          <div className=' inputCity' style={{ width: "100%" }}>
            <Input value={query} onKeyPress={search} onChange={e => setQuery(e.target.value)} placeholder={placeholder} type='text' style={{ width: "700px", height: "60px", border: "2px solid black", fontWeight: "bolder" }} />
          </div>

          {/* hien ket qua */}
          <div style={home ? { display: "" } : { display: "none" }}>
            <div className='row ' >
              <div className='col-sm-6'>
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='' style={{ fontWeight: "bolder", width: "500px" }} />
              </div>
              <div className='col-sm-6 detail'>
                <div>
                  <h3>Today</h3>
                  <h2>{weather?.name}</h2>
                  <h4>Temperature: {Math.floor(weather?.main?.temp - 273.15)} °C</h4>
                  <h4>{weather != "" ? weather.weather[0].main : null}</h4>
                </div>
              </div>
            </div>

            <div>
              <ul className='listday'>
                {listDay !== "" ? listDay.list.splice(0, 4).map((item, index) => {
                  return (
                    <li style={{ marginRight: "30px" }} key={index} className="eachDay">
                      <h3>{forecastDay[index]}</h3>
                      <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt='' style={{ fontWeight: "bolder", width: "120px" }} />
                      <h5 className='text-center'> {Math.floor(item?.main?.temp - 273.15)} °C</h5>
                    </li>
                  )
                })
                  : "null"
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;

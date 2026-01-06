# Vanilla JS Weather App

Small weather dashboard built with **plain JavaScript**, **Open-Meteo**, and **geocode.maps.co**.

User flow:

1. Type a city name.
2. App geocodes the city to latitude/longitude.
3. App fetches current weather + 3-day forecast.
4. User can switch between **°C / °F** without refetching.

---

## Features

- City search (by name, not browser GPS)
- Geocoding via [geocode.maps.co](https://geocode.maps.co/)
- Current weather:
  - temperature
  - “feels like”
  - humidity
  - wind speed
  - pressure
  - simple sky description based on cloud cover
- 3-day forecast (max / min)
- °C / °F toggle (conversion done on the client)
- Basic loading / error status messages

---

## Tech / APIs

- **JavaScript (ES6+)**
- **Open-Meteo** forecast API  
  `https://api.open-meteo.com/v1/forecast`
- **geocode.maps.co** for city → coordinates  
  `https://geocode.maps.co/search`

---

## How to Run

Open in a browser:

```bash
open index.html (or double-click the file)
```

Or visit the <a href="https://petromirkolev.github.io/js-foundations-projects/15-odin-weather/src/index.html"> Live Demo </a>

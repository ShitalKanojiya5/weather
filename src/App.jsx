
import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSun,
  Compass,
  Droplets,
  Eye,
  Gauge,
  Heart,
  LocateFixed,
  MapPin,
  Menu,
  Moon,
  Search,
  Sun,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
  X,
} from "lucide-react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  cities,
  hourlyForecast,
  temperatureHistory,
  weeklyForecast,
} from "./data/weather.js";

const weatherIcons = {
  sun: Sun,
  cloud: Cloud,
  "sun-cloud": CloudSun,
  "cloud-rain": CloudRain,
  drizzle: CloudDrizzle,
};

function WeatherIcon({ type = "sun-cloud", size = 24, ...props }) {
  const Icon = weatherIcons[type] || CloudSun;
  return <Icon size={size} {...props} />;
}

function MetricCard({ icon: Icon, label, value, detail }) {
  return (
    <article className="metric-card">
      <div className="metric-heading">
        <span className="metric-icon">
          <Icon size={19} />
        </span>
        <span>{label}</span>
      </div>

      <p className="metric-value">{value}</p>
      <p className="metric-detail">{detail}</p>
    </article>
  );
}

function App() {
  const [city, setCity] = useState("Ahmedabad");
  const [search, setSearch] = useState("");
  const [unit, setUnit] = useState("C");
  const [savedCities, setSavedCities] = useState(() => {
    try {
      const stored = localStorage.getItem("weathernow-favorites");
      return stored ? JSON.parse(stored) : ["Ahmedabad", "Mumbai"];
    } catch {
      return ["Ahmedabad", "Mumbai"];
    }
  });
  const [activeTab, setActiveTab] = useState("Overview");
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  const weather = cities[city] || cities.Ahmedabad;

  const cityOptions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return Object.keys(cities).filter((name) =>
      name.toLowerCase().includes(query)
    );
  }, [search]);

  const temperature = (value) =>
    unit === "C" ? `${value}°` : `${Math.round((value * 9) / 5 + 32)}°`;

  const saveFavorites = (next) => {
    setSavedCities(next);

    try {
      localStorage.setItem("weathernow-favorites", JSON.stringify(next));
    } catch {
      setNotice("Favorites could not be saved in this browser.");
    }
  };

  const selectCity = (name) => {
    if (!cities[name]) {
      setNotice("This demo includes Ahmedabad, Mumbai, Delhi, Bengaluru and Jaipur.");
      return;
    }

    setCity(name);
    setSearch("");
    setShowSearch(false);
    setMobileMenu(false);
    setNotice("");
  };

  const toggleFavorite = () => {
    if (savedCities.includes(city)) {
      saveFavorites(savedCities.filter((name) => name !== city));
      setNotice(`${city} removed from saved locations.`);
    } else {
      saveFavorites([...savedCities, city]);
      setNotice(`${city} added to saved locations.`);
    }
  };

  const isFavorite = savedCities.includes(city);

  const chartData = temperatureHistory.map((item) => ({
    ...item,
    temperature:
      unit === "C"
        ? item.temperature
        : Math.round((item.temperature * 9) / 5 + 32),
  }));

  const navItems = [
    { label: "Overview", icon: Activity },
    { label: "Forecast", icon: CalendarDays },
    { label: "Saved Locations", icon: Heart },
  ];

  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <span className="brand-mark">
            <CloudSun size={27} />
          </span>
          <span>
            <strong>WeatherNow</strong>
            <small>WEATHER INTELLIGENCE</small>
          </span>

          <button
            className="icon-button mobile-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="nav-list" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${activeTab === label ? "active" : ""}`}
              onClick={() => {
                setActiveTab(label);
                setMobileMenu(false);
              }}
            >
              <Icon size={19} />
              <span>{label}</span>
              {label === "Saved Locations" && (
                <span className="nav-count">{savedCities.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-divider" />

        <div className="sidebar-section-heading">
          <p className="sidebar-label">SAVED CITIES</p>
          <button
            className="tiny-icon-button"
            onClick={() => {
              setSearch("");
              setShowSearch(true);
            }}
            aria-label="Add or search for a city"
          >
            <Search size={15} />
          </button>
        </div>

        <div className="saved-city-list">
          {savedCities.map((name) => (
            <button
              key={name}
              className={`saved-city ${city === name ? "selected" : ""}`}
              onClick={() => selectCity(name)}
            >
              <MapPin size={16} />
              <span>{name}</span>
              <span className="saved-city-temperature">
                {temperature(cities[name]?.temperature ?? 0)}
              </span>
            </button>
          ))}

          {savedCities.length === 0 && (
            <p className="empty-message">
              No saved cities yet. Use the heart button to save one.
            </p>
          )}
        </div>

        <div className="sidebar-spacer" />

        <div className="sidebar-info">
          <div className="sidebar-info-icon">
            <Compass size={20} />
          </div>
          <strong>Plan your day</strong>
          <p>Check weather conditions before heading out.</p>
          <button
            className="sidebar-info-button"
            onClick={() => setActiveTab("Forecast")}
          >
            View forecast <span>→</span>
          </button>
        </div>

        <div className="profile-row">
          <div className="avatar">W</div>
          <div>
            <strong>Weather Explorer</strong>
            <small>Personal dashboard</small>
          </div>
          <ChevronDown size={16} />
        </div>
      </aside>

      {mobileMenu && (
        <button
          className="mobile-overlay"
          aria-label="Close navigation overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-menu-button"
              onClick={() => setMobileMenu(true)}
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="breadcrumb">Workspace / Weather</p>
              <p className="topbar-date">{today}</p>
            </div>
          </div>

          <div className="topbar-actions">
            <button
              className="unit-toggle"
              onClick={() => setUnit(unit === "C" ? "F" : "C")}
              aria-label="Toggle Celsius and Fahrenheit"
            >
              <span className={unit === "C" ? "unit-active" : ""}>°C</span>
              <span className="unit-divider">/</span>
              <span className={unit === "F" ? "unit-active" : ""}>°F</span>
            </button>

            <button
              className="icon-button notification-button"
              onClick={() =>
                setNotice("Weather alerts are demo-only in this version.")
              }
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="notification-dot" />
            </button>

            <button
              className="search-button"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search size={17} />
              <span>Search city</span>
              <kbd>⌘ K</kbd>
            </button>
          </div>
        </header>

        {showSearch && (
          <section className="search-panel" aria-label="City search">
            <div className="search-panel-input">
              <Search size={18} />
              <input
                autoFocus
                value={search}
                placeholder="Search Ahmedabad, Mumbai, Delhi..."
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setShowSearch(false);
                  if (event.key === "Enter" && cityOptions[0]) {
                    selectCity(cityOptions[0]);
                  }
                }}
              />
              <button
                className="tiny-icon-button"
                onClick={() => setShowSearch(false)}
                aria-label="Close search"
              >
                <X size={17} />
              </button>
            </div>

            <div className="search-results">
              {cityOptions.map((name) => (
                <button key={name} onClick={() => selectCity(name)}>
                  <MapPin size={16} />
                  <span>{name}</span>
                  <span>{cities[name].country}</span>
                </button>
              ))}

              {cityOptions.length === 0 && (
                <p className="empty-message">
                  No matching demo city. Try Ahmedabad, Mumbai, Delhi,
                  Bengaluru or Jaipur.
                </p>
              )}
            </div>
          </section>
        )}

        {notice && (
          <div className="notice" role="status">
            <span>{notice}</span>
            <button
              className="tiny-icon-button"
              onClick={() => setNotice("")}
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {activeTab === "Overview" && (
          <>
            <section className="page-heading">
              <div>
                <p className="eyebrow">
                  <span className="status-dot" /> WEATHER OVERVIEW
                </p>
                <h1>Good day, Explorer <span>✦</span></h1>
                <p className="page-subtitle">
                  Here's what's happening with the weather today.
                </p>
              </div>

              <button
                className="location-button"
                onClick={() =>
                  setNotice(
                    "Location detection will be added with browser geolocation or a live weather API."
                  )
                }
              >
                <LocateFixed size={17} />
                Current location
              </button>
            </section>

            <section className="weather-hero">
              <div className="hero-glow" />

              <div className="hero-main">
                <div className="hero-location">
                  <MapPin size={16} />
                  <span>{city}, {weather.country}</span>
                  <span className="live-pill">
                    <span /> DEMO
                  </span>
                </div>

                <p className="hero-condition">{weather.condition}</p>

                <div className="hero-temperature">
                  <span>{temperature(weather.temperature)}</span>
                  <WeatherIcon
                    type={weather.icon}
                    size={82}
                    strokeWidth={1.35}
                    className="hero-weather-icon"
                  />
                </div>

                <p className="hero-description">{weather.description}</p>

                <div className="hero-high-low">
                  <span>
                    <Sun size={15} /> H: {temperature(weather.high)}
                  </span>
                  <span>
                    <Moon size={15} /> L: {temperature(weather.low)}
                  </span>
                  <span className="hero-divider" />
                  <span>Feels like {temperature(weather.feelsLike)}</span>
                </div>
              </div>

              <div className="hero-side">
                <div className="hero-date">
                  <CalendarDays size={17} />
                  <span>TODAY'S CONDITIONS</span>
                </div>

                <div className="hero-sun-path">
                  <div className="sun-path-line" />
                  <Sunrise size={23} className="sunrise-icon" />
                  <div className="sun-path-center">
                    <Sun size={35} />
                    <span>Daylight</span>
                  </div>
                  <Sunset size={23} className="sunset-icon" />
                </div>

                <div className="sun-times">
                  <div>
                    <span>Sunrise</span>
                    <strong>{weather.sunrise}</strong>
                  </div>
                  <div>
                    <span>Sunset</span>
                    <strong>{weather.sunset}</strong>
                  </div>
                </div>

                <button
                  className={`favorite-button ${isFavorite ? "favorited" : ""}`}
                  onClick={toggleFavorite}
                >
                  {isFavorite ? <Check size={17} /> : <Heart size={17} />}
                  {isFavorite ? "Saved location" : "Save location"}
                </button>
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div>
                  <h2>Weather conditions</h2>
                  <p>Detailed metrics for {city}</p>
                </div>
                <span className="section-tag">LIVE DATA NOT CONNECTED</span>
              </div>

              <div className="metrics-grid">
                <MetricCard
                  icon={Droplets}
                  label="Humidity"
                  value={`${weather.humidity}%`}
                  detail="Relative humidity"
                />
                <MetricCard
                  icon={Wind}
                  label="Wind speed"
                  value={`${weather.wind} km/h`}
                  detail={`Direction ${weather.windDirection}`}
                />
                <MetricCard
                  icon={Eye}
                  label="Visibility"
                  value={`${weather.visibility} km`}
                  detail="Horizontal visibility"
                />
                <MetricCard
                  icon={Sun}
                  label="UV index"
                  value={weather.uv}
                  detail={
                    weather.uv >= 6
                      ? "High · Sun protection advised"
                      : "Moderate conditions"
                  }
                />
                <MetricCard
                  icon={Gauge}
                  label="Pressure"
                  value={`${weather.pressure} hPa`}
                  detail="Atmospheric pressure"
                />
                <MetricCard
                  icon={Thermometer}
                  label="Feels like"
                  value={temperature(weather.feelsLike)}
                  detail="Perceived temperature"
                />
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div>
                  <h2>Today's forecast</h2>
                  <p>Temperature changes throughout the day</p>
                </div>
                <button
                  className="text-button"
                  onClick={() => setActiveTab("Forecast")}
                >
                  Full forecast →
                </button>
              </div>

              <div className="forecast-grid">
                {hourlyForecast.map((item, index) => (
                  <article
                    className={`hour-card ${index === 0 ? "hour-active" : ""}`}
                    key={item.time}
                  >
                    <span className="hour-time">{item.time}</span>
                    <WeatherIcon
                      type={item.icon}
                      size={27}
                      className="hour-weather-icon"
                    />
                    <strong>{temperature(item.temperature)}</strong>
                    <span className="rain-chance">
                      <Droplets size={12} />
                      {item.rain}%
                    </span>
                  </article>
                ))}
              </div>
            </section>

            <section className="bottom-grid">
              <article className="panel temperature-panel">
                <div className="section-heading">
                  <div>
                    <h2>Temperature trend</h2>
                    <p>Hourly temperature · Demo data</p>
                  </div>
                  <span className="chart-unit">°{unit}</span>
                </div>

                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 14, right: 8, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        stroke="#273246"
                        strokeDasharray="4 5"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#8c99ad", fontSize: 11 }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#8c99ad", fontSize: 11 }}
                        domain={["dataMin - 2", "dataMax + 2"]}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#111a2b",
                          border: "1px solid #2a3850",
                          borderRadius: 12,
                          color: "#f3f6fc",
                        }}
                        formatter={(value) => [`${value}°${unit}`, "Temperature"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#6ccaff"
                        strokeWidth={3}
                        dot={{
                          r: 3,
                          fill: "#6ccaff",
                          stroke: "#111a2b",
                          strokeWidth: 2,
                        }}
                        activeDot={{ r: 6, fill: "#ffffff" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </article>

              <article className="panel weekly-panel">
                <div className="section-heading">
                  <div>
                    <h2>7-day forecast</h2>
                    <p>Upcoming weather</p>
                  </div>
                </div>

                <div className="weekly-list">
                  {weeklyForecast.map((day) => (
                    <div className="weekly-row" key={day.day}>
                      <span className="weekly-day">{day.day}</span>
                      <WeatherIcon type={day.icon} size={20} />
                      <div className="weekly-rain">
                        <Droplets size={12} />
                        {day.rain}%
                      </div>
                      <span className="weekly-low">
                        {temperature(day.low)}
                      </span>
                      <strong>{temperature(day.high)}</strong>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <footer className="dashboard-footer">
              <span>WeatherNow © {new Date().getFullYear()}</span>
              <span>Frontend demo · Sample weather values</span>
            </footer>
          </>
        )}

        {activeTab === "Forecast" && (
          <section className="standalone-section">
            <p className="eyebrow">WEATHER OUTLOOK</p>
            <h1>Forecast</h1>
            <p className="page-subtitle">
              Plan the week ahead in {city}.
            </p>

            <div className="extended-forecast">
              {weeklyForecast.map((day) => (
                <article className="extended-day" key={day.day}>
                  <span>{day.day}</span>
                  <WeatherIcon type={day.icon} size={36} />
                  <strong>{temperature(day.high)}</strong>
                  <span className="weekly-low">
                    Low {temperature(day.low)}
                  </span>
                  <span className="rain-chance">
                    <Droplets size={13} /> {day.rain}% rain
                  </span>
                </article>
              ))}
            </div>

            <button
              className="location-button back-button"
              onClick={() => setActiveTab("Overview")}
            >
              ← Back to overview
            </button>
          </section>
        )}

        {activeTab === "Saved Locations" && (
          <section className="standalone-section">
            <p className="eyebrow">YOUR COLLECTION</p>
            <h1>Saved locations</h1>
            <p className="page-subtitle">
              Your favorite cities, stored in this browser.
            </p>

            <div className="saved-location-grid">
              {savedCities.map((name) => (
                <article className="saved-location-card" key={name}>
                  <div className="saved-location-icon">
                    <WeatherIcon type={cities[name]?.icon} size={30} />
                  </div>
                  <div className="saved-location-title">
                    <h3>{name}</h3>
                    <p>{cities[name]?.country}</p>
                  </div>
                  <strong>{temperature(cities[name]?.temperature ?? 0)}</strong>
                  <p className="saved-location-condition">
                    {cities[name]?.condition}
                  </p>
                  <div className="saved-location-actions">
                    <button
                      className="location-button"
                      onClick={() => {
                        selectCity(name);
                        setActiveTab("Overview");
                      }}
                    >
                      View weather
                    </button>
                    <button
                      className="icon-button"
                      aria-label={`Remove ${name} from saved locations`}
                      onClick={() =>
                        saveFavorites(savedCities.filter((item) => item !== name))
                      }
                    >
                      <X size={17} />
                    </button>
                  </div>
                </article>
              ))}

              {savedCities.length === 0 && (
                <div className="empty-card">
                  <Heart size={30} />
                  <h3>No saved cities</h3>
                  <p>Return to the overview and save a location.</p>
                  <button
                    className="location-button"
                    onClick={() => setActiveTab("Overview")}
                  >
                    Explore weather
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;


export const cities = {
  Ahmedabad: {
    country: "India",
    condition: "Partly Cloudy",
    temperature: 32,
    feelsLike: 35,
    high: 35,
    low: 26,
    humidity: 58,
    wind: 14,
    windDirection: "SW",
    visibility: 8,
    uv: 6,
    pressure: 1012,
    sunrise: "06:35 AM",
    sunset: "06:12 PM",
    icon: "sun-cloud",
    description: "Warm skies with occasional clouds."
  },
  Mumbai: {
    country: "India",
    condition: "Humid and Cloudy",
    temperature: 30,
    feelsLike: 34,
    high: 32,
    low: 27,
    humidity: 76,
    wind: 18,
    windDirection: "W",
    visibility: 7,
    uv: 5,
    pressure: 1009,
    sunrise: "06:30 AM",
    sunset: "06:08 PM",
    icon: "cloud",
    description: "Cloudy conditions with humid air."
  },
  Delhi: {
    country: "India",
    condition: "Clear Sky",
    temperature: 29,
    feelsLike: 30,
    high: 31,
    low: 21,
    humidity: 42,
    wind: 10,
    windDirection: "NW",
    visibility: 9,
    uv: 4,
    pressure: 1015,
    sunrise: "06:25 AM",
    sunset: "05:42 PM",
    icon: "sun",
    description: "Mostly clear skies throughout the day."
  },
  Bengaluru: {
    country: "India",
    condition: "Light Rain",
    temperature: 24,
    feelsLike: 25,
    high: 27,
    low: 20,
    humidity: 82,
    wind: 12,
    windDirection: "SE",
    visibility: 6,
    uv: 3,
    pressure: 1011,
    sunrise: "06:10 AM",
    sunset: "06:00 PM",
    icon: "cloud-rain",
    description: "Light showers and a gentle breeze."
  },
  Jaipur: {
    country: "India",
    condition: "Sunny",
    temperature: 33,
    feelsLike: 34,
    high: 36,
    low: 24,
    humidity: 35,
    wind: 11,
    windDirection: "W",
    visibility: 10,
    uv: 7,
    pressure: 1013,
    sunrise: "06:40 AM",
    sunset: "06:15 PM",
    icon: "sun",
    description: "Bright and sunny conditions."
  }
};

export const hourlyForecast = [
  { time: "Now", temperature: 32, icon: "sun-cloud", rain: 10 },
  { time: "12 PM", temperature: 33, icon: "sun", rain: 5 },
  { time: "1 PM", temperature: 34, icon: "sun", rain: 0 },
  { time: "2 PM", temperature: 35, icon: "sun", rain: 0 },
  { time: "3 PM", temperature: 34, icon: "sun-cloud", rain: 5 },
  { time: "4 PM", temperature: 32, icon: "cloud", rain: 15 },
  { time: "5 PM", temperature: 30, icon: "cloud", rain: 20 }
];

export const weeklyForecast = [
  { day: "Today", icon: "sun-cloud", high: 35, low: 26, rain: 10 },
  { day: "Thu", icon: "sun", high: 36, low: 27, rain: 0 },
  { day: "Fri", icon: "cloud", high: 32, low: 25, rain: 20 },
  { day: "Sat", icon: "cloud-rain", high: 29, low: 24, rain: 60 },
  { day: "Sun", icon: "cloud-rain", high: 30, low: 24, rain: 45 },
  { day: "Mon", icon: "sun-cloud", high: 34, low: 25, rain: 10 },
  { day: "Tue", icon: "sun", high: 35, low: 26, rain: 0 }
];

export const temperatureHistory = [
  { time: "9 AM", temperature: 28 },
  { time: "10 AM", temperature: 29 },
  { time: "11 AM", temperature: 31 },
  { time: "12 PM", temperature: 32 },
  { time: "1 PM", temperature: 34 },
  { time: "2 PM", temperature: 35 },
  { time: "3 PM", temperature: 34 }
];

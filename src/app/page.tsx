"use client"

import axios from "axios";
import Navbar from "./components/Navbar";
import { useQuery } from "@tanstack/react-query";

interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export default function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => { 
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=novi&cnt=56&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      );
      return data;
    }
  });

  console.log("data", data?.city.name);
  
  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate animate-bounce">Loading...</p>
    </div>
  );

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar/>

    </div>
  );
}

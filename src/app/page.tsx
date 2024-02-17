"use client";

import axios from "axios";
import Navbar from "./components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import Container from "./components/Container";
import { convertKelvinToFarenheit } from "@/utils/convertKelvinToCelsius";
import WeatherIcon from "./components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";

interface WeatherDetail {
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

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=grand%20rapids&units=imperical&cnt=56&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      );
      return data;
    },
  });

  const firstData = data?.list[0];

  console.log("data", data);

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate animate-bounce">Loading...</p>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today data */}
        <section className="space-y-2">
          <div className="space-y-2">
            <h2 className="flex gap-2 text-2xl items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">
                ({format(parseISO(firstData?.dt_txt ?? ""), "M.dd.yyyy")})
              </p>
            </h2>
            <Container className="gap-10 px-6 py-6 items-center">
              {/* temperature */}
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {convertKelvinToFarenheit(firstData?.main.temp ?? 0)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>
                    Feels like{" "}
                    {convertKelvinToFarenheit(firstData?.main.feels_like ?? 0)}
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToFarenheit(firstData?.main.temp_min ?? 0)}
                    °↓{" "}
                  </span>
                  <span>
                    {" "}
                    {convertKelvinToFarenheit(firstData?.main.temp_max ?? 0)}
                    °↑
                  </span>
                </p>
              </div>
              {/*time and weather icon*/}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d: WeatherDetail) => (
                  <div
                    key={d.dt}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(d.dt_txt), "h:mm a")}
                    </p>

                    <WeatherIcon
                      iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}
                    />
                    <p>{convertKelvinToFarenheit(d?.main.temp ?? 0)}°</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </section>
        {/* 7 day forecast */}
        <section></section>
      </main>
    </div>
  );
}

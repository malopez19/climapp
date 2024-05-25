"use client";

import React from "react";
import { MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";

type Props = { location?: string };

export default function Navbar({ location }: Props) {
  const [city, setCity] = useState("");
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);

  async function handleInputChange(value: string) {
    setCity(value);
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    setTimeout(() => {
      setLoadingCity(false);
      setPlace(city);
    }, 500);
  }

  return (
    <>
      <nav className="shadow-sm  sticky top-0 left-0 z-50 bg-blue-100">
        <div className="h-[80px]     w-full    flex   justify-between items-center  max-w-7xl px-3 mx-auto">
          <p className="flex items-center justify-center gap-2  ">
            <h2 className="text-black text-3xl">ClimApp</h2>
            <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
          </p>
          {/* buscador */}
          <section className="flex gap-2 items-center">
            <MdOutlineLocationOn className="text-3xl" />
            <p className="text-slate-900/80 text-sm"> {location} </p>
            <div className="relative hidden md:flex">
              {/* SearchBox */}
              <SearchBox
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </div>
          </section>
        </div>
      </nav>
        <section className="flex   max-w-7xl px-3 md:hidden ">
        <div className="relative ">
          <SearchBox
            value={city}
            onSubmit={handleSubmitSearch}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
      </section>
    </>
  );
}

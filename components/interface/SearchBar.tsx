"use client";

import React, { useState } from "react";
import { SearchButton, SearchManufacturer } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [manufacturer, setManufacturer] = useState("");
  const [model, setmodel] = useState("");
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (manufacturer === "" && model === "") {
    //   return alert("Please fill in the search bar.");
    // }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }
    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathName, { scroll: false });
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton styleClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          alt="model icon"
          width={25}
          height={25}
          className="absolute ml-4 size-[20px]"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setmodel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton styleClasses="sm:hidden" />

        <button
          type="button"
          className="z-10 -ml-3 rounded-full bg-primary-blue-100"
        >
          <Image
            src="/close.svg"
            alt="magnifying glass"
            width={25}
            height={25}
            className="object-contain"
            onClick={() => {
              setmodel("");
              setManufacturer("");
              updateSearchParams("", "");
            }}
          />
        </button>
      </div>
      <SearchButton styleClasses="max-sm:hidden ml-2" />
    </form>
  );
};

export default SearchBar;

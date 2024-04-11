/* eslint-disable camelcase */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CarProps } from "@/types";
import { Button, CarDetails } from "@/components";
import { calculateCarRent, generateCarImageUrl } from "@/utils";

interface CarCardProps {
  car: CarProps;
}

const generateRandomColor = () => {
  // const minCeiled = Math.ceil(1);
  // const maxFloored = Math.floor(250);
  const randomNumber = Math.floor(Math.random() * (250 - 1) + 1).toString();
  const zeroesCount = 4 - randomNumber.length;
  const randomPaint = `pspc${"0".repeat(zeroesCount)}${randomNumber}`;
  return randomPaint;
};

const CarCard = ({ car }: CarCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { city_mpg, year, make, model, transmission, drive } = car;
  const carRent = calculateCarRent(city_mpg, year);
  const color = generateRandomColor();

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="mt-6 flex text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      <div className="relative my-3 h-40 w-full object-contain">
        <Image
          src={generateCarImageUrl(car, "01", color)}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="relative mt-2 flex w-full">
        <div className="flex w-full justify-between text-grey group-hover:invisible">
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p className="text-[14px]">
              {transmission === "a" ? "automatic" : "manual"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image src="/tire.svg" width={20} height={20} alt="tire" />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="gas" />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <Button
            title="View more"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
        color={color}
      />
    </div>
  );
};

export default CarCard;

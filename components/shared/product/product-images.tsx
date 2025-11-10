"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

type Pros = {
  images: string[];
};
export default function ProductImages({ images }: Pros) {
  const [current, setCurrent] = useState(1);
  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="product image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
      />
      <div className="flex ">
        {images.map((image, index) => (
          <div
            key={image}
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600",
              current === index && "border-orange-500"
            )}
            onClick={() => setCurrent(index)}
          >
            <Image src={image} width={100} height={100} alt="product image" />
          </div>
        ))}
      </div>
    </div>
  );
}

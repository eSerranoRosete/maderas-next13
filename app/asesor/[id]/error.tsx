"use client";

import Image from "next/image";

export default function error() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="text-center">
        <Image
          className="m-auto"
          src="https://illustrations.popsy.co/gray/question-mark.svg"
          alt="Women with question mark"
          width={200}
          height={200}
        />
        <h5 className="text-6xl font-bold mb-4">Oups.</h5>
        <h6>We couldn't find what you were looking for.</h6>
      </div>
    </div>
  );
}

"use client";

import Result from "@/components/Result";
import { useAppState } from "@/context/useAppState";
import React from "react";

export default function AsesorResult() {
  const resultData = useAppState((state) => state.resultData);

  if (!resultData) return <>No Result Data Found</>;

  return <Result resultData={resultData} />;
}

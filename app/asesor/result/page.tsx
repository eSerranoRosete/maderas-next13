"use client";

import Result from "@/components/Result";
import { useAppState } from "@/context/useAppState";
import React from "react";

export default function AsesorResult() {
  const resultData = useAppState((state) => state.resultData);

  if (!resultData) throw new Error("No result data found.");

  return <Result resultData={resultData} />;
}

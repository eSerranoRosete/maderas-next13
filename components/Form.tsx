"use client";

import { CalculatorIcon } from "@heroicons/react/24/outline";
import {
  useMemo,
  type ChangeEvent,
  type FormEventHandler,
  useCallback,
} from "react";

import { SelectInput } from "./inputs/SelectInput";
import { Input } from "./inputs/Input";
import { RangeInput } from "./inputs/RangeInput";
import { Button } from "./buttons/Button";
import { useAppState } from "@/context/useAppState";
import { locations } from "@/utils/locations";
import { computeResult } from "@/utils/computeResult";
import Result from "./Result";
import { IFRequestBody } from "@/types/appTypes";
import { useRouter } from "next/navigation";

interface IFProps {
  displayName: string;
  leadFieldsRequired: boolean;
}

export const Form = ({ displayName, leadFieldsRequired }: IFProps) => {
  const router = useRouter();
  const state = useAppState((state) => ({
    area: state.area,
    term: state.term,
    location: state.location,
    landPrice: state.landPrice,
    payment: state.payment,
    leadName: state.leadName,
    leadEmail: state.leadEmail,
    leadPhone: state.leadPhone,
    resultData: state.resultData,
    setArea: state.setArea,
    setTerm: state.setTerm,
    setLocation: state.setLocation,
    setLandPrice: state.setLandPrice,
    setPayment: state.setPayment,
    setLeadName: state.setLeadName,
    setLeadEmail: state.setLeadEmail,
    setLeadPhone: state.setLeadPhone,
    setResultData: state.setResultData,
  }));

  console.log("🧠", state);

  const locationOptions = useMemo(
    () =>
      locations.map((location) => ({
        value: location.name,
        label: location.name,
        dataAttr: location.landPrice,
      })),
    []
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      const { landPrice, term, payment, area } = state;
      const result = computeResult({
        landPrice,
        term,
        payment,
        area,
      });

      const data: IFRequestBody = {
        inputs: {
          location: state.location,
          area: state.area,
          term: state.term,
          payment: state.payment,
        },
        resultData: result,
        lead: {
          name: state.leadName,
          email: state.leadEmail,
          phone: state.leadPhone,
        },
        targetEmail: "eserrano@inteminer.com",
      };

      state.setResultData(data);
      router.push("/asesor/result");
    },
    [state]
  );

  const paymentOptions = useMemo(
    () =>
      locations
        .find((community) => community.name === state.location)
        ?.options.map((option) => ({
          value: option.toString(),
          label: option + "%",
        }))!,
    [state.location]
  );

  const onLocationChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      state.setLocation(e.target.value);
      const landPrice = e.target.options[e.target.selectedIndex]?.dataset.lp;
      landPrice && state.setLandPrice(parseFloat(landPrice));
    },
    [state.location]
  );

  return (
    <div className="flex min-h-screen p-3 text-black">
      <div className="m-auto w-full max-w-xl p-6">
        <img
          src="https://cotizador.inteminer.com/static/images/logo-color.svg"
          className="m-auto mb-5 w-60"
        />
        <div className="mb-8 text-center">
          <h2>Bienvenido, soy tu asesor</h2>
          <h3 className="mb-6 text-2xl font-bold">{displayName}</h3>
          <p>Para cotizar tu terreno, sigue los siguientes pasos:</p>
        </div>
        <form className="space-y-5" onSubmit={onSubmit}>
          <SelectInput
            label="Desarrollo:"
            onChange={onLocationChange}
            options={locationOptions}
          />

          <RangeInput
            label="Metros cuadrados:"
            onChange={(e) => state.setArea(parseInt(e.target.value))}
            value={state.area}
            liveLabel={state.area + " m²"}
            min={112}
            max={300}
            step={1}
          />

          <RangeInput
            label="Plazo de financiamiento:"
            onChange={(e) => state.setTerm(parseInt(e.target.value))}
            value={state.term}
            liveLabel={state.term + " años"}
            min={3}
            max={20}
            step={1}
          />

          <SelectInput
            label="Porcentaje de enganche:"
            onChange={(e) => state.setPayment(parseInt(e.target.value))}
            options={paymentOptions}
          />

          <hr />

          <Input
            type="text"
            label="Nombre:"
            trigger="onBlur"
            onChange={(e) => state.setLeadName(e.target.value)}
            required={leadFieldsRequired}
          />

          <Input
            type="email"
            label="Correo Electrónico:"
            trigger="onBlur"
            onChange={(e) => state.setLeadEmail(e.target.value)}
            required={leadFieldsRequired}
          />

          <Input
            type="tel"
            label="Teléfono:"
            trigger="onBlur"
            onChange={(e) => state.setLeadPhone(e.target.value)}
            required={leadFieldsRequired}
          />

          <Button
            label="Cotizar"
            uppercase
            icon={<CalculatorIcon className="h-4 w-4" />}
          />
        </form>
      </div>
    </div>
  );
};

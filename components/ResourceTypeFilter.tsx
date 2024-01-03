"use client";

import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { TypeFilterOption } from "./ResourceFilters";

type Props = {
  onChange: (selectedValue: TypeFilterOption) => void;
  value: TypeFilterOption;
  values: TypeFilterOption[];
};

export const ResrouceTypeFilter = ({ onChange, value, values }: Props) => {
  return (
    <div>
      <Listbox onChange={onChange}>
        <Listbox.Button>
          <div className="border border-slate-700 bg-slate-900 px-4 py-2 rounded-lg">
            <span className="text-sm">{value.name}</span>
          </div>
        </Listbox.Button>
        <Listbox.Options className="absolute rounded-lg mt-2  border border-slate-700 divide-y overflow-hidden">
          {values.map((typeFilterOption) => (
            <Listbox.Option
              key={typeFilterOption.value}
              value={typeFilterOption}
              className="px-4 py-2 cursor-pointer hover:bg-slate-800/80 bg-slate-900/80 backdrop-blur"
            >
              {typeFilterOption.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

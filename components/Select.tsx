"use client";

import { Listbox } from "@headlessui/react";
import { TypeFilterOption } from "./ResourceFilters";
import { Control, Controller } from "react-hook-form";

type SelectOption = { name: string; value: string | number };

type Props = {
  values: SelectOption[];
  defaultValue: SelectOption;
  control: Control<any, any>;
  name: string;
};

export const Select = ({ values, control, name, defaultValue }: Props) => {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field: { onChange, value } }) => {
        const handleChange = (selectedFilter: TypeFilterOption) => {
          onChange(selectedFilter.value);
        };

        const selectedValue =
          values.find((v) => v.value === value) || defaultValue;

        return (
          <Listbox onChange={handleChange}>
            <Listbox.Button>
              <div className="border border-slate-700 bg-slate-900 px-4 py-2 rounded-lg">
                <span className="text-sm">{selectedValue.name}</span>
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
        );
      }}
    />
  );
};
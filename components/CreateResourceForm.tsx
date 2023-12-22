"use client";
import { createResource } from "@/app/actions";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ErrorMessage } from "@hookform/error-message";

const schema = z.object({
  link: z.string(),
  consumeTime: z.number(),
  type: z.enum(["article", "video"]),
  notes: z.string().optional(),
});

// TODO: Validations
export const CreateResourceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await createResource(data);
    } catch (error) {
      // TODO: Better error handling
      console.log(error);
    }
  };

  if (errors) {
    console.log(Object.values(errors));
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-96"
      >
        <BaseInput placeholder="link" {...register("link")} />
        <CustomErrorMessage errors={errors} name="link" />
        <BaseInput
          placeholder="consume time"
          {...register("consumeTime", { valueAsNumber: true })}
        />
        <CustomErrorMessage errors={errors} name="consumeTime" />
        <BaseInput placeholder="type" {...register("type")} />
        <CustomErrorMessage errors={errors} name="type" />
        <BaseInput placeholder="notes" {...register("notes")} />
        <CustomErrorMessage errors={errors} name="notes" />
        <input
          type="submit"
          className="py-4 px-6 rounded-lg bg-purple-500 cursor-pointer"
        />
      </form>
    </>
  );
};

const BaseInput = forwardRef<HTMLInputElement, JSX.IntrinsicElements["input"]>(
  (props, ref) => (
    <input
      {...props}
      className="py-4 px-6 rounded-lg border border-slate-600 bg-slate-900 text-slate-100 focus-visible:outline-none focus-visible:border-slate-200"
      ref={ref}
    />
  )
);

const CustomErrorMessage = ({
  errors,
  name,
}: {
  errors: any;
  name: string;
}) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <span className="text-sm text-rose-400 mb-4">{message}</span>
      )}
    />
  );
};

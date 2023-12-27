"use client";

import { createResource } from "@/app/actions";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";

const schema = z.object({
  link: z.string(),
  title: z.string(),
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
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(true);

  const watchLink = watch("link");
  const [titleLoading, setTitleLoading] = useState(false);

  const handleLinkBlur = async () => {
    try {
      setTitleLoading(true);
      const res = await fetch("/metadata", {
        method: "POST",
        body: JSON.stringify({ urlCandidate: watchLink }),
      });

      if (res.ok) {
        const resBody = await res.json();
        setValue("title", resBody.title);
        setTitleLoading(false);
        return;
      }

      setTitleLoading(false);
    } catch (e) {
      console.error(e);
      setTitleLoading(false);
      return;
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const bookmark = await createResource(data);
      if (bookmark) {
        // TODO: Need to update search params here and refresh instead to render new item
        // Or is there a better solution?
        router.replace("/");
      }
    } catch (error) {
      // TODO: Better error handling
      console.log(error);
    }
  };

  if (errors) {
    console.log(Object.values(errors));
  }

  if (!shouldRender) {
    return null;
  }

  const handleCloseClick = () => {
    setShouldRender(false);
    router.replace("/");
  };

  return (
    <Dialog open={true} onClose={handleCloseClick}>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur"
        aria-hidden="true"
      />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="bg-slate-800 p-12 rounded-lg">
          <h2 className="font-bold text-xl mb-10 text-center">
            Add new bookmark
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-96"
          >
            <BaseInput
              placeholder="link"
              {...register("link")}
              onBlur={handleLinkBlur}
            />
            <CustomErrorMessage errors={errors} name="link" />
            <BaseInput
              placeholder="title"
              {...register("title")}
              onBlur={handleLinkBlur}
              isLoading={titleLoading}
            />
            <CustomErrorMessage errors={errors} name="title" />
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

type BaseInputProps = {
  isLoading?: boolean;
} & JSX.IntrinsicElements["input"];

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ isLoading = false, ...props }, ref) => (
    <div className="relative w-full">
      <input
        {...props}
        disabled={isLoading}
        placeholder={isLoading ? undefined : props.placeholder}
        className={clsx(
          "py-4 px-6 w-full rounded-lg border border-slate-600 bg-slate-900 text-slate-100 focus-visible:outline-none focus-visible:border-slate-200",
          isLoading && "opacity-60 cursor-not-allowed"
        )}
        ref={ref}
      />
      {isLoading && (
        <div role="status" className="absolute top-5 left-6">
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
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

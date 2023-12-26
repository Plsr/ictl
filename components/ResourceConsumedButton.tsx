"use client";

import { markResourceConsumed } from "@/app/actions";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export const ResourceConsumedButton = ({ resourceId }: any) => {
  const router = useRouter();
  const handleConsumedClick = async (resourceId: string) => {
    await markResourceConsumed(resourceId);
    router.refresh();
  };
  return (
    <button
      onClick={() => handleConsumedClick(resourceId)}
      className="flex flex-row items-center gap-1 text-teal-400"
    >
      <CheckIcon className="w-4 h-4" />
      Consumed
    </button>
  );
};

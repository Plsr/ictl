"use client";

import { markResourceConsumed } from "@/app/actions";
import { useRouter } from "next/navigation";

export const ResourceConsumedButton = ({ resourceId }: any) => {
  const router = useRouter();
  const handleConsumedClick = async (resourceId: string) => {
    await markResourceConsumed(resourceId);
    router.refresh();
  };
  return (
    <button onClick={() => handleConsumedClick(resourceId)}>√ consumed</button>
  );
};

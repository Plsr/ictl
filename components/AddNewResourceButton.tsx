"use client";

import { useRouter } from "next/navigation";

export const AddNewResourceButton = () => {
  const router = useRouter();

  const handleAddNewClick = () => {
    router.replace("?showAddModal");
  };

  return (
    <button
      className="bg-blue-600 py-2 text-sm px-4 rounded-lg"
      onClick={handleAddNewClick}
    >
      Add new
    </button>
  );
};

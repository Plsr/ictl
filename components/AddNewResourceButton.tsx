"use client";

import { useRouter } from "next/navigation";

export const AddNewResourceButton = () => {
  const router = useRouter();

  const handleAddNewClick = () => {
    router.replace("?showAddModal");
  };

  return <button onClick={handleAddNewClick}>Add new</button>;
};

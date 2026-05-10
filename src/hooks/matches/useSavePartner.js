import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { myBusinessApi } from "@/apis";

export function useSavePartner() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ partnerId, partnerType }) =>
      myBusinessApi.savePartner({ partnerId, partnerType }),
    onError: (error) => {
      if (error?.response?.status === 409) return;
      toast.error("파트너 저장에 실패했습니다.");
    },
  });

  const saveAll = async (partnerItems) => {
    if (partnerItems.length === 0) return { saved: 0, alreadySaved: 0 };

    const results = await Promise.allSettled(
      partnerItems.map((item) => mutateAsync(item)),
    );

    const saved = results.filter((r) => r.status === "fulfilled").length;
    const alreadySaved = results.filter(
      (r) => r.status === "rejected" && r.reason?.response?.status === 409,
    ).length;

    return { saved, alreadySaved };
  };

  return { saveAll, isPending };
}

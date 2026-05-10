import { useNavigate } from "react-router-dom";
import PartnerTable from "@/components/PartnerTable";
import SquareButton from "@/components/SquareButton";
import { useMyPartners } from "@/hooks/payments/useMyPartners";

export default function PaymentSelectPartner({
  selectedPartner,
  onSelect,
  onNext,
}) {
  const navigate = useNavigate();
  const { data, isFetching } = useMyPartners();
  const partners = (data?.data ?? []).map((p) => ({
    ...p,
    name: p.name_en || p.name_kr,
    location: { country: p.country },
    industry: (p.industry_en || p.industry_kr || "").split(";").filter(Boolean),
    profileText: p.intro_en || p.intro_kr,
    websiteUrl: p.website,
  }));

  const checkedIds = new Set(selectedPartner ? [selectedPartner._id] : []);

  const handleToggleOne = (id) => {
    const partner = partners.find((p) => p._id === id);
    onSelect(selectedPartner?._id === id ? null : partner);
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "40px 104px 20px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            background: "#fafafa",
            borderRadius: 8,
            padding: "4px 12px",
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 500, color: "#080616" }}>
            My Partner List
          </span>
        </div>
        <SquareButton
          variant="primary"
          onClick={() => navigate("/matches")}
          style={{ width: "auto", padding: "8px 16px" }}
        >
          Find More Partners
        </SquareButton>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 80px" }}>
        <PartnerTable
          partners={partners}
          isFetching={isFetching}
          submittedQuery={true}
          checkedIds={checkedIds}
          onToggleAll={() => {}}
          onToggleOne={handleToggleOne}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <SquareButton
          variant="primary"
          disabled={!selectedPartner}
          onClick={onNext}
        >
          Next
        </SquareButton>
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { newIdemKey } from "../apis/client";
import CurrencySelect from "../components/CurrencySelect.jsx";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import { useCreatePayment } from "../hooks/usePayments";
import { useMatches } from "../hooks/useMatches";
import { useAuthStore } from "../stores/authStore";

function isObjectId(value) {
  return /^[a-f0-9]{24}$/i.test(String(value || "").trim());
}

export default function Matches() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { buyerId: storedBuyerId } = useAuthStore();
  const [buyerInput, setBuyerInput] = useState(
    searchParams.get("buyerId") || storedBuyerId || "",
  );
  const [limitInput, setLimitInput] = useState(() => {
    const raw = Number(searchParams.get("limit") || 5);
    return Number.isFinite(raw) ? Math.min(Math.max(raw, 1), 20) : 5;
  });
  const [companyFilter, setCompanyFilter] = useState(
    searchParams.get("companyId") || "",
  );
  const [currency, setCurrency] = useState("XRP");
  const [message, setMessage] = useState("");
  const [submittedParams, setSubmittedParams] = useState(() => {
    const buyerId = searchParams.get("buyerId") || storedBuyerId;
    return isObjectId(buyerId) ? { buyerId, limit: 5 } : null;
  });
  const [creatingPaymentId, setCreatingPaymentId] = useState("");
  const navigate = useNavigate();

  const {
    data: matchesData,
    isFetching: loading,
    isError,
    error,
  } = useMatches(submittedParams?.buyerId, submittedParams?.limit, {
    enabled: !!submittedParams,
  });

  const matches = matchesData?.data || [];

  const filteredMatches = useMemo(() => {
    if (!companyFilter) return matches;
    return matches.filter(
      (item) => item.company && item.company._id === companyFilter,
    );
  }, [matches, companyFilter]);

  useMemo(() => {
    if (
      companyFilter &&
      matches.length > 0 &&
      matches.every((r) => r.company?._id !== companyFilter)
    ) {
      setMessage("Selected company is not in the latest top results.");
    }
  }, [matches, companyFilter]);

  const { mutateAsync: executeCreatePayment } = useCreatePayment();

  function updateParams(nextBuyerId, nextLimit, nextCompanyId) {
    const next = new URLSearchParams();
    if (nextBuyerId) next.set("buyerId", nextBuyerId);
    if (nextLimit) next.set("limit", String(nextLimit));
    if (nextCompanyId) next.set("companyId", nextCompanyId);
    setSearchParams(next);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!isObjectId(buyerInput)) {
      setMessage("Valid buyerId (24 hex) required.");
      return;
    }
    setMessage("");
    updateParams(buyerInput.trim(), limitInput, companyFilter.trim() || "");
    setSubmittedParams({ buyerId: buyerInput.trim(), limit: limitInput });
  }

  async function handleCreatePayment(companyId) {
    if (!submittedParams?.buyerId) return;
    setCreatingPaymentId(companyId);
    setMessage("");
    try {
      const res = await executeCreatePayment({
        payload: {
          amount: 1,
          currency,
          buyerId: submittedParams.buyerId,
          companyId,
        },
        idemKey: newIdemKey(),
      });
      const pid = res?._id;
      if (pid) navigate(`/payments/checkout/${pid}`);
    } catch (err) {
      setMessage(err.message || "Failed to create payment");
    } finally {
      setCreatingPaymentId("");
    }
  }

  return (
    <div>
      <h2>Matches</h2>
      <form className="form" onSubmit={onSubmit}>
        <div className="row gap-4" style={{ flexWrap: "wrap" }}>
          <input
            value={buyerInput}
            onChange={(e) => setBuyerInput(e.target.value)}
            placeholder="Buyer ID (Mongo ObjectId)"
          />
          <input
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            placeholder="Optional companyId filter"
          />
          <input
            type="number"
            min="1"
            max="20"
            value={limitInput}
            onChange={(e) =>
              setLimitInput(
                Math.min(Math.max(Number(e.target.value) || 1, 1), 20),
              )
            }
          />
          <Button type="submit" loading={loading}>
            Load Matches
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setBuyerInput("");
              setCompanyFilter("");
              setSubmittedParams(null);
              updateParams("", "", "");
            }}
            disabled={loading}
          >
            Clear
          </Button>
        </div>
      </form>
      <div className="mt-4">
        <CurrencySelect value={currency} onChange={setCurrency} />
      </div>

      {isError && (
        <div className="error mt-3" role="alert">
          {error?.message || "Failed to load matches"}
        </div>
      )}
      {message && (
        <div className="card mt-3" role="status">
          {message}
        </div>
      )}

      {!loading &&
        filteredMatches.length === 0 &&
        submittedParams &&
        !isError && (
          <div className="mt-4 muted">
            No matches yet. Try increasing the limit or updating company data.
          </div>
        )}

      <div
        className="grid mt-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
      >
        {filteredMatches.map((match) => (
          <Card key={match.company?._id || match.score}>
            <div className="row space">
              <div>
                <strong>{match.company?.name}</strong>
                <div className="muted small">{match.company?.industry}</div>
              </div>
              <span className="badge primary">
                score {Number(match.score).toFixed(2)}
              </span>
            </div>
            {match.company?.images?.[0]?.url && (
              <div
                style={{
                  marginTop: "1rem",
                  borderRadius: "8px",
                  overflow: "hidden",
                  maxHeight: "200px",
                }}
              >
                <img
                  src={match.company.images[0].url}
                  alt={match.company.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
            {(match.reasons || []).length > 0 && (
              <ul className="mt-3 small">
                {match.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            )}
            <div className="row gap-4 mt-3" style={{ flexWrap: "wrap" }}>
              <Button
                variant="secondary"
                onClick={() =>
                  navigate(`/companies?companyId=${match.company?._id}`)
                }
              >
                Details
              </Button>
              {match.company?.videoUrl && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    window.open(
                      match.company.videoUrl,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                >
                  Watch video
                </Button>
              )}
              <Button
                loading={creatingPaymentId === match.company?._id}
                onClick={() => handleCreatePayment(match.company?._id)}
              >
                Request Payment
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4">
        <Link to="/buyers/new">Create a new buyer</Link> ·{" "}
        <Link to="/companies">Browse companies</Link>
      </div>
    </div>
  );
}

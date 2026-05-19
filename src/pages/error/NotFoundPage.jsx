import { useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const location = useLocation();
  return (
    <div>
      <h2>404</h2>
      <p>Page not found: {location.pathname}</p>
    </div>
  );
}

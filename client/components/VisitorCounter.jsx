"use client";

import { useEffect, useState } from "react";
import { trackVisit } from "@/lib/api";

export default function VisitorCounter() {
  const [total, setTotal] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const data = await trackVisit();
        if (!cancelled) {
          setTotal(data.totalVisits ?? 0);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Analytics unavailable");
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <span className="text-[11px] text-slate-600">
        {error}
      </span>
    );
  }

  if (total == null) {
    return (
      <span className="text-[11px] text-slate-600">
        Loading visits…
      </span>
    );
  }

  return (
    <span className="text-[14px] text-slate-400">
      👀 Total visits:{" "}
      <span className="text-emerald-400 font-semibold">{total}</span>
    </span>
  );
}

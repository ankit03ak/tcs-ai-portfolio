const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function fetchProjects() {
  const res = await fetch(`${API_BASE_URL}/api/projects`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

export async function sendChatMessage(messages, mode = "default") {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ messages, mode })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Failed to get AI response");
  }

  return res.json();
}


export async function sendContactMessage(payload) {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Failed to submit contact form");
  }

  return data;
}


export async function trackVisit() {
  const res = await fetch(`${API_BASE_URL}/api/analytics/visit`, {
    method: "POST"
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Failed to track visit");
  }

  return data; // { totalVisits, lastVisitAt }
}

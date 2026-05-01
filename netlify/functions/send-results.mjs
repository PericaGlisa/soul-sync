export default async (request, context) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const RESEND_API_KEY = Netlify.env.get("RESEND_API_KEY");
  const ADMIN_EMAIL = Netlify.env.get("ADMIN_EMAIL") || "info@soulsyncco.net";
  const FROM_EMAIL = Netlify.env.get("FROM_EMAIL") || "SoulSync <onboarding@resend.dev>";

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "Resend API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { results } = payload;
  if (!results) {
    return new Response(JSON.stringify({ error: "Missing results" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const now = new Date().toLocaleString("sr-RS", { timeZone: "Europe/Belgrade" });

  const categoryRows = (results.categoryScores || [])
    .map(
      (cs) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;">${cs.category}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${cs.score}%</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${cs.rawScore} / ${cs.maxScore}</td>
        </tr>
      `
    )
    .join("");

  const recommendationsList = (results.recommendations || [])
    .map((rec) => `<li style="margin-bottom:6px;">${rec}</li>`)
    .join("");

  const html = `
    <div style="font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;color:#111827;">
      <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:28px 24px;border-radius:12px 12px 0 0;color:#fff;">
        <h1 style="margin:0;font-size:22px;">SoulSync — Novi rezultati upitnika</h1>
        <p style="margin:8px 0 0;opacity:0.9;font-size:14px;">Primljen: ${now}</p>
      </div>
      <div style="padding:24px;background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="font-size:42px;font-weight:800;color:#4f46e5;">${results.totalScore}<span style="font-size:18px;color:#6b7280;"> / 100</span></div>
          <div style="font-size:20px;margin-top:8px;font-weight:700;color:${results.status === "stable" ? "#16a34a" : results.status === "moderate" ? "#ca8a04" : "#dc2626"}">
            ${results.statusEmoji} ${results.statusLabel}
          </div>
        </div>

        <h2 style="font-size:16px;margin-top:24px;margin-bottom:10px;">Pregled po kategorijama</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="background:#f3f4f6;text-align:left;">
              <th style="padding:8px 12px;border-bottom:2px solid #e5e7eb;">Kategorija</th>
              <th style="padding:8px 12px;border-bottom:2px solid #e5e7eb;">Skor (%)</th>
              <th style="padding:8px 12px;border-bottom:2px solid #e5e7eb;">Rezultat (poeni)</th>
            </tr>
          </thead>
          <tbody>${categoryRows}</tbody>
        </table>

        <h2 style="font-size:16px;margin-top:24px;margin-bottom:10px;">Procena stanja</h2>
        <p style="background:#f9fafb;padding:14px;border-radius:8px;font-size:14px;line-height:1.6;">${results.insight}</p>

        <h2 style="font-size:16px;margin-top:24px;margin-bottom:10px;">Preporuke</h2>
        <ul style="background:#f9fafb;padding:14px 28px;border-radius:8px;font-size:14px;line-height:1.6;">
          ${recommendationsList}
        </ul>

        <p style="margin-top:24px;font-size:12px;color:#9ca3af;text-align:center;">
          Ovo je automatski generisan email iz SoulSync aplikacije.
        </p>
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `Novi rezultati upitnika — ${results.statusLabel} (${results.totalScore}/100)`,
        html,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return new Response(JSON.stringify({ error: data.message || "Resend error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

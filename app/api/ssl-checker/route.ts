import { connect } from "node:tls";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const host = new URL(request.url).searchParams.get("host")?.trim().replace(/^https?:\/\//, "").split("/")[0] ?? "";
  if (!host || !/^[a-zA-Z0-9.-]+$/.test(host)) return NextResponse.json({ error: "Enter a valid domain name." }, { status: 400 });
  return new Promise<Response>((resolve) => {
    const socket = connect({ host, port: 443, servername: host, timeout: 7000 }, () => {
      const certificate = socket.getPeerCertificate();
      const validFrom = certificate.valid_from;
      const validTo = certificate.valid_to;
      socket.end();
      resolve(NextResponse.json({ host, subject: certificate.subject?.CN ?? host, issuer: certificate.issuer?.O ?? "Unknown", validFrom, validTo, fingerprint: certificate.fingerprint256 ?? null }));
    });
    socket.on("error", () => resolve(NextResponse.json({ error: "Unable to establish a TLS connection to this domain." }, { status: 502 })));
    socket.on("timeout", () => { socket.destroy(); resolve(NextResponse.json({ error: "TLS connection timed out." }, { status: 504 })); });
  });
}

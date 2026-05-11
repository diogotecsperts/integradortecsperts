// AES-256-GCM symmetric encryption for OAuth tokens at rest.
// Key source: process.env.BLING_TOKEN_ENC_KEY (base64 ou texto >= 32 bytes).
import { randomBytes, createCipheriv, createDecipheriv, createHash } from "node:crypto";

function getKey(): Buffer {
  const raw = process.env.BLING_TOKEN_ENC_KEY;
  if (!raw) throw new Error("BLING_TOKEN_ENC_KEY não configurado");
  // Normaliza para 32 bytes via SHA-256 (aceita qualquer string como entrada).
  return createHash("sha256").update(raw, "utf8").digest();
}

export function encrypt(plaintext: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  // formato: v1.<iv_b64>.<tag_b64>.<ct_b64>
  return `v1.${iv.toString("base64")}.${tag.toString("base64")}.${enc.toString("base64")}`;
}

export function decrypt(payload: string): string {
  const parts = payload.split(".");
  if (parts.length !== 4 || parts[0] !== "v1") {
    throw new Error("Formato de cifragem inválido");
  }
  const [, ivB64, tagB64, ctB64] = parts;
  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const ct = Buffer.from(ctB64, "base64");
  const decipher = createDecipheriv("aes-256-gcm", getKey(), iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(ct), decipher.final()]);
  return dec.toString("utf8");
}

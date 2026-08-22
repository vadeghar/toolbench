"use client";

import { useState } from "react";

const base64url = (bytes: Uint8Array) => { let s=""; bytes.forEach(b=>s+=String.fromCharCode(b)); return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,""); };

export function JwtGeneratorTool() {
  const [payload,setPayload]=useState('{"sub":"toolbench","role":"user"}');
  const [secret,setSecret]=useState("");
  const [result,setResult]=useState("");
  const [error,setError]=useState("");
  async function generate(){try{const parsed=JSON.parse(payload);if(!secret){setError("Enter a signing secret.");setResult("");return;}const enc=new TextEncoder();const header={alg:"HS256",typ:"JWT"};const part=(v:unknown)=>base64url(enc.encode(JSON.stringify(v)));const signing=`${part(header)}.${part(parsed)}`;const key=await crypto.subtle.importKey("raw",enc.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);const signature=new Uint8Array(await crypto.subtle.sign("HMAC",key,enc.encode(signing)));setResult(`${signing}.${base64url(signature)}`);setError("");}catch{setError("Payload must be valid JSON.");setResult("");}}
  return <section className="tool-panel calculator-stack"><label className="calculator-field">Payload JSON<textarea value={payload} onChange={e=>setPayload(e.target.value)}/></label><label className="calculator-field">HS256 Secret<input type="password" value={secret} onChange={e=>setSecret(e.target.value)}/></label><button type="button" className="tool-button" onClick={generate}>Generate JWT</button>{error&&<div className="calculator-result"><strong>{error}</strong></div>}<label className="calculator-field">JWT<textarea value={result} readOnly/></label></section>;
}

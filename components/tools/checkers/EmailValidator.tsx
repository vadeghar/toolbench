"use client";

import { useMemo, useState } from "react";

export function EmailValidator(){const [email,setEmail]=useState("");const result=useMemo(()=>{if(!email.trim())return null;const valid=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());return {valid,message:valid?"Valid email format":"Invalid email format"}},[email]);return <div className="calculator-stack"><section className="tool-panel"><div className="calculator-field"><label htmlFor="email-value">Email address</label><input id="email-value" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@example.com"/></div></section>{result&&<section className="calculator-result"><div className="result-primary"><span>Result</span><strong className={result.valid?"validation-status valid":"validation-status invalid"}>{result.message}</strong></div><p className="tool-disclaimer">This checks syntax only. It does not confirm mailbox existence, deliverability, or domain MX records.</p></section>}</div>;}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Suggestion {
  id: string;
  place_name: string;
  text: string;
}

function LocationAutocomplete({ inputClass }: { inputClass: string }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (value: string) => {
    if (value.length < 2) { setSuggestions([]); return; }
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?types=place,locality,district&language=fr&limit=6&access_token=${MAPBOX_TOKEN}`
      );
      const data = await res.json();
      setSuggestions(data.features || []);
    } catch {
      setSuggestions([]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelected("");
    setOpen(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 280);
  };

  const handleSelect = (s: Suggestion) => {
    setQuery(s.place_name);
    setSelected(s.place_name);
    setSuggestions([]);
    setOpen(false);
  };

  // Fermer si clic extérieur
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        required
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder="Ex : Munich, Lyon, Madrid..."
        className={inputClass}
        style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "16px", paddingBottom: "16px" }}
        autoComplete="off"
      />
      {/* Champ caché pour forcer la sélection d'une suggestion */}
      <input type="hidden" value={selected} name="lieu" />

      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 top-full mt-1 w-full bg-white border border-black/10 rounded-xl shadow-lg overflow-hidden">
          {suggestions.map((s) => (
            <li
              key={s.id}
              onMouseDown={() => handleSelect(s)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-[#111111] hover:bg-[#f5f4f0] cursor-pointer transition-colors border-b border-black/5 last:border-0"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[#111111]/30 shrink-0">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>{s.place_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRegex = /^(\+33|0033|0)[1-9](\s?\d{2}){4}$/;

export default function DevisForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState("");

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  const validateEmail = (value: string) => {
    if (!value) return "";
    return emailRegex.test(value) ? "" : "Adresse email invalide";
  };

  const validatePhone = (value: string) => {
    if (!value) return "";
    const cleaned = value.replace(/\s/g, "");
    if (cleaned.length < 10) return "Numéro trop court";
    if (cleaned.length > 13) return "Numéro trop long";
    return phoneRegex.test(value) ? "" : "Format invalide (ex : 06 12 34 56 78)";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const eErr = validateEmail(email);
    const pErr = validatePhone(phone);
    setEmailError(eErr);
    setPhoneError(pErr);
    if (eErr || pErr) return;

    const form = e.currentTarget;
    const data = {
      nom:       (form.elements.namedItem("nom")       as HTMLInputElement)?.value,
      email,
      telephone: phone,
      type:      (form.elements.namedItem("type")      as HTMLSelectElement)?.value,
      lieu:      (form.elements.namedItem("lieu")      as HTMLInputElement)?.value,
      vehicule:  (form.elements.namedItem("vehicule")  as HTMLInputElement)?.value,
      infos:     (form.elements.namedItem("infos")     as HTMLTextAreaElement)?.value,
    };

    setLoading(true);
    setSendError("");
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSendError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "bg-[#f5f4f0] border border-black/10 rounded-xl text-[#111111] placeholder-[#111111]/25 text-sm focus:outline-none focus:border-[#111111]/40 transition-colors w-full";
  const inputStyle = { paddingLeft: "16px", paddingRight: "16px", paddingTop: "12px", paddingBottom: "12px" };

  return (
    <section id="devis" className="bg-white" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
      <div className="section-inner max-w-5xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "32px" }}
        >
          <p className="text-[#111111]/35 text-xs uppercase tracking-[0.2em]" style={{ marginBottom: "8px" }}>Devis gratuit</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#111111]">
              Obtenez votre tarif en 24h.
            </h2>
            <p className="text-[#111111]/40 text-sm md:shrink-0">Sans engagement. Réponse garantie sous 24 heures.</p>
          </div>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-black/8 rounded-2xl p-14 text-center bg-[#f5f4f0]"
          >
            <h3 className="text-xl font-semibold mb-3 text-[#111111]">Demande envoyée</h3>
            <p className="text-[#111111]/45 text-sm leading-relaxed mb-8">
              Notre équipe vous contactera dans les 24h pour vous communiquer votre devis personnalisé.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-sm text-[#111111]/40 hover:text-[#111111] underline underline-offset-4 transition-colors"
            >
              Faire une nouvelle demande
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            {/* Ligne 1 : Nom + Email + Téléphone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#111111]/50 text-xs uppercase tracking-widest">Nom complet</label>
                <input required name="nom" type="text" placeholder="Jean Dupont" className={inputClass} style={inputStyle} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#111111]/50 text-xs uppercase tracking-widest">Email</label>
                <input
                  required
                  type="email"
                  placeholder="jean@email.com"
                  value={email ?? ""}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(validateEmail(e.target.value)); }}
                  onBlur={() => setEmailError(validateEmail(email))}
                  className={`${inputClass} ${emailError ? "border-red-400" : ""}`}
                  style={inputStyle}
                />
                {emailError && <p className="text-red-400 text-xs mt-0.5">{emailError}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#111111]/50 text-xs uppercase tracking-widest">Téléphone</label>
                <input
                  required
                  type="tel"
                  placeholder="06 XX XX XX XX"
                  value={phone ?? ""}
                  onChange={(e) => { setPhone(e.target.value); setPhoneError(validatePhone(e.target.value)); }}
                  onBlur={() => setPhoneError(validatePhone(phone))}
                  className={`${inputClass} ${phoneError ? "border-red-400" : ""}`}
                  style={inputStyle}
                />
                {phoneError && <p className="text-red-400 text-xs mt-0.5">{phoneError}</p>}
              </div>
            </div>

            {/* Ligne 2 : Vous êtes + Lieu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#111111]/50 text-xs uppercase tracking-widest">Vous êtes</label>
                <select required name="type" className={inputClass} style={inputStyle}>
                  <option value="">Sélectionner...</option>
                  <option value="particulier">Particulier</option>
                  <option value="professionnel">Professionnel</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#111111]/50 text-xs uppercase tracking-widest">Lieu de prise en charge</label>
                <LocationAutocomplete inputClass={inputClass} />
              </div>
            </div>

            {/* Ligne 3 : Véhicule */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#111111]/50 text-xs uppercase tracking-widest">Véhicule</label>
              <input required name="vehicule" type="text" placeholder="Ex : BMW Série 3, 2022" className={inputClass} style={inputStyle} />
            </div>

            {/* Ligne 4 : Informations complémentaires */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#111111]/50 text-xs uppercase tracking-widest">Informations complémentaires</label>
              <textarea
                rows={2}
                name="infos"
                style={inputStyle}
                placeholder="Date souhaitée, contraintes particulières..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-[#111111] text-white text-sm font-medium px-10 py-4 rounded-full hover:bg-[#333] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Envoi en cours..." : "Envoyer ma demande"}
            </button>

            {sendError && <p className="text-red-400 text-xs text-center">{sendError}</p>}
            <p className="text-[#111111]/25 text-xs text-center pt-2">
              En soumettant ce formulaire, vous acceptez d&apos;être contacté par Take Car Convoyage.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}

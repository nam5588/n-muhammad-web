"use client";

import { useRef, useState } from "react";
import type { ActiveDocument } from "@/lib/cms";
import styles from "./ResumeDialog.module.css";

const TYPE_LABEL: Record<ActiveDocument["type"], string> = { RESUME: "Resume", PORTFOLIO: "Portfolio" };
const LANG_LABEL: Record<ActiveDocument["language"], string> = { EN: "English", KO: "한국어", UZ: "O‘zbekcha" };
const LANG_ORDER: ActiveDocument["language"][] = ["EN", "KO", "UZ"];

/**
 * Footer'dagi "Resume" tugmasi: popup'da tur va til tanlanadi, keyin PDF yuklab olinadi.
 * Faqat admin'da faol qilingan fayllar ko'rinadi; birorta ham bo'lmasa tugma chiqmaydi.
 */
export default function ResumeDialog({
	docs,
	label = "Resume",
	className,
}: {
	docs: Pick<ActiveDocument, "type" | "language">[];
	label?: string;
	/** Berilmasa footer'dagi kichik tugma ko'rinishi */
	className?: string;
}) {
	const dialog = useRef<HTMLDialogElement>(null);
	const types = (["RESUME", "PORTFOLIO"] as const).filter((t) => docs.some((d) => d.type === t));
	const [type, setType] = useState<ActiveDocument["type"]>(types[0] ?? "RESUME");
	const languages = LANG_ORDER.filter((l) => docs.some((d) => d.type === type && d.language === l));
	const [language, setLanguage] = useState<ActiveDocument["language"]>(languages[0] ?? "EN");

	if (types.length === 0) return null;

	// Tur almashganda tanlangan til u turda bo'lmasa, birinchi mavjudiga o'tamiz
	const lang = languages.includes(language) ? language : languages[0];
	const href = `/${type === "RESUME" ? "resume" : "portfolio"}?lang=${lang.toLowerCase()}&download=1`;

	return (
		<>
			<button type="button" className={className ?? styles.trigger} onClick={() => dialog.current?.showModal()}>
				{label}
			</button>
			<dialog
				ref={dialog}
				className={styles.dialog}
				aria-labelledby="resume-title"
				onClick={(e) => e.target === dialog.current && dialog.current?.close()}>
				<div className={styles.body}>
					<div className={styles.head}>
						<h2 id="resume-title">Download</h2>
						<button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close">
							×
						</button>
					</div>

					{types.length > 1 && (
						<fieldset className={styles.group}>
							<legend>Document</legend>
							<div className={styles.options}>
								{types.map((t) => (
									<label key={t} className={styles.option}>
										<input type="radio" name="doc-type" checked={type === t} onChange={() => setType(t)} />
										<span>{TYPE_LABEL[t]}</span>
									</label>
								))}
							</div>
						</fieldset>
					)}

					<fieldset className={styles.group}>
						<legend>Language</legend>
						<div className={styles.options}>
							{languages.map((l) => (
								<label key={l} className={styles.option}>
									<input type="radio" name="doc-lang" checked={lang === l} onChange={() => setLanguage(l)} />
									<span>{LANG_LABEL[l]}</span>
								</label>
							))}
						</div>
					</fieldset>

					<a href={href} className={styles.download} onClick={() => dialog.current?.close()}>
						Download {TYPE_LABEL[type]} (PDF)
					</a>
				</div>
			</dialog>
		</>
	);
}

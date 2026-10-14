import { Marked } from "marked";

/**
 * Post Markdown'ini HTML'ga aylantiradi. Sintaksis Telegram rich Markdown bilan bir xil,
 * shuning uchun GFM'dan tashqari ikkitasi qo'shilgan: ==belgilangan== va ||spoiler||.
 * Matnni faqat admin yozadi, shuning uchun HTML sanitize qilinmaydi.
 */
const md = new Marked({
	gfm: true,
	extensions: [
		{
			name: "mark",
			level: "inline",
			start: (src) => src.indexOf("=="),
			tokenizer(src) {
				const m = /^==(?!=)([^\n]+?)==/.exec(src);
				if (m) return { type: "mark", raw: m[0], tokens: this.lexer.inlineTokens(m[1]) };
			},
			renderer(token) {
				return `<mark>${this.parser.parseInline(token.tokens ?? [])}</mark>`;
			},
		},
		{
			name: "spoiler",
			level: "inline",
			start: (src) => src.indexOf("||"),
			tokenizer(src) {
				const m = /^\|\|([^\n]+?)\|\|/.exec(src);
				if (m) return { type: "spoiler", raw: m[0], tokens: this.lexer.inlineTokens(m[1]) };
			},
			renderer(token) {
				return `<span class="spoiler" tabindex="0">${this.parser.parseInline(token.tokens ?? [])}</span>`;
			},
		},
	],
});

export function renderMarkdown(source: string): string {
	return md.parse(source, { async: false }) as string;
}

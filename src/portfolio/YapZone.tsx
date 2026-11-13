import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { marked } from "marked";
import { profile, rants, type Rant } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowDot, Eyebrow } from "./shared";
import Sheet from "./Sheet";

function Card({ rant, index, featured, onOpen }: { rant: Rant; index: number; featured?: boolean; onOpen: () => void }) {
	return (
		<button
			onClick={onOpen}
			className={cn(
				"group relative flex h-full w-full flex-col overflow-hidden rounded-[22px] p-5 text-left transition-transform hover:-translate-y-1",
				featured ? "min-h-[340px] bg-[#121212] text-white sm:p-7" : "min-h-[220px] bg-[#f4f3f1]"
			)}
		>
			{featured && (
				<>
					<div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-kinetic/30 blur-3xl" aria-hidden />
					<span
						aria-hidden
						className="absolute -bottom-8 right-4 select-none text-[clamp(7rem,16vw,11rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.05]"
					>
						yap
					</span>
				</>
			)}
			<div className="relative flex items-center justify-between gap-3">
				<span
					className={cn(
						"rounded-full px-2.5 py-1 text-[9px] font-medium",
						featured ? "bg-white/10 text-white/70 ring-1 ring-white/10" : "bg-white text-ink/60"
					)}
				>
					Rant #{String(index + 1).padStart(2, "0")}
				</span>
				<span className={cn("text-[10px]", featured ? "text-white/40" : "text-ink/40")}>
					Mood: <span className="text-kinetic">{rant.mood}</span>
				</span>
			</div>
			<div className="relative mt-auto pt-10">
				<h3 className={cn("font-medium leading-[1.15] tracking-tight", featured ? "max-w-[380px] text-[clamp(1.5rem,3vw,2rem)]" : "text-[16px]")}>
					{rant.title}
				</h3>
				<p className={cn("mt-2 max-w-[400px] text-[12px] leading-relaxed", featured ? "text-white/55" : "text-ink/55")}>
					{rant.excerpt}
				</p>
				<div className="mt-5 flex items-center justify-between">
					<span className={cn("text-[11px]", featured ? "text-white/40" : "text-ink/40")}>{rant.minutes} min yap</span>
					<ArrowDot dark={!featured} />
				</div>
			</div>
		</button>
	);
}

/** Each rant has its own link, #yap=<id>, so it can be opened from the hero or shared. */
const idFromHash = () => {
	const match = window.location.hash.match(/^#yap=(.+)$/);
	return match ? decodeURIComponent(match[1]) : null;
};

export default function YapZone() {
	const [openId, setOpenId] = useState<string | null>(idFromHash);

	useEffect(() => {
		const onHash = () => setOpenId(idFromHash());
		window.addEventListener("hashchange", onHash);
		return () => window.removeEventListener("hashchange", onHash);
	}, []);

	const open = (id: string) => {
		history.replaceState(null, "", `#yap=${encodeURIComponent(id)}`);
		setOpenId(id);
	};
	const close = useCallback(() => {
		setOpenId(null);
		if (window.location.hash.startsWith("#yap=")) {
			history.replaceState(null, "", window.location.pathname + window.location.search);
		}
	}, []);

	const index = rants.findIndex((r) => r.id === openId);
	const rant = rants[index];
	const [first, ...rest] = rants;
	if (!first) return null;

	return (
		<section id="yap" className="scroll-mt-20 bg-[#f6f5f3]">
			<div className="mx-auto max-w-[1240px] px-5 py-20 md:px-10 md:py-28">
				<div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
					<div>
						<Eyebrow>The Yap Zone</Eyebrow>
						<h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.03em]">
							Unfiltered <span className="text-kinetic">Yapping</span>
							<br />
							&amp; Mildly Spicy Rants.
						</h2>
					</div>
					<p className="max-w-[300px] text-[13px] leading-relaxed text-ink/45 md:pb-1">
						Opinions nobody asked for, about code, bugs, users and the occasional
						spreadsheet. Read at your own risk.
					</p>
				</div>

				<div className="mt-12 grid gap-2.5 sm:gap-4 lg:grid-cols-[1fr_1.15fr]">
					<Card rant={first} index={0} featured onOpen={() => open(first.id)} />
					<div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4">
						{rest.map((r, i) => (
							<Card key={r.id} rant={r} index={i + 1} onOpen={() => open(r.id)} />
						))}
					</div>
				</div>
			</div>

			<Sheet
				open={!!rant}
				onClose={close}
				label={rant?.title ?? "Rant"}
				title={rant ? `Rant #${String(index + 1).padStart(2, "0")} · ${rant.minutes} min yap` : ""}
				width={560}
			>
				{rant && (
					<motion.article
						key={rant.id}
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.35 } }}
						className="mt-10"
					>
						<p className="text-[11px] text-white/40">
							Mood: <span className="text-kinetic">{rant.mood}</span>
						</p>
						<h3 className="mt-3 text-[clamp(1.8rem,6vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
							{rant.title}
						</h3>
						{rant.cover && (
							<img src={rant.cover} alt="" className="mt-8 aspect-[16/9] w-full rounded-[18px] object-cover" />
						)}
						<div
							className="yap-body mt-8 text-[15px] leading-relaxed text-white/70"
							// written by me in /admin and committed to the repo, so trusted
							dangerouslySetInnerHTML={{ __html: marked.parse(rant.body, { async: false }) }}
						/>
						<p className="mt-12 border-t border-white/10 pt-5 text-[12px] text-white/35">
							Disagree? Good,{" "}
							<a href={`mailto:${profile.email}?subject=${encodeURIComponent(`Re: ${rant.title}`)}`} className="text-white/70 underline underline-offset-4 hover:text-kinetic">
								tell me why
							</a>
							.
						</p>
					</motion.article>
				)}
			</Sheet>
		</section>
	);
}

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowUpRight, Frame, Photo, Reveal } from "@/components/ui";
import { projects, type Category } from "@/lib/data";

const tabs: ("All" | Category)[] = ["All", "Business", "Fintech", "Self-hosted", "Developer", "Community", "Gaming"];

export default function Projects() {
	return (
		<div id="projects" className="flex w-full scroll-mt-24 flex-col gap-6">
			<Lab />
			<Listings />
		</div>
	);
}

/** "lab." — grey stage, huge lowercase word, orange band, black arrow tab */
function Lab() {
	return (
		<Frame className="bg-[#e3e3e3]">
			<div className="flex items-center justify-between px-6 pt-5 text-[10px] font-bold uppercase md:px-10">
				<span>+{projects.length}</span>
				<span className="hidden gap-12 sm:flex">
					<span>Projects</span>
					<span>Self-hosted</span>
					<span>SaaS ▾</span>
				</span>
				<span>≡</span>
			</div>
			<div className="relative h-[340px] md:h-[380px]">
				<div className="absolute inset-x-0 bottom-[16%] top-[42%] bg-kinetic md:top-[38%]" />
				<div className="absolute bottom-[16%] left-0 grid h-12 w-12 place-items-center bg-ink text-white">
					→
				</div>

				<Reveal className="absolute left-6 top-[30%] md:left-10">
					<h2 className="text-[clamp(4rem,13vw,10rem)] font-bold leading-none tracking-tighter">
						builds<span className="text-ink">.</span>
					</h2>
				</Reveal>
				<p className="absolute left-6 top-[8%] max-w-[210px] text-[9px] font-semibold uppercase leading-relaxed text-ink/60 md:left-[30%]">
					Active builds · {projects.length} shipped
					<br />
					Self-hosted tools, SaaS, fintech and games, with more on the way.
				</p>

				<div className="absolute bottom-[16%] right-[6%] top-[4%] w-[44%] overflow-hidden md:right-[12%] md:w-[34%]">
					<div className="h-full w-full grayscale contrast-125">
						<Photo />
					</div>
					<div className="absolute inset-x-0 bottom-0 top-[44%] bg-kinetic mix-blend-multiply" />
				</div>

				<span
					className="absolute right-4 top-[14%] text-5xl font-black tracking-tighter md:right-8 md:text-7xl"
					style={{ writingMode: "vertical-rl" }}
				>
					LIVE
				</span>
				<div className="absolute bottom-3 left-6 right-6 flex justify-between text-[9px] font-semibold uppercase text-ink/70 md:left-10 md:right-10">
					<span>Selected work · {projects.length} live products</span>
					<span className="grid h-6 w-6 place-items-center bg-kinetic text-white">↓</span>
				</div>
			</div>
		</Frame>
	);
}

/** Tabbed listing carousel (tabs + arrows + cards with a black "View" pill) */
function Listings() {
	const [tab, setTab] = useState<(typeof tabs)[number]>("All");
	const [page, setPage] = useState(0);
	const track = useRef<HTMLDivElement>(null);
	const list = projects.filter((p) => tab === "All" || p.category === tab);

	const scroll = (dir: number) => {
		const el = track.current;
		if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
	};
	const onScroll = () => {
		const el = track.current;
		if (el) setPage(Math.round(el.scrollLeft / (el.clientWidth * 0.9)));
	};
	const choose = (t: (typeof tabs)[number]) => {
		setTab(t);
		setPage(0);
		track.current?.scrollTo({ left: 0 });
	};
	const pages = Math.max(1, Math.ceil(list.length / 3));

	return (
		<Frame className="bg-[#f3f3f1] p-4 md:p-8">
			<div className="mb-5 flex items-center justify-between gap-3">
				<div className="flex gap-1 overflow-x-auto rounded-xl bg-white p-1.5 text-[11px] font-medium shadow-sm">
					{tabs.map((t) => (
						<button
							key={t}
							onClick={() => choose(t)}
							className={`shrink-0 rounded-lg px-3 py-1.5 transition-colors ${
								tab === t ? "bg-ink text-white" : "text-ink/55 hover:text-ink"
							}`}
						>
							{t}
						</button>
					))}
				</div>
				<div className="hidden gap-2 sm:flex">
					<button onClick={() => scroll(-1)} aria-label="Previous" className="grid h-7 w-7 place-items-center rounded-full bg-white text-ink/50 shadow-sm hover:text-ink">
						<ChevronLeft size={14} />
					</button>
					<button onClick={() => scroll(1)} aria-label="Next" className="grid h-7 w-7 place-items-center rounded-full bg-ink text-white">
						<ChevronRight size={14} />
					</button>
				</div>
			</div>

			<div
				ref={track}
				onScroll={onScroll}
				className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
			>
				{list.map((p) => (
					<article
						key={p.id}
						className="flex w-[82%] shrink-0 snap-start flex-col rounded-2xl bg-white p-2.5 shadow-sm ring-1 ring-black/5 sm:w-[calc((100%-2rem)/3)]"
					>
						<div
							className="relative h-44 overflow-hidden rounded-xl"
							style={{ background: `linear-gradient(150deg, ${p.accent[0]}, ${p.accent[1]})` }}
						>
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.4),transparent_50%)]" />
							<span className="absolute -bottom-6 -right-2 select-none text-[9rem] font-black leading-none text-white/15">
								{p.name[0]}
							</span>
							<span className="absolute left-3 top-3 rounded-full bg-white/25 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
								{p.category}
							</span>
						</div>
						<div className="flex flex-1 flex-col px-1.5 pb-1 pt-3">
							<h3 className="text-sm font-bold leading-tight">{p.name}</h3>
							<p className="mt-1 text-[11px] font-medium text-ink/70">{p.tagline}</p>
							<p className="mt-1.5 line-clamp-3 text-[10px] leading-relaxed text-ink/50">{p.description}</p>
							<div className="mt-3 flex flex-wrap gap-1">
								{p.tags.map((t) => (
									<span key={t} className="rounded-full bg-bone px-2 py-0.5 text-[9px] text-ink/60">{t}</span>
								))}
							</div>
							<div className="mt-auto flex items-center justify-between pt-4">
								<span className="text-[10px] font-semibold text-kinetic">● Live</span>
								<a
									href={p.url}
									target="_blank"
									rel="noreferrer"
									className="flex items-center gap-1 rounded-full bg-ink px-5 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-kinetic"
								>
									View <ArrowUpRight className="h-3 w-3" />
								</a>
							</div>
						</div>
					</article>
				))}
			</div>

			<div className="mt-4 flex justify-center gap-1.5">
				{Array.from({ length: pages }).map((_, i) => (
					<span key={i} className={`h-1.5 rounded-full transition-all ${i === page ? "w-5 bg-kinetic" : "w-1.5 bg-ink/25"}`} />
				))}
			</div>
		</Frame>
	);
}

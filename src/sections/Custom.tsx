import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowUpRight, Frame, Reveal } from "@/components/ui";
import { byId, profile } from "@/lib/data";
import { viscous } from "@/lib/motion";

type Card = {
	title: string;
	body: string;
	cta: string;
	subject: string;
	/** local screenshot; cards without one get a generated browser mock-up */
	image?: string;
	demo?: string;
	accent: [string, string];
	custom?: boolean;
};

const happy = byId("happy-life");
const draft = byId("question-draft");

const cards: Card[] = [
	{
		title: happy.name,
		body: "A mini e-commerce platform you deploy on your own website. Payments are built in, and an admin dashboard manages your sales.",
		cta: "Get this",
		subject: "Self-hosted: Happy Life Store",
		image: "./assets/happy-life-store.png",
		demo: happy.url,
		accent: happy.accent,
	},
	{
		title: draft.name,
		body: "Feeds on past exam papers, captures the questions, then generates brand-new exams from the criteria you configure.",
		cta: "Get this",
		subject: "Self-hosted: QuestionDraft",
		accent: draft.accent,
	},
	{
		title: "Something else?",
		body: "Your process is different. I design and build self-hosted tools around how your business actually works.",
		cta: "I need a different solution",
		subject: "Custom self-hosted solution",
		accent: ["#bef264", "#4d7c0f"],
		custom: true,
	},
];

const mail = (subject: string) =>
	`mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;

/** Placeholder artwork: a stylised browser window on the product's colours */
function Mock({ accent }: { accent: [string, string] }) {
	return (
		<div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${accent[0]}, ${accent[1]})` }}>
			<div className="absolute inset-x-5 top-14 rounded-xl bg-white/90 p-2.5 shadow-xl">
				<div className="flex gap-1">
					{[0, 1, 2].map((i) => (
						<span key={i} className="h-1.5 w-1.5 rounded-full bg-ink/25" />
					))}
				</div>
				<div className="mt-2.5 h-14 rounded-md" style={{ background: `linear-gradient(120deg, ${accent[0]}, ${accent[1]})`, opacity: 0.85 }} />
				<div className="mt-2 grid grid-cols-3 gap-1.5">
					{[0, 1, 2].map((i) => (
						<span key={i} className="h-8 rounded bg-ink/10" />
					))}
				</div>
				<div className="mt-2 h-1.5 w-2/3 rounded bg-ink/15" />
			</div>
		</div>
	);
}

/** "Prospective customer segmentation" layout: intro left, swipeable image cards right */
export default function Custom() {
	const track = useRef<HTMLDivElement>(null);
	// click a card's number badge to pull that card to the front
	const [order, setOrder] = useState(cards.map((_, i) => i));
	const toFront = (i: number) => setOrder((o) => [i, ...o.filter((x) => x !== i)]);
	const scroll = (dir: number) =>
		track.current?.scrollBy({ left: dir * 260, behavior: "smooth" });

	return (
		<Frame className="bg-white p-5 md:p-8">
			<div className="flex items-center justify-between gap-3 font-mono text-[10px] font-medium uppercase tracking-wider">
				<span data-egg="ink" className="cursor-pointer rounded-full bg-ink px-4 py-2 text-white">Self-hosted</span>
				<span data-egg="melt" className="hidden cursor-pointer sm:inline">↳ Custom solutions</span>
			</div>

			<div className="mt-8 grid gap-8 md:grid-cols-[0.8fr_2.2fr]">
				<Reveal className="flex flex-col">
					<h2 data-egg="melt" className="text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-[1.1] tracking-tight">
						Self-hosted
						<br />
						<span data-egg="blob" data-egg-color="#ff6122" className="-ml-1.5 inline-block cursor-pointer rounded-lg bg-bone px-1.5">custom</span>
						<br />
						solutions
					</h2>
					<p className="mt-5 max-w-[250px] text-xs leading-relaxed text-ink/65">
						Software that lives on your own website or server, with no
						platform fees and no lock-in. Here are two I've already built,
						or tell me what your business needs.
					</p>
					<div className="mt-auto flex items-center gap-2 pt-8">
						<span data-egg="spin" className="mr-3 grid cursor-pointer place-items-center"><ArrowUpRight className="h-7 w-7" /></span>
						<button data-egg="ink" data-egg-color="#141414" onClick={() => scroll(-1)} aria-label="Scroll left" className="grid h-8 w-8 place-items-center rounded-full border border-ink/20 transition-colors hover:text-white">
							<ChevronLeft size={15} />
						</button>
						<button data-egg="ink" data-egg-color="#141414" onClick={() => scroll(1)} aria-label="Scroll right" className="grid h-8 w-8 place-items-center rounded-full border border-ink/20 transition-colors hover:text-white">
							<ChevronRight size={15} />
						</button>
					</div>
				</Reveal>

				<div
					ref={track}
					className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
				>
					{order.map((i) => {
						const c = cards[i];
						return (
						<motion.article
							key={c.title}
							layout
							transition={viscous}
							className="group relative h-[440px] w-[78%] shrink-0 snap-start overflow-hidden rounded-[28px] bg-ink text-white sm:w-[calc((100%-2rem)/3)]"
						>
							{c.image ? (
								<img src={c.image} alt={`${c.title} screenshot`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
							) : (
								<Mock accent={c.accent} />
							)}
							<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />
							<button
								data-egg="drip"
								data-egg-color="#ffffff"
								onClick={() => toFront(i)}
								aria-label={`Move ${c.title} to the front`}
								className="absolute left-4 top-4 grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-white text-xs font-semibold text-ink"
							>
								{order.indexOf(i) + 1}
							</button>
							{c.demo && (
								<a href={c.demo} target="_blank" rel="noreferrer" data-egg="ink" className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-medium backdrop-blur transition-colors hover:bg-black/60">
									Live demo <ArrowUpRight className="h-3 w-3" />
								</a>
							)}
							<div className="absolute inset-x-0 bottom-0 p-5">
								<h3 data-egg="melt" className="w-fit text-base font-bold leading-tight">{c.title}</h3>
								<p className="mt-2 text-[12px] leading-relaxed text-white/80">{c.body}</p>
								<a
									href={mail(c.subject)}
									data-egg="ink"
									data-egg-color={c.custom ? "#ffffff" : "#141414"}
									className={`mt-4 flex items-center justify-between rounded-full py-1.5 pl-5 pr-1.5 text-xs font-semibold transition-transform hover:-translate-y-0.5 ${
										c.custom ? "bg-[#c8f542] text-ink" : "bg-kinetic text-white"
									}`}
								>
									{c.cta}
									<span data-egg="magnet" className={`grid h-8 w-8 place-items-center rounded-full ${c.custom ? "bg-ink/10" : "bg-white/25"}`}>
										<ArrowRight size={15} />
									</span>
								</a>
							</div>
						</motion.article>
						);
					})}
				</div>
			</div>
		</Frame>
	);
}

import { rants } from "@/lib/data";
import { Eyebrow, PillButton } from "./shared";
import { YapCard } from "./yap";

/** Landing-page teaser: the five newest rants, with a way into the full Yap Zone page. */
export default function YapZone() {
	const [first, ...rest] = rants.slice(0, 5);
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
					<div className="md:pb-1">
						<p className="max-w-[300px] text-[13px] leading-relaxed text-ink/45">
							Opinions nobody asked for, about code, bugs, users and the occasional
							spreadsheet. Read at your own risk.
						</p>
						<div className="mt-5">
							<PillButton href="/yap">See all {rants.length} yaps</PillButton>
						</div>
					</div>
				</div>

				<div className="mt-12 grid gap-2.5 sm:gap-4 lg:grid-cols-[1fr_1.15fr]">
					<YapCard rant={first} featured />
					<div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4">
						{rest.map((r) => (
							<YapCard key={r.id} rant={r} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

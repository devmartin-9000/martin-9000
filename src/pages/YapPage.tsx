import { useEffect, useState } from "react";
import { rants } from "@/lib/data";
import { useRouteItem } from "@/lib/route";
import Nav from "@/portfolio/Nav";
import Contact from "@/portfolio/Contact";
import { Chips, PageIntro } from "@/portfolio/shared";
import { YapCard, YapReader } from "@/portfolio/yap";

const moods = [...new Set(rants.map((r) => r.mood))];
const totalMinutes = rants.reduce((sum, r) => sum + r.minutes, 0);

/** /yap: every rant, filterable by mood. /yap/<id> opens that rant in the reader. */
export default function YapPage() {
	const { id, open, close } = useRouteItem("/yap");
	const [mood, setMood] = useState<string | null>(null);
	const rant = rants.find((r) => r.id === id);

	useEffect(() => {
		document.title = rant ? `${rant.title} · Yap Zone` : "Yap Zone · Martin Jack";
	}, [rant]);

	const shown = mood ? rants.filter((r) => r.mood === mood) : rants;
	const [first, ...rest] = shown;

	return (
		<div className="bg-white">
			<Nav />
			<PageIntro
				eyebrow="The Yap Zone"
				title={
					<>
						Unfiltered <span className="text-kinetic">Yapping</span> &amp; Mildly Spicy Rants.
					</>
				}
				intro="Opinions nobody asked for, about code, bugs, users and the occasional spreadsheet. Newest first. Read at your own risk."
				stats={`${rants.length} rants · ${totalMinutes} min of yapping`}
			>
				{moods.length > 1 && <Chips label="Filter by mood" options={moods} value={mood} onChange={setMood} />}
			</PageIntro>

			<main className="mx-auto max-w-[1240px] px-5 py-12 md:px-10 md:py-16">
				{first ? (
					<div className="grid gap-2.5 sm:gap-4 lg:grid-cols-3">
						<div className="lg:col-span-2">
							<YapCard rant={first} featured onOpen={() => open(first.id)} />
						</div>
						{rest.map((r) => (
							<YapCard key={r.id} rant={r} onOpen={() => open(r.id)} />
						))}
					</div>
				) : (
					<p className="py-20 text-center text-[14px] text-ink/50">No rants yet. Suspiciously calm.</p>
				)}
			</main>

			<Contact />
			<YapReader rant={rant} onClose={close} />
		</div>
	);
}

import { Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { LockUnlockIcon, NotificationIcon } from "../ui/animated-state-icons";
import GlowBlob from "../ui/GlowBlob";
import Reveal from "../ui/Reveal";
import SectionContainer from "../ui/SectionContainer";
import { BENTO_HEADING, BENTO_INTRO } from "@/lib/constants";

export default function SectionExtras() {
  return (
    <section
      className="proto-flowty relative overflow-hidden py-28 sm:py-36"
      style={{ background: "var(--bg)" }}
    >
      <GlowBlob className="left-[8%] top-[30rem]" size="46rem" color="rgba(255,107,156,0.24)" />
      <GlowBlob className="bottom-[-14%] right-[6%]" size="38rem" color="rgba(219,169,112,0.16)" delay="-6s" />

      <SectionContainer className="relative z-10">
        <Reveal>
          <h2 className="max-w-xl text-[2.5rem] font-extrabold leading-[0.98] tracking-tight text-[var(--text)] sm:text-[3.25rem]">
            {BENTO_HEADING.line1}
            <br />
            {BENTO_HEADING.line2}
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-[var(--text-muted)]">{BENTO_INTRO}</p>
        </Reveal>

        <Reveal delay={80} className="mt-14">
          <div className="grid grid-cols-6 gap-4">
            <Card className="relative col-span-full flex overflow-hidden lg:col-span-2">
              <CardContent className="relative m-auto size-fit pt-6">
                <div className="relative flex h-24 w-56 items-center">
                  <svg className="absolute inset-0 size-full text-[var(--border)]" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="mx-auto block w-fit text-5xl font-semibold text-[var(--text)]">24/7</span>
                </div>
                <h3 className="mt-6 text-center text-2xl font-semibold text-[var(--text)]">Toujours disponible</h3>
              </CardContent>
            </Card>

            <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
              <CardContent className="pt-6">
                <div className="relative mx-auto flex aspect-square size-32 rounded-full border border-[var(--border)] before:absolute before:-inset-2 before:rounded-full before:border before:border-[var(--border)]">
                  <LockUnlockIcon size={40} color="var(--accent)" className="m-auto" />
                </div>
                <div className="relative z-10 mt-6 space-y-2 text-center">
                  <h3 className="text-lg font-medium text-[var(--text)]">Sécurité intégrée</h3>
                  <p className="text-[var(--text-muted)]">
                    Paiements et données protégés, à chaque réservation.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
              <CardContent className="pt-6">
                <div className="pt-6 lg:px-6">
                  <svg className="w-full text-[var(--border)]" viewBox="0 0 386 123" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 121.077C3 121.077 15.3041 93.6691 36.0195 87.756C56.7349 81.8429 66.6632 80.9723 66.6632 80.9723C66.6632 80.9723 80.0327 80.9723 91.4656 80.9723C102.898 80.9723 100.415 64.2824 108.556 64.2824C116.696 64.2824 117.693 92.1332 125.226 92.1332C132.759 92.1332 142.07 78.5115 153.591 80.9723C165.113 83.433 186.092 92.1332 193 92.1332C199.908 92.1332 205.274 64.2824 213.017 64.2824C220.76 64.2824 237.832 93.8946 243.39 92.1332C248.948 90.3718 257.923 60.5 265.284 60.5C271.145 60.5 283.204 87.7182 285.772 87.756C293.823 87.8746 299.2 73.0802 304.411 73.0802C311.283 73.0802 321.425 65.9506 333.552 64.2824C345.68 62.6141 346.91 82.4553 362.27 80.9723C377.629 79.4892 383 106.605 383 106.605"
                      stroke="var(--accent)"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                <div className="relative z-10 mt-14 space-y-2 text-center">
                  <h3 className="text-lg font-medium text-[var(--text)]">Statistiques claires</h3>
                  <p className="text-[var(--text-muted)]">Suis tes revenus et ton remplissage, sans effort.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="relative col-span-full overflow-hidden lg:col-span-3">
              <CardContent className="grid pt-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                  <div className="relative flex aspect-square size-12 rounded-full border border-[var(--border)] before:absolute before:-inset-2 before:rounded-full before:border before:border-[var(--border)]">
                    <NotificationIcon size={22} color="var(--text)" className="m-auto" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-[var(--text)]">Zéro no-show, garanti.</h3>
                    <p className="text-[var(--text-muted)]">Les rappels partent automatiquement, tu n&apos;as plus à y penser.</p>
                  </div>
                </div>
                <div className="relative -mb-6 -mr-6 mt-6 h-fit rounded-tl-2xl border-l border-t border-[var(--border)] p-6 py-6 sm:ml-6">
                  <div className="absolute left-3 top-2 flex gap-1">
                    <span className="block size-2 rounded-full border border-[var(--border)] bg-[var(--bg-surface)]" />
                    <span className="block size-2 rounded-full border border-[var(--border)] bg-[var(--bg-surface)]" />
                    <span className="block size-2 rounded-full border border-[var(--border)] bg-[var(--bg-surface)]" />
                  </div>
                  <div className="mt-6 space-y-2">
                    <p className="rounded-xl rounded-tl-sm bg-[var(--bg-surface)] px-3 py-2.5 text-[0.8rem] leading-snug text-[var(--text-muted)]">
                      Bonjour Sophie 👋 Rappel RDV demain 10h30.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-[var(--bg-surface)] px-3 py-2.5">
                        <p className="text-lg font-bold leading-none text-[var(--text)]">98 %</p>
                        <p className="mt-1.5 text-[0.7rem] leading-none text-[var(--text-muted)]">Taux de remplissage</p>
                      </div>
                      <div className="rounded-xl bg-[var(--bg-surface)] px-3 py-2.5">
                        <p className="text-lg font-bold leading-none text-[var(--text)]">0</p>
                        <p className="mt-1.5 text-[0.7rem] leading-none text-[var(--text-muted)]">No-show ce mois</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative col-span-full overflow-hidden lg:col-span-3">
              <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                  <div className="relative flex aspect-square size-12 rounded-full border border-[var(--border)] before:absolute before:-inset-2 before:rounded-full before:border before:border-[var(--border)]">
                    <Users className="m-auto size-5 text-[var(--text)]" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-[var(--text)]">Elle sait qu&apos;elle compte pour vous.</h3>
                    <p className="text-[var(--text-muted)]">Historique, préférences, notes — chaque fiche cliente à portée de main.</p>
                  </div>
                </div>
                <div className="relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px before:bg-[var(--border)] sm:-my-6 sm:-mr-6">
                  <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                    {[
                      { initials: "SM", name: "Sophie M." },
                      { initials: "LD", name: "Léa D." },
                      { initials: "MF", name: "Marie F." },
                    ].map((client, i) => (
                      <div
                        key={client.initials}
                        className={
                          i % 2 === 0
                            ? "relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2"
                            : "relative ml-[calc(50%-1rem)] flex items-center gap-2"
                        }
                      >
                        {i % 2 === 0 && (
                          <span className="block h-fit rounded border border-[var(--border)] px-2 py-1 text-xs text-[var(--text)] shadow-sm">
                            {client.name}
                          </span>
                        )}
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--bg-surface)] text-[0.65rem] font-semibold text-[var(--text)] ring-4 ring-[var(--card)]">
                          {client.initials}
                        </span>
                        {i % 2 !== 0 && (
                          <span className="block h-fit rounded border border-[var(--border)] px-2 py-1 text-xs text-[var(--text)] shadow-sm">
                            {client.name}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

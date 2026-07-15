import { createBlob, type BlobController } from "blob";
import type { Lang } from "./projects";

interface GuideDeps {
  lang: Lang;
  openProject(id: string): void;
  closeProject(): void;
}

const ACCENT = "#9d75fc";

const LINES = {
  en: {
    hello: "Hi! I'm Blob. Let me introduce the person behind this portfolio.",
    intro1: "This is Felipe G. Brandão, a.k.a. Feeeh — a .NET developer from São Paulo, Brazil.",
    intro2: "At SESI São Paulo he builds APIs and web portals for the FIESP ecosystem, focused on performance and technical SEO.",
    education: "He has a B.Sc. in Computer Science and is taking an MBA in .NET systems architecture at FIAP.",
    projects: "And this is the work he's proud of — from institutional portals to game servers.",
    kiko: "My favorite: IA Kiko, an AI platform he co-founded that turns children into authors of their own stories.",
    bye: "That's the tour! Click any card to explore — and poke me if you want it again.",
  },
  pt: {
    hello: "Oi! Eu sou o Blob. Deixa eu te apresentar a pessoa por trás deste portfólio.",
    intro1: "Este é Felipe G. Brandão, o Feeeh — desenvolvedor .NET de São Paulo.",
    intro2: "No SESI São Paulo ele constrói APIs e portais web para o ecossistema FIESP, com foco em performance e SEO técnico.",
    education: "Formado em Ciência da Computação, agora cursa MBA em Arquitetura de Sistemas .NET na FIAP.",
    projects: "E estes são os trabalhos de que ele se orgulha — de portais institucionais a servidores de jogos.",
    kiko: "Meu favorito: o IA Kiko, plataforma de IA que ele cofundou e que transforma crianças em autoras das próprias histórias.",
    bye: "Fim do tour! Clique em qualquer card para explorar — e me cutuque se quiser de novo.",
  },
};

// Time-based rather than frame-based: a frame count misreads high-refresh
// displays (3 frames at 144 Hz elapse before a smooth scroll even starts).
const SCROLL_SETTLE_MS = 250;

/** Resolves once the window scroll position has been still for a moment. */
function waitForScrollEnd(): Promise<void> {
  return new Promise((resolve) => {
    let last = window.scrollY;
    let stillSince = performance.now();
    const tick = (now: number): void => {
      if (window.scrollY !== last) {
        last = window.scrollY;
        stillSince = now;
      } else if (now - stillSince >= SCROLL_SETTLE_MS) {
        return resolve();
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/**
 * How far the visitor may scroll during a step with no on-page target (Blob
 * speaking from home) before it counts as leaving the tour: a wheel nudge
 * shouldn't end it, deliberately moving half a viewport away should.
 */
function freeScrollLimit(): number {
  return Math.max(200, window.innerHeight / 2);
}

export function initBlobGuide({ lang, openProject, closeProject }: GuideDeps): void {
  const t = LINES[lang];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // scroll.auto is set while the tour itself drives the scroll, so the "user
  // scrolled away" retreat check ignores Blob's own navigation. scroll.origin
  // is where the page sat when the current step took over.
  const scroll = { auto: false, origin: 0 };

  // Assigned right after createBlob(); scrollToSection only runs from story
  // steps, which can't fire before creation returns.
  let guide: BlobController | null = null;

  const scrollToSection = async (selector: string): Promise<void> => {
    const section = document.querySelector(selector);
    scroll.auto = true;
    try {
      // "instant", not "auto": auto defers to the page's scroll-smooth CSS,
      // which is exactly the animation a reduced-motion visitor opted out of.
      section?.scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
        block: "start",
      });
      await waitForScrollEnd();
    } finally {
      scroll.auto = false;
      scroll.origin = window.scrollY;
    }
    // The visitor can cancel a smooth scroll by scrolling themselves; if the
    // section never made it on screen they took the wheel — retreat instead
    // of narrating an off-screen element.
    if (section !== null) {
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) guide?.skip();
    }
  };

  guide = createBlob({
    body: { color: ACCENT, size: 36, points: 48 },
    physics: { stiffness: 190, bobAmplitude: 5, breatheAmplitude: 0.08 },
    bubble: {
      background: "#14061c",
      color: "#e4e4e7",
      borderColor: ACCENT,
      borderWidth: 3,
      shape: "square",
      fontFamily: "'Press Start 2P', monospace",
      fontSize: 10,
      lineHeight: 1.8,
      maxWidth: 280,
      characterDelay: 18,
      autoAdvance: 2400,
      ariaLabel: lang === "pt" ? "Blob fala" : "Blob says",
    },
    attachment: { gap: 10, side: "nearest" },
    morph: { shape: "rounded", padding: 14, radius: 16, strokeColor: ACCENT, strokeWidth: 6 },
    // A visitor following a #fragment link came for that section — don't
    // scroll them away (the browser's own fragment scroll would also be
    // misread as the visitor leaving the tour). Poking Blob still starts it.
    autoStart: window.location.hash === "",
    glitch: true,
    storageKey: "feeeh-blob",
    labels: lang === "pt"
      ? { guide: "Blob, seu guia", dismiss: "Dispensar o Blob", restore: "Restaurar o Blob" }
      : undefined,
    // Circle the section headings: the full-width sections would morph Blob
    // into a ring larger than the viewport, especially on phones.
    story: [
      { sleep: 900, say: t.hello },
      { run: () => scrollToSection("#introduction"), circle: "#introduction > h2", say: t.intro1 },
      { circle: "#introduction > h2", say: t.intro2 },
      { run: () => scrollToSection("#education"), circle: "#education > h2", say: t.education },
      { run: () => scrollToSection("#projects"), circle: "#projects > h2", say: t.projects },
      { run: () => openProject("ia-kiko"), attachTo: "#modal-title", attach: { gap: 12 }, say: t.kiko },
      { run: () => closeProject(), detach: true },
      { say: t.bye },
    ],
    script(blob) {
      let touring = false;
      let target: HTMLElement | null = null;

      const clearTarget = (): void => {
        target = null;
        scroll.origin = window.scrollY;
      };

      blob.on("start", () => {
        touring = true;
        clearTarget();
        // A poke-replay with a project modal open would tour behind the
        // overlay; the visitor asked for the tour, so clear the stage.
        closeProject();
      });
      blob.on("end", () => { touring = false; clearTarget(); });
      // Dismissing Blob must also stop what Blob is doing.
      blob.on("dismiss", () => blob.skip());
      // Retreat only applies once Blob has landed on the step's target;
      // each step clears the previous one so a stale off-screen section
      // can't end the tour while Blob is still travelling.
      blob.on("step", clearTarget);
      blob.on("detach", clearTarget);
      blob.on("attach", (element) => { target = element; });
      blob.on("circle", (element) => { target = element; });

      const onUserScroll = (): void => {
        if (!touring || scroll.auto) return;
        if (target === null) {
          // Blob is speaking from home (or travelling): a deliberate scroll
          // away means the visitor took the wheel — don't hijack it back.
          if (Math.abs(window.scrollY - scroll.origin) > freeScrollLimit()) blob.skip();
          return;
        }
        const rect = target.getBoundingClientRect();
        const gone = rect.width === 0 && rect.height === 0;
        if (gone || rect.bottom < 0 || rect.top > window.innerHeight) {
          // The visitor scrolled past Blob (or its target vanished):
          // end the tour and go idle.
          blob.skip();
        }
      };
      // Opening a project locks page scroll, so the scroll-based retreat can
      // never fire inside a modal — treat the click itself as taking over
      // (and it keeps the tour from later replacing or closing their modal).
      const onCardClick = (event: MouseEvent): void => {
        if (touring && (event.target as Element | null)?.closest(".project-card")) blob.skip();
      };
      window.addEventListener("scroll", onUserScroll, { passive: true });
      document.addEventListener("click", onCardClick, true);
      return () => {
        window.removeEventListener("scroll", onUserScroll);
        document.removeEventListener("click", onCardClick, true);
      };
    },
  });
}

import "./styles/tailwind.css";
import "./styles/main.scss";
import { categories, projects, type Project } from "./projects";

// ---------- Mobile nav ----------
const navToggle = document.getElementById("nav-toggle")!;
const navMenu = document.getElementById("nav-menu")!;

navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("hidden");
  navMenu.classList.toggle("flex", !open);
  navToggle.setAttribute("aria-expanded", String(!open));
});

navMenu.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).tagName === "A" && !navMenu.classList.contains("hidden")) {
    navMenu.classList.add("hidden");
    navMenu.classList.remove("flex");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// ---------- Render project categories & cards ----------
const root = document.getElementById("projects-root")!;

for (const category of categories) {
  const items = projects.filter((p) => p.category === category.id);
  if (items.length === 0) continue;

  const single = items.length === 1;
  const section = document.createElement("div");
  section.innerHTML = `
    <h3 class="font-pixel mb-2 text-sm text-accent">${category.label}</h3>
    <p class="mb-6 text-zinc-500">${category.blurb}</p>
    <div class="grid gap-6 ${single ? "" : "sm:grid-cols-2 lg:grid-cols-3"}"></div>
  `;
  const grid = section.querySelector("div.grid")!;

  for (const project of items) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = single ? "project-card text-left md:flex" : "project-card text-left";
    card.innerHTML = single
      ? `
      <img src="${project.images[0]}" alt="${project.title}" loading="lazy" class="aspect-video w-full object-cover md:w-3/5" />
      <div class="flex flex-col justify-center p-6 md:p-10">
        <h4 class="mb-3 text-2xl text-white md:text-3xl">${project.title}</h4>
        <p class="text-lg text-zinc-400">${project.summary}</p>
      </div>
    `
      : `
      <img src="${project.images[0]}" alt="${project.title}" loading="lazy" class="aspect-video w-full object-cover" />
      <div class="p-4">
        <h4 class="mb-1 text-lg text-white">${project.title}</h4>
        <p class="text-sm text-zinc-400">${project.summary}</p>
      </div>
    `;
    card.addEventListener("click", () => openModal(project));
    grid.appendChild(card);
  }

  root.appendChild(section);
}

// ---------- Modal & carousel ----------
const modal = document.getElementById("modal")!;
const modalClose = document.getElementById("modal-close")!;
const modalCategory = document.getElementById("modal-category")!;
const modalTitle = document.getElementById("modal-title")!;
const modalDescription = document.getElementById("modal-description")!;
const modalTech = document.getElementById("modal-tech")!;
const modalLink = document.getElementById("modal-link") as HTMLAnchorElement;
const track = document.getElementById("carousel-track")!;
const dots = document.getElementById("carousel-dots")!;

let slideCount = 0;
let slideIndex = 0;

function showSlide(index: number): void {
  slideIndex = (index + slideCount) % slideCount;
  track.style.transform = `translateX(-${slideIndex * 100}%)`;
  dots.querySelectorAll(".carousel-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === slideIndex);
  });
}

function openModal(project: Project): void {
  modalCategory.textContent = categories.find((c) => c.id === project.category)?.label ?? "";
  modalTitle.textContent = project.title;

  modalDescription.replaceChildren(
    ...project.description.map((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      return p;
    }),
  );

  modalTech.replaceChildren(
    ...project.tech.map((tech) => {
      const span = document.createElement("span");
      span.className = "border border-accent/50 px-2 py-1 text-xs text-accent";
      span.textContent = tech;
      return span;
    }),
  );

  if (project.link) {
    modalLink.href = project.link;
    modalLink.classList.remove("hidden");
  } else {
    modalLink.classList.add("hidden");
  }

  track.replaceChildren(
    ...project.images.map((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = project.title;
      img.className = "h-full w-full shrink-0 object-contain";
      return img;
    }),
  );

  slideCount = project.images.length;
  dots.replaceChildren(
    ...project.images.map((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Go to image ${i + 1}`);
      dot.addEventListener("click", () => showSlide(i));
      return dot;
    }),
  );
  showSlide(0);

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("modal-open");
}

function closeModal(): void {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("modal-open");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.getElementById("carousel-prev")!.addEventListener("click", () => showSlide(slideIndex - 1));
document.getElementById("carousel-next")!.addEventListener("click", () => showSlide(slideIndex + 1));

document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("hidden")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") showSlide(slideIndex - 1);
  if (e.key === "ArrowRight") showSlide(slideIndex + 1);
});

import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ChevronRight, Mail, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/into-the-abbys.png.asset.json";
import spriteAsset from "@/assets/sprite-animation.gif.asset.json";
import tutorialAsset from "@/assets/tutorial.png.asset.json";
import godotAsset from "@/assets/godot-development.png.asset.json";

// Sustituye este correo por el tuyo: FormSubmit enviará ahí los mensajes.
const CONTACT_EMAIL = "cpidumitras@gmail.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Into the Abbys — Desciende. Explora. Sobrevive." },
      { name: "description", content: "Un juego de plataformas indie. Explora el abismo, supera sus peligros y encuentra el Santo Grial." },
      { property: "og:title", content: "Into the Abbys" },
      { property: "og:description", content: "Desciende al abismo y encuentra el Santo Grial." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [x, setX] = useState(14);
  const [jumping, setJumping] = useState(false);
  const jumpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const move = useCallback((direction: number) => {
    setX((value) => Math.min(88, Math.max(4, value + direction * 5)));
  }, []);

  const jump = useCallback(() => {
    if (jumpTimer.current) return;
    setJumping(true);
    jumpTimer.current = setTimeout(() => {
      setJumping(false);
      jumpTimer.current = null;
    }, 520);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["a", "A", "ArrowLeft"].includes(event.key)) move(-1);
      if (["d", "D", "ArrowRight"].includes(event.key)) move(1);
      if (["w", "W", "ArrowUp", " "].includes(event.key)) {
        event.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (jumpTimer.current) clearTimeout(jumpTimer.current);
    };
  }, [jump, move]);

  return (
    <main className="bg-background text-foreground">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#inicio" className="font-display text-xl font-bold uppercase tracking-normal">Into the <span className="text-primary">Abbys</span></a>
          <div className="hidden items-center gap-7 text-xs uppercase text-muted-foreground md:flex">
            <a href="#historia" className="transition-colors hover:text-foreground">El descenso</a>
            <a href="#juega" className="transition-colors hover:text-foreground">Prueba</a>
            <a href="#desarrollo" className="transition-colors hover:text-foreground">Desarrollo</a>
            <a href="#contacto" className="transition-colors hover:text-foreground">Contacto</a>
          </div>
          <Button asChild variant="game" size="sm"><a href="#contacto"><Mail /> Contacto</a></Button>
        </div>
      </nav>

      <section id="inicio" className="relative flex min-h-[92vh] items-end overflow-hidden pt-16">
        <img src={heroAsset.url} alt="El protagonista saltando entre plataformas en el abismo" className="absolute inset-0 h-full w-full object-cover object-center pixelated" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-background/10" />
        <div className="absolute inset-0 cave-grid opacity-20" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-5 pb-14 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8 lg:pb-20">
          <div className="max-w-4xl animate-reveal">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase text-accent"><Sparkles className="size-4" /> Un plataformas indie de Mauro</p>
            <h1 className="font-display text-6xl font-bold uppercase leading-[0.82] tracking-normal sm:text-8xl lg:text-[9.5rem]">Into the<br/><span className="text-primary">Abbys</span></h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-foreground/80 sm:text-base">Baja donde la luz no llega. Supera ruinas olvidadas y reclama el Santo Grial antes de que el abismo te reclame a ti.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="game" size="lg"><a href="#historia">Descubrir el mundo <ChevronRight /></a></Button>
              <Button asChild variant="gameOutline" size="lg"><a href="#contacto"><Mail /> Contacto</a></Button>
            </div>
          </div>
          <a href="#historia" aria-label="Bajar a la historia" className="hidden size-12 items-center justify-center border border-foreground/30 text-foreground transition-colors hover:border-primary hover:text-primary lg:flex"><ArrowDown /></a>
        </div>
      </section>

      <section id="historia" className="border-y border-border bg-card py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase text-secondary">01 / El descenso</p>
            <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-none sm:text-7xl">Todo tesoro<br/>exige un precio</h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">Cada salto te lleva más lejos de la superficie. Aprende los caminos del abismo, domina sus plataformas y atraviesa la oscuridad hasta el premio final.</p>
            <div className="mt-10 grid grid-cols-3 gap-px border border-border bg-border">
              {[['Género','Plataformas'],['Misión','El Grial'],['Motor','Godot']].map(([label,value]) => <div key={label} className="bg-card p-4"><p className="text-[10px] uppercase text-muted-foreground">{label}</p><p className="mt-2 font-display text-lg font-bold text-accent">{value}</p></div>)}
            </div>
          </div>
          <figure className="relative overflow-hidden border border-border bg-background shadow-[10px_10px_0_var(--shadow-hard)]">
            <img src={tutorialAsset.url} alt="Tutorial del juego con el protagonista en una caverna" className="aspect-video w-full object-cover pixelated" />
            <figcaption className="flex items-center justify-between border-t border-border px-4 py-3 text-[10px] uppercase text-muted-foreground"><span>Primeros pasos</span><span className="text-secondary">A / D para moverte</span></figcaption>
          </figure>
        </div>
      </section>

      <section id="juega" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 cave-grid opacity-35" />
        <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="text-xs font-bold uppercase text-primary">02 / Siente el movimiento</p><h2 className="mt-3 font-display text-5xl font-bold uppercase sm:text-7xl">Prueba el salto</h2></div>
            <p className="max-w-sm text-xs leading-6 text-muted-foreground">Usa A/D o las flechas para moverte. Pulsa W, espacio o el control de salto.</p>
          </div>
          <div className="overflow-hidden border border-border bg-mist shadow-[12px_12px_0_var(--shadow-hard)]">
            <div className="relative h-[360px] sm:h-[460px]">
              <div className="absolute inset-x-0 bottom-0 h-20 bg-cave" />
              <div className="absolute inset-x-0 bottom-20 h-3 bg-secondary shadow-[0_4px_0_var(--shadow-hard)]" />
              <div className="absolute bottom-[92px] transition-[left,transform] duration-150 ease-out" style={{ left: `${x}%`, transform: jumping ? "translateY(-92px)" : "translateY(0)" }}>
                <img src={spriteAsset.url} alt="Personaje de Into the Abbys" className="h-20 w-auto pixelated sm:h-24" />
              </div>
              <div className="absolute right-[8%] bottom-20 h-24 w-2 bg-primary/70" />
              <p className="absolute right-[4%] bottom-48 font-display text-lg uppercase text-foreground/45">Meta</p>
              {x >= 80 && <p className="absolute inset-x-0 top-10 text-center font-display text-3xl font-bold uppercase text-accent">Has cruzado la grieta</p>}
            </div>
            <div className="flex items-center justify-center gap-3 border-t border-border bg-card p-4">
              <Button aria-label="Mover a la izquierda" variant="gameOutline" size="icon" onClick={() => move(-1)}><ArrowLeft /></Button>
              <Button variant="game" onClick={jump}><ArrowDown className="rotate-180" /> Saltar</Button>
              <Button aria-label="Mover a la derecha" variant="gameOutline" size="icon" onClick={() => move(1)}><ArrowRight /></Button>
            </div>
          </div>
        </div>
      </section>

      <section id="desarrollo" className="border-t border-border bg-card py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div><p className="text-xs font-bold uppercase text-secondary">03 / Tras el abismo</p><h2 className="mt-3 font-display text-5xl font-bold uppercase leading-none sm:text-7xl">Hecho nivel<br/>a nivel</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">Un proyecto independiente construido en Godot, donde cada plataforma, caída y rincón oscuro forma parte del viaje.</p></div>
            <img src={godotAsset.url} alt="Desarrollo de un nivel de Into the Abbys en Godot" className="w-full border border-border shadow-[10px_10px_0_var(--shadow-hard)]" />
          </div>
        </div>
      </section>

      <section id="contacto" className="relative overflow-hidden border-t border-border py-24">
        <div className="absolute inset-0 cave-grid opacity-30" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase text-primary">04 / Contacto</p>
            <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-none sm:text-7xl">Escribe desde<br/>la superficie</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">¿Ideas, errores encontrados o ganas de colaborar en Into the Abbys? Manda tu mensaje y llegará directo al buzón del desarrollador.</p>
          </div>
          <form
            action={`https://formsubmit.co/${CONTACT_EMAIL}`}
            method="POST"
            className="grid gap-5 border border-border bg-card p-6 shadow-[12px_12px_0_var(--shadow-hard)] sm:p-8"
          >
            <input type="hidden" name="_subject" value="Nuevo mensaje desde la web de Into the Abbys" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="grid gap-2">
              <label htmlFor="contact-name" className="text-[10px] font-bold uppercase text-muted-foreground">Nombre</label>
              <input id="contact-name" name="nombre" type="text" required maxLength={100} placeholder="Tu nombre" className="border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="contact-email" className="text-[10px] font-bold uppercase text-muted-foreground">Correo</label>
              <input id="contact-email" name="email" type="email" required maxLength={255} placeholder="tu@correo.com" className="border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="contact-message" className="text-[10px] font-bold uppercase text-muted-foreground">Mensaje</label>
              <textarea id="contact-message" name="mensaje" required maxLength={1000} rows={5} placeholder="Cuéntanos qué te trae al abismo..." className="resize-none border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary" />
            </div>
            <Button type="submit" variant="game" size="lg" className="justify-self-start"><Send /> Enviar mensaje</Button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-[10px] uppercase text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-lg font-bold text-foreground">Into the <span className="text-primary">Abbys</span></p><p>Desarrollado por Mauro · Todos los derechos reservados</p>
        </div>
      </footer>
    </main>
  );
}

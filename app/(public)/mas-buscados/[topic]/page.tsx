export const revalidate = 86400;

const PopularTopicPage = async () => (
  <section className="section-shell py-20 text-center">
    <div className="mx-auto flex max-w-2xl flex-col gap-4 rounded-2xl border border-border/60 bg-card/70 px-6 py-12 shadow-sm">
      <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground/70">
        Más buscados
      </p>
      <h1 className="text-2xl font-semibold text-foreground">
        Estamos trabajando en esta sección
      </h1>
      <p className="text-muted-foreground">
        Pronto vas a poder explorar los temas más buscados con análisis
        detallados. Mientras tanto, seguí navegando las últimas notas en la
        página principal.
      </p>
    </div>
  </section>
);

export default PopularTopicPage;

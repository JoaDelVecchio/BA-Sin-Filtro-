import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <section className="section-shell flex w-full h-full min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="flex w-full h-full flex-col gap-4 [--radius:1rem]">
        <Item variant="muted">
          <ItemMedia>
            <Spinner />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-1">
              Cargando contenido...
            </ItemTitle>
          </ItemContent>
        </Item>
      </div>
    </section>
  );
};

export default Loading;

import SectionLabel from "@/components/ui/section-label";
import { TopicQuestion } from "@/lib/types";

type TopicQuestionsProps = {
  qas: TopicQuestion[];
};

const TopicQuestions = ({ qas }: TopicQuestionsProps) => {
  if (!qas.length) return null;

  return (
    <section className="rounded-2xl border border-border/70 bg-card/80 p-6">
      <SectionLabel>Preguntas clave</SectionLabel>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {qas.map((qa) => (
          <div
            key={qa.question}
            className="rounded-2xl border border-border/70 bg-background/60 p-5"
          >
            <h3 className="text-base font-semibold text-foreground">{qa.question}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{qa.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopicQuestions;

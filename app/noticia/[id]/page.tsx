const Noticia = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <div>Noticia {id}</div>;
};

export default Noticia;

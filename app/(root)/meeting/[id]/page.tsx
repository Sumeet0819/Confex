export default async function Meeting({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);

  return (
    <div>
      Meeting Room: <p>{id}</p>
    </div>
  );
}

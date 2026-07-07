// Renders a schema.org JSON-LD block. The `<` escape prevents `</script>`
// injection if any value ever carries user-supplied text.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

/**
 * Renders schema.org data. The `<` escape prevents a value from closing the
 * script tag early, so content can never inject markup through this element.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

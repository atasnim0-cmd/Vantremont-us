import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="container-page py-24 lg:py-32">
      <p className="index-label">
        <span className="num">404</span>Page not found
      </p>
      <h1 className="display mt-6 max-w-3xl text-[2.75rem] sm:text-[3.75rem]">We could not find that page.</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed">
        The address may be mistyped, or the page may have moved. These are good places to continue.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Home page</ButtonLink>
        <ButtonLink href="/what-we-do" variant="secondary" arrow={false}>
          What we do
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary" arrow={false}>
          Contact us
        </ButtonLink>
      </div>
    </section>
  );
}

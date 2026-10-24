const faqs = [
  { q: "هل أدفع مسبقاً؟", a: "لا. تدفع نقداً للموزّع عند استلام طلبك." },
  { q: "كيف يتم تأكيد طلبي؟", a: "بعد إرسال النموذج نتصل بك على الرقم الذي أدخلته لتأكيد الطلب والمقاس والعنوان." },
  { q: "توصيل إلى المنزل أم إلى المكتب؟", a: "كلاهما متاح. تختار في النموذج وتظهر لك التكلفة قبل الإرسال." },
  { q: "ما هي مدة التوصيل؟", a: "تختلف حسب ولايتك. نخبرك بها أثناء مكالمة التأكيد." },
  { q: "لست متأكداً من مقاسي.", a: "راسلنا على واتساب مع مقاسك المعتاد وننصحك قبل أن تطلب." },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto mt-24 max-w-3xl scroll-mt-24 px-4 sm:px-6">
      <h2 className="text-3xl font-bold md:text-5xl">الأسئلة الشائعة</h2>
      <div className="mt-10 flex flex-col gap-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-card bg-md-surface shadow-sm transition-colors duration-300 open:shadow-md hover:bg-md-muted/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-card p-6 text-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-accent [&::-webkit-details-marker]:hidden">
              {f.q}
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-md-accent transition-transform duration-300 ease-md group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <p className="px-6 pb-6 leading-relaxed text-md-on-surface-variant">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

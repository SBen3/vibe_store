const steps = [
  { title: "اختر جاكيتك", text: "تصفّح المجموعة ثم اختر اللون والمقاس." },
  { title: "املأ النموذج", text: "الاسم والهاتف والولاية والعنوان. لا حاجة لإنشاء حساب." },
  { title: "ادفع عند الاستلام", text: "نتصل بك لتأكيد الطلب، وتدفع نقداً للموزّع عند وصوله." },
];

export function HowItWorks() {
  return (
    <section id="commande" className="mx-auto mt-24 max-w-6xl scroll-mt-24 px-4 sm:px-6">
      <h2 className="text-3xl font-bold md:text-5xl">اطلب في ثلاث خطوات</h2>
      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="group relative rounded-card bg-md-surface p-8 shadow-sm transition-all duration-300 ease-md hover:shadow-md">
            <div className="relative mb-6 inline-flex">
              <span aria-hidden="true" className="absolute inset-0 rounded-full bg-md-primary opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-md-primary text-lg font-bold text-md-on-primary">
                {i + 1}
              </span>
            </div>
            <h3 className="text-xl font-medium">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-md-on-surface-variant">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

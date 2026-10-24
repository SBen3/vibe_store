import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">الصفحة غير موجودة</h1>
      <p className="mt-3 text-lg text-md-on-surface-variant">ربما تم نقل المنتج أو حذفه.</p>
      <div className="mt-8">
        <Button href="/" size="lg">العودة إلى المتجر</Button>
      </div>
    </div>
  );
}

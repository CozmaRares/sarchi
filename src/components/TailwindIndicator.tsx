export default function TailwindIndicator() {
  if (import.meta.env.PROD) return null;

  return (
    <div class="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-4 font-mono text-xs text-white">
      <div class="block md:hidden">sm</div>
      <div class="hidden md:block lg:hidden">md</div>
      <div class="hidden lg:block xl:hidden">lg</div>
      <div class="hidden xl:block 2xl:hidden">xl</div>
      <div class="hidden 2xl:block">2xl</div>
    </div>
  );
}

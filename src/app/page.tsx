export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-zinc-800"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-amber-500 animate-spin"></div>
        </div>
        <div className="text-zinc-400 font-light tracking-widest text-sm animate-pulse uppercase">
          Redirecting...
        </div>
      </div>
    </div>
  );
}

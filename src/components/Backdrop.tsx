export function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-primary/[0.05] blur-3xl" />
      <div className="absolute -bottom-44 right-[-10rem] h-[32rem] w-[32rem] rounded-full bg-gold/[0.07] blur-3xl" />
      <div className="absolute bottom-[-7rem] right-4 select-none font-serif text-[32rem] font-semibold leading-none text-foreground/[0.02]">
        9
      </div>
    </div>
  )
}

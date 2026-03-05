interface HeaderProps {
  total: number;
  completed: number;
}

export function Header({ total, completed }: HeaderProps) {
  return (
    <div className="mb-14">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-5xl font-black tracking-tighter leading-none font-['Syne']">
            TASK<span className="text-[#c8f135]">.</span>
          </h1>
          <p className="font-mono text-xs text-neutral-500 tracking-widest uppercase mt-2">
            // gerenciador de tarefas
          </p>
        </div>
        <div className="flex gap-6">
          <div className="text-right">
            <div className="text-4xl font-black text-[#c8f135] leading-none font-['Syne']">{total}</div>
            <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">total</div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black text-[#c8f135] leading-none font-['Syne']">{completed}</div>
            <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">feitas</div>
          </div>
        </div>
      </div>
    </div>
  );
}

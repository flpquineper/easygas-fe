interface CardResumoProps {
  label: string;
  valor: number;
  cor: string;
}

export default function CardResumo({ label, valor, cor }: CardResumoProps) {
  return (
    <div className={`rounded-xl p-4 shadow-md ${cor} flex flex-col items-center min-w-[120px]`}>
      <span className="text-3xl font-bold">{valor}</span>
      <span className="text-sm mt-1 text-gray-700">{label}</span>
    </div>
  );
}
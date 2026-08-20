interface InstructionsSectionProps {
    instructions: string[]
}

export default function InstructionsSection({ instructions }: InstructionsSectionProps) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight text-center">
                Пошаговая инструкция
            </h2>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-recipe">
                <ol className="space-y-4">
                    {instructions.map((instruction, index) => (
                        <li key={index} className="flex gap-4 text-slate-700">
                            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-teal-500 text-white font-bold text-sm">
                                {index + 1}
                            </span>
                            <span className="text-base leading-relaxed pt-1">
                                {instruction}
                            </span>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}

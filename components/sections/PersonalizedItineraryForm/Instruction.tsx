export default function Instruction({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full max-w-3xl">
        <div className="absolute left-8 top-[-22px] z-0 h-0 w-0 border-b-[22px] border-l-[38px] border-r-[0px] border-b-white border-l-transparent border-r-transparent" />
        <div className="relative z-10 rounded-2xl bg-white px-10 py-8 shadow-xl">
          {title && (
            <h3 className="mb-4 text-center text-2xl font-bold text-gray-900">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-center text-lg text-gray-900">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FieldError({
  errors = [],
  className,
}: {
  errors: string[];
  className?: string;
}) {
  return (
    <>
      {errors.length > 0 && (
        <div className={`text-sm text-red-500 ${className}`}>
          {errors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}
    </>
  );
}

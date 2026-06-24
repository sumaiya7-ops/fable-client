export default function EmptyState({
  title,
  subtitle,
}) {
  return (
    <div className="text-center py-20">

      <h2 className="text-3xl font-bold text-indigo-100">
        {title}
      </h2>

      <p className="text-indigo-300 mt-3">
        {subtitle}
      </p>

    </div>
  );
}
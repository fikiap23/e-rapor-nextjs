import Link from "next/link";

const Breadcrumbs = ({ paths }) => {
  return (
    <nav className="text-sm" aria-label="Breadcrumbs">
      <ol className="list-none p-0 inline-flex">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-1">/</span>}
            {path.href ? (
              <Link href={path.href}>
                <span className="text-white hover:underline">{path.text}</span>
              </Link>
            ) : (
              <span className="text-gray-300">{path.text}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

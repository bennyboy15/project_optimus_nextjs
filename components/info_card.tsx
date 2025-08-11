type Props = {
  img: React.ReactNode;
  val: number;
  title: string;
};

export default function InfoCard({ img, val, title }: Props) {
  return (
    <a href="#" className="group relative block h-64 sm:h-80 lg:h-96">
      <span className="absolute inset-0 border-2 border-dashed border-black dark:border-gray-400 rounded-xl"></span>

      <div className="rounded-xl relative flex h-full transform items-end border-2 border-black bg-white dark:bg-gray-700/50 dark:border-gray-400 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
        <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
          {img}

          <h2 className="mt-4 text-xl font-medium sm:text-2xl">
            {title}
          </h2>
        </div>

        <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
          <h3 className="mt-4 text-xl font-medium sm:text-2xl">
            {title}
          </h3>

          <p className="mt-4 text-sm sm:text-base">
            {val}
          </p>

          <p className="mt-8 font-bold">Nav to</p>
        </div>
      </div>
    </a>
  );
}

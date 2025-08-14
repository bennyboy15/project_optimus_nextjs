type Props = {
    title: string,
    placeholder: string
}

export default function SearchBanner({ title, placeholder }: Props) {
    return (
        <div className="flex justify-between items-center rounded px-4 py-1 dark:bg-gray-700/50">
            <h1 className="font-semibold text-gray-800 dark:text-gray-300">{title}</h1>
            <div className="rounded w-1/3">
                <label htmlFor="Search">

                    <div className="relative">
                        <input
                            type="text"
                            id="Search"
                            className="mt-0.5 px-4 pr-10 py-1 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                            placeholder={placeholder}
                        />

                        <span className="absolute inset-y-0 right-1 grid w-8 place-content-center">
                            <button
                                type="button"
                                aria-label="Submit"
                                className="rounded-full p-1 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                            </button>
                        </span>
                    </div>
                </label>
            </div>
            <div></div>
        </div>
    )
}
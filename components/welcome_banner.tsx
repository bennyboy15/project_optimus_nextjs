type Props = {
    name: string,
    weather: string
}

export default function WelcomeBanner({ name, weather }: Props){
    return (
        <div className="flex rounded justify-between shadow p-4 dark:bg-gray-700/50 hover:border-2 border-teal-600 dark:border-teal-300">
            <div className="flex flex-col">
                <h3 className="text-gray-600 dark:text-gray-400">Good afternoon!</h3>
                <h1 className="text-gray-800 text-3xl dark:text-white">{name}</h1>
            </div>
            <div className="flex flex-col">
                {weather}
            </div>
        </div>
    )
}
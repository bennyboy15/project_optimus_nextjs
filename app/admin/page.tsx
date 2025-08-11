import InfoCard from "@/components/info_card";
import UserForm from "@/components/user_form";
import { getUsers } from "../test/actions/actions";
import ViewUsers from "@/components/display_users";

export default async function Admin() {
    const cards = [
        { 
            img: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/></svg>, 
            val: 10, 
            title: "Users", 
        },
        { 
            img: "temp", 
            val: 5, 
            title: "Admins"},
        { 
            img: "temp", 
            val: 20, 
            title: "Guests"
        },
    ];

    const users = await getUsers();

    return (
        
        <div>
            {/* Admin Cards */}
            <div className="flex w-full gap-4 px-8 mt-4">
                {cards.map((card, index) => (
                    <div className="w-1/3" key={index}>
                    <InfoCard
                        key={index}
                        img={card.img}
                        val={card.val}
                        title={card.title}
                    />
                    </div>
                ))}
            </div>

            {/* Form */}
            <div className="flex w-full gap-4 px-8 mt-4">
                <div className="flex-1">
                    <UserForm/>
                </div>
                <div className="flex-2">
                    <ViewUsers users={users}/>
                </div>
            </div>
        </div>

    )
}

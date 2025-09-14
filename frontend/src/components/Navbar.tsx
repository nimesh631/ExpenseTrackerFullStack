import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="font-bold text-2xl">Expense Tracker</h1>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
        </nav>
    )
}
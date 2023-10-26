import React from "react";
import Header from '../header/Header'
import Footer from "../footer/Footer";
import './Dashboard.css'
const Dashboard = () => {


    return (<>

        <Header />
        <main>
            <form action="">
                <input type="text" /> <button>search</button>
            </form>
        </main>
        <Footer />
    </>);
};

export default Dashboard;
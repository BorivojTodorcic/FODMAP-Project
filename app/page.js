"use client";

import { useEffect, useState } from "react";
import Navbar from "./shared_components/navbar";
import { DOMAIN_URL } from "@/config";

export default function Dashboard() {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(DOMAIN_URL + "/home")
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                setData(result);
            });
    }, []);

    return (
        <main>
            <Navbar currentRoute="/" />
            <h1>Dashboard Page</h1>
        </main>
    );
}

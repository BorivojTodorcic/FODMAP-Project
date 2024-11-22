"use client";

import Navbar from "./shared_components/navbar";
import { DOMAIN_URL } from "@/config";

export default function Dashboard() {
	return (
		<main>
			<Navbar currentRoute="/" />
			<h1>Dashboard Page</h1>
		</main>
	);
}

import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({ subsets: ["latin"] });
const robotoSlab = Roboto_Slab({
	style: "normal",
	subsets: ["latin"],
	weight: ["600", "500", "400", "300"],
	display: "swap",
});

export const metadata = {
	title: "FODMAP App",
	description: "Created by Borivoj Todorcic",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<NuqsAdapter>
				<body className={robotoSlab.className}>{children}</body>
			</NuqsAdapter>
		</html>
	);
}

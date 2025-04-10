import type { Metadata } from "next";
import { Belleza } from "next/font/google"
import "../globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import StickyCart from "@/components/shared/StickyCart";
import Provider from "../Provider";
import { AppWrapper } from "./context";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getSession } from "@/lib/getServerSession";
import { fetchUserByEmail } from "@/lib/actions/user.actions";
import FacebookPixel from "@/components/pixel/FacebookPixel";
import PageView from "@/components/pixel/PageView";
import { Store } from "@/constants/store";


const belleza = Belleza({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-belleza",
})


export const metadata: Metadata = {
  title: {
    default: Store.name,
    template: `%s - ${Store.name}`
  },
  description: "",
  twitter: {
    card: "summary_large_image"
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const email = await getSession();

  const user = await fetchUserByEmail({email});

  return (
      <html lang="uk" suppressHydrationWarning className={belleza.variable}>
        <body>
          {/* <Analytics /> */}
          <FacebookPixel />
          <Provider>
              <AppWrapper>
                <Header currentUserId={user?._id} role={user?.role}/>
                <PageView />
                <main className="overflow-x-hidden">
                    {children}
                </main>
            </AppWrapper>
          </Provider>
          <SpeedInsights/>
        </body>
      </html>
  );
}
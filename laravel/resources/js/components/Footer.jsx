import React from "react";
import { createRoot } from "react-dom/client";
import { TERipple } from "tw-elements-react";

export default function Footer() {
    return (
        <footer className="static bg-blue-zodiac-950">
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <img src="img/logo.png" alt="logo" className="mr-5 h-6 sm:h-9" />
                        <p className="max-w-xs mt-4 text-sm text-white">
                            GIVE LIFE TO YOUR IMAGINATION
                        </p>
                        <div className="flex mt-8 space-x-6 text-white">
                            <a
                                className="hover:opacity-75"
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="sr-only"> Facebook </span>
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            <a
                                className="hover:opacity-75"
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="sr-only"> Instagram </span>
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.109.724-.183 1.684-.212 2.63v.052c.029.946.103 1.906.212 2.63.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                                </svg>
                            </a>
                            <a
                                className="hover:opacity-75"
                                href="https://twitter.com/?lang=en"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="sr-only"> Twitter </span>
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a
                                className="hover:opacity-75 mt-1"
                                href="https://www.tiktok.com/explore"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="sr-only"> TikTok </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="lem"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-3 text-white">
                        <div>
                            <p className="font-medium">Company</p>
                            <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                                <a
                                    className="hover:opacity-75"
                                    href="/about-us"
                                >
                                    {" "}
                                    About{" "}
                                </a>
                                <a
                                    className="hover:opacity-75"
                                    href="/meet-the-team"
                                >
                                    {" "}
                                    Meet the Team{" "}
                                </a>
                                <a className="hover:opacity-75" href="/history">
                                    {" "}
                                    History{" "}
                                </a>
                                <a className="hover:opacity-75" href="/career">
                                    {" "}
                                    Careers{" "}
                                </a>
                            </nav>
                        </div>
                        <div>
                            <p className="font-medium">Helpful Links</p>
                            <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                                <a className="hover:opacity-75" href="/contact">
                                    {" "}
                                    Contact{" "}
                                </a>
                                <a className="hover:opacity-75" href="/faq">
                                    {" "}
                                    FAQs{" "}
                                </a>
                            </nav>
                        </div>
                        <div>
                            <p className="font-medium">Legal</p>
                            <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                                <a
                                    className="hover:opacity-75"
                                    href="/privacypolicy"
                                >
                                    {" "}
                                    Privacy Policy{" "}
                                </a>
                                <a
                                    className="hover:opacity-75"
                                    href="/termsandconditions"
                                >
                                    {" "}
                                    Terms &amp; Conditions{" "}
                                </a>
                                <a
                                    className="hover:opacity-75"
                                    href="/returnpolicy"
                                >
                                    {" "}
                                    Returns Policy{" "}
                                </a>
                                <a
                                    className="hover:opacity-75"
                                    href="/accessibility"
                                >
                                    {" "}
                                    Accessibility{" "}
                                </a>
                                <a
                                    className="hover:opacity-75"
                                    href="/conditionsofpurchase"
                                >
                                    {" "}
                                    Conditions of Purchase{" "}
                                </a>
                                <a
                                    className="hover:opacity-75"
                                    href="/legalnotice"
                                >
                                    {" "}
                                    Legal Notice{" "}
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
                <p className="mt-8 text-xs text-white">© 2024 CustomAIze</p>
            </div>
        </footer>
    );
}

if (document.getElementById("footer")) {
    createRoot(document.getElementById("footer")).render(<Footer />);
}

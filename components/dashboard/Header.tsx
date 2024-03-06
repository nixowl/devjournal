import { UserButton } from "@clerk/nextjs";

const Header = () => {
    return (
        <header className="border-b border-black/10 h-16">
            <div className="h-full w-full px-6 flex items-center justify-end"><UserButton /></div>
        </header>
    );
}

export default Header;
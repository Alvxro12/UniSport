function HamburgerMenu({ isOpen, toggleOpen }) {
const line = `h-1 w-6 my-1 rounded-full bg-white transition ease transform duration-300`;

return (
<button
    className="flex flex-col h-12 w-12 justify-center items-center sm:hidden"
    onClick={toggleOpen}
>
    <div className={`${line} ${isOpen ? "rotate-45 translate-y-3" : ""}`} />
    <div className={`${line} ${isOpen ? "opacity-0" : ""}`} />
    <div className={`${line} ${isOpen ? "-rotate-45 -translate-y-3" : ""}`} />
</button>
);
}

export default HamburgerMenu;

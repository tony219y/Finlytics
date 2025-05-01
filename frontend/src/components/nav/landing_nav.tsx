const landing_nav = () => {
  return (
    <div className="fixed flex w-full h-16 bg-black/30 items-center justify-between px-[65px] z-90 text-white backdrop-blur-md max-md:hidden">
      <h1 className="font-bold text-xl">Finlytics</h1>
      <a href="/login" className="px-6 py-1 bg-white/10 rounded-full border border-white/10 hover:bg-white/15 duration-300">
        Login
      </a>
    </div>
  );
};
export default landing_nav;

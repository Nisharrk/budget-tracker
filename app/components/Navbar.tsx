import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { auth, signIn, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-black text-4xl">
          Budget Tracker
        </Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <span className="text-black">{session?.user?.name}</span>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 text-sm rounded-xl border-2 border-dashed border-black bg-white px-5 py-2 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                >
                  Logout <FaGithub />
                </button>
              </form>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="flex items-center justify-center gap-2 text-sm rounded-xl border-2 border-dashed border-black bg-white px-5 py-2 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              >
                Login <FaGithub />
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

export const Signup = () => {
  return (
    <div className="flex h-screen justify-center items-center align-middle">
      <div className="flex flex-col gap-16 p-20 border border-gray-500 shadow-2xl rounded-2xl">
        <h1 className="text-5xl text-center">Inscription</h1>
        <form action="" className="flex flex-col gap-10">
          <div className="flex gap-10">
            <div className="flex flex-col gap-8">
              <h1 className="text-2xl">Nom d&apos;utilisateur</h1>
              <input
                type="text"
                name="username"
                placeholder="John Doe"
                className="border border-gray-300 p-4 rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-8">
              <h1 className="text-2xl">Email</h1>
              <input
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                className="border border-gray-300 p-4 rounded-xl"
              />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h1 className="text-2xl">Mots de passe</h1>
            <input
              type="password"
              name="password"
              placeholder="**********"
              className="border border-gray-300 p-4 rounded-xl"
            />
          </div>
        </form>
        <div>
          <button className="text-xl bg-green-400 p-4 rounded-xl text-white">
            S&apos;inscrire
          </button>
        </div>
      </div>
    </div>
  );
};

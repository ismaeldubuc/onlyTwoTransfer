export const Login = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col gap-16 p-40 border border-gray-500 shadow-2xl rounded-2xl">
        <h1 className="text-5xl text-center">Connexion</h1>
        <form action="" className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label className="text-2xl">Email</label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@gmail.com"
              className="border border-gray-300 p-4 rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-2xl">Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="**********"
              className="border border-gray-300 p-4 rounded-xl"
            />
          </div>
          <button className="text-xl bg-green-500 p-4 rounded-xl text-white mt-4">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

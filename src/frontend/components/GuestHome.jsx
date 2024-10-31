import { CiCirclePlus } from "react-icons/ci";
import confetti from "canvas-confetti";
import { GuestHeader } from "./GuestHeader";

export const GuestHome = () => {
  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  return (
        <div>
        <GuestHeader />
        <div className="flex mt-80 justify-center align-middle items-center">
            <label className="cursor-pointer">
            <input type="file" className="hidden" />
            <CiCirclePlus
                className="text-9xl text-gray-300 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-165"
                onMouseEnter={launchConfetti}
            />
            </label>
        </div>
        </div>
  );
};

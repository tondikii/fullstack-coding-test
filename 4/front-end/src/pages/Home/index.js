import {useNavigate} from "react-router-dom";
import ButtonRounded from "../../components/buttons/Rounded";

export default function HomePage() {
  const navigate = useNavigate();
  const data = [1, 1, 1, 1, 1, 1];
  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-32">
      <div className="flex flex-col items-center w-2/3 ">
        <div className="w-full flex flex-row-reverse">
          <div className="w-1/4">
            <ButtonRounded
              className="bg-white text-zinc-900 border-2 border-black font-bold"
              onClick={() => navigate("/create")}
            >
              Create New Structure
            </ButtonRounded>
          </div>
        </div>
        {data && data.length && Array.isArray(data) ? (
          <div className="grid grid-cols-3 gap-y-12 gap-x-8 mt-4 w-full">
            {data.map((e, idx) => (
              <div
                className="w-full h-48 bg-zinc-900 flex flex-col-reverse items-center text-white"
                key={idx}
              >
                my work {idx + e}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-md">No data.</p>
        )}
      </div>
    </div>
  );
}

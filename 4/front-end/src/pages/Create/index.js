import {useState} from "react";
import StyledInput from "../../components/inputs/Styled";

export default function CreatePage() {
  const [rows, setRows] = useState([{node: "", parent: ""}]);
  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-48">
      <div className="flex flex-row justify-between items-center w-2/3 p-8">
        <div className="flex flex-col w-2/3 p-4">
          <div className="flex flex-row">
            <div className="flex flex-col w-5/12 pr-4">
              <strong className="text-center mb-2">Node</strong>
              {rows.map((row, idx) => (
                <div key={idx} className="mb-2">
                  <StyledInput
                    name="node"
                    type="number"
                    value={row?.node}
                    onChange={(e) => {
                      const {value} = e?.target || {};
                      const tempRows = [...rows];
                      tempRows.splice(idx, 1, {...tempRows[idx], node: value});
                      setRows(tempRows);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col  w-5/12 px-4">
              <strong className="text-center mb-2">Parent</strong>
              {rows.map((row, idx) => (
                <div key={idx} className="mb-2">
                  <StyledInput
                    name="parent"
                    type="number"
                    value={row?.parent}
                    onChange={(e) => {
                      const {value} = e?.target || {};
                      const tempRows = [...rows];
                      tempRows.splice(idx, 1, {
                        ...tempRows[idx],
                        parent: value,
                      });
                      setRows(tempRows);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col w-2/12 pr-8 pl-4 pt-8">
              {rows.map((_, idx) => (
                <button
                  key={idx}
                  className="w-full rounded-lg border-input px-2 py-1 font-bold mb-2"
                  onClick={() => {
                    const tempRows = [...rows];
                    tempRows.splice(idx, 1);
                    setRows(tempRows);
                  }}
                >
                  -
                </button>
              ))}
            </div>
          </div>
          <div className="w-5/6 pr-4 mt-8">
            <button
              className="w-full rounded-lg border-input px-2 py-1 font-bold"
              onClick={() => {
                setRows([...rows, {node: "", parent: ""}]);
              }}
            >
              + Add
            </button>
          </div>
        </div>
        <div className="flex flex-col w-1/3">
          <div className="h-72 bg-zinc-900 w-full flex flex-col-reverse items-center text-white">
            unknown image
          </div>
          <button className="w-full rounded-lg bg-zinc-900 px-2 py-1 text-white font-bold mt-8">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

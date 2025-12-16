import { Chessboard } from "react-chessboard";

export function TabletLayout() {
  return (
    <div className="flex flex-col items-center h-screen gap-4 p-4">
      <div className="h-16 w-3/4 rounded-xl border" />

      <div className="w-fit h-fit">
        <Chessboard />
      </div>

      <div className="h-16 w-3/4 rounded-xl border" />
    </div>
  );
}

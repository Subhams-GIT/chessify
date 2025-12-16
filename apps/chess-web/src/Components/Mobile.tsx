import { Chessboard } from "react-chessboard";

export function MobileLayout() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-3 min-h-screen">
      <div className="h-40 w-full rounded-xl border" />

      <div className="w-[90vw] max-w-[320px] aspect-square">
        <Chessboard />
      </div>

      <div className="h-40 w-full rounded-xl border" />
    </div>
  );
}

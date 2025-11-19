export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        className="w-10 h-10 border-4 rounded-full animate-spin"
        style={{
          borderColor: "var(--gold)",
          borderTopColor: "transparent",
        }}
      ></div>
    </div>
  );
}

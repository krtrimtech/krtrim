export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30">
      <div className=" w-32 h-32 animate-spin-x [transform-style:preserve-3d]">
        <img
          src="/images/logo.png"
          alt="Loading Logo"
          className="drop-shadow-lg w-32 h-32"
        />
      </div>
      <p className="mt-4 text-muted-foreground animate-pulse">Loading your second brain...</p>
    </div>
  );
};

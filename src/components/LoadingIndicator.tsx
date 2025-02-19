const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes === 0) {
        return `${seconds} s`;
    }

    return `${minutes} m ${remainingSeconds.toString().padStart(2, '0')} s`;
};

export const LoadingIndicator = ({ loadingTime }: { loadingTime: number }) => (
    <div className="bg-zinc-800/50 rounded-lg transition-all p-2 h-9 mx-2 mb-1 animate-pulse flex justify-between">
        <span className="text-sm text-white/70">Extrayendo datos...</span>
        <span className="text-sm text-white/80">{formatTime(loadingTime)}</span>
    </div>
)
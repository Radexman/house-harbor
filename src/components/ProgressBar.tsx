function ProgressBar(
  progress: string | number | readonly string[] | undefined
) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="text-sm">Uploading To Database</p>
      <progress
        className="progress progress-primary w-56"
        value={progress}
        max="100"
      />
    </div>
  );
}

export default ProgressBar;

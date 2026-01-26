import clsx from "clsx";

const PointingLoader = () => {
  return (
    <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">
      <p className="text-sm font-medium text-slate-600">
        Shuffling story points...
      </p>
      <div className="flex items-center justify-center mt-4 gap-3">
        {["0", "1", "1", "2", "3", "5", "8", "13", "21", "34"].map(
          (label, index) => (
            <div
              key={`${label}-${index}`}
              className="relative h-16 w-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div
                className={clsx(
                  "absolute inset-0 flex items-center justify-center text-sm font-semibold text-white",
                  index % 3 === 0
                    ? "bg-indigo-500"
                    : index % 3 === 1
                      ? "bg-emerald-500"
                      : "bg-amber-500",
                  index % 2 === 0 ? "animate-bounce" : "animate-pulse",
                )}
              >
                {label}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default PointingLoader;

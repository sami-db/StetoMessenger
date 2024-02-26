const BloodMonitoring = () => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Glycémie</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-gray-700">
            Moy. mesures/jour
          </div>
          <div className="text-3xl font-bold">0</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-700">
            Nb. Hypoglycémies
          </div>
          <div className="text-3xl font-bold">0</div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-700">
            Répartition des glycémies
          </span>
        </div>
        <div className="mt-2">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium text-gray-700">
              &gt;250 mg/dL
            </span>
            <span className="text-xs font-medium text-gray-700">0%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-red-600 h-2.5 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BloodMonitoring;

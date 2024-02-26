const InsulinMonitoring = () => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Insuline</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-gray-700">
            Moy. Nb. Injections/jour
          </div>
          <div className="text-3xl font-bold">0.0</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-700">
            Moy. Insuline/jour
          </div>
          <div className="text-3xl font-bold">0.0 U</div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <span className="text-sm font-medium text-gray-700">
          Insuline lente/jour
        </span>
        <span className="text-sm font-medium text-gray-700">0%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: "0%" }}
        ></div>
      </div>
      <div className="flex justify-between mt-4">
        <span className="text-sm font-medium text-gray-700">
          Insuline rapide/jour
        </span>
        <span className="text-sm font-medium text-gray-700">0%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{ width: "0%" }}
        ></div>
      </div>
    </section>
  );
};

export default InsulinMonitoring;

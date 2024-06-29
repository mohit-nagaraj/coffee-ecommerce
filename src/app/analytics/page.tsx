import DailySalesChart from "@/components/DailySalesChart";

const Analytics: React.FC = () => {
  return (
    <div className="p-4 pt-20">
      <h1 className="font-semibold text-xl text-center mb-4">
        Sales Analytics
      </h1>
      <div className="p-4 flex flex-wrap justify-center items-center gap-4">
        <div className="border-2 border-black/30 h-fit w-full lg:w-[450px] p-4 rounded-xl flex justify-center items-center md:w-fit">
          <DailySalesChart />
        </div>
        {/* <div className="border-2 border-black/30 h-fit w-full lg:w-[450px] p-4 rounded-xl flex justify-center items-center md:w-fit">
          <DailyIncomeLineChart />
        </div>
        <div className="border-2 border-black/30 h-fit w-full lg:w-[450px] p-4 rounded-xl flex justify-center items-center md:w-fit">
          <DailyIncomeLineChart />
        </div> */}
      </div>
    </div>
  );
};

export default Analytics;

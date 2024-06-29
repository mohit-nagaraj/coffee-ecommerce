import SalesChart from "@/components/SalesChart";

const dailyLabels = [
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat",
  "Sun",
];
const dailyData = [500, 700, 200, 1000, 400, 800, 300];

const monthlyLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const monthlyData = [
  5000, 7000, 2000, 10000, 4000, 8000, 3000, 9000, 11000, 15000, 13000, 12000,
];

const yearlyLabels = ["2020", "2021", "2022", "2023"];
const yearlyData = [50000, 70000, 90000, 110000];


const Analytics: React.FC = () => {
  return (
    <div className="p-4 pt-20">
      <h1 className="font-semibold text-xl text-center mb-4">
        Sales Analytics
      </h1>
      <div className="p-4 flex flex-wrap justify-center items-center gap-4">
        <div className="border-2 border-black/30 h-fit w-full lg:w-[450px] p-4 rounded-xl flex justify-center items-center md:w-fit">
          <SalesChart
            labels={dailyLabels}
            data={dailyData}
            title="Daily Income Generated"
            color="112, 224, 0"
          />
        </div>
        <div className="border-2 border-black/30 h-fit w-full lg:w-[450px] p-4 rounded-xl flex justify-center items-center md:w-fit">
          <SalesChart
            labels={monthlyLabels}
            data={monthlyData}
            title="Monthly Income Generated"
            color="0, 166, 251"
          />
        </div>
        <div className="border-2 border-black/30 h-fit w-full lg:w-[450px] p-4 rounded-xl flex justify-center items-center md:w-fit">
          <SalesChart
            labels={yearlyLabels}
            data={yearlyData}
            title="Yearly Income Generated"
            color="255, 200, 87"
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;

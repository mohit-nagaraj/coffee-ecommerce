import { useState } from "react";
import SalesChart from "./Charts/SalesChart";
import {
  averageSpendData,
  dailySaleData,
  monthlySalesData,
  topPerformingProductsData,
  yearlySalesData,
} from "@/util/dummy";
import AverageSpendChart from "./Charts/AverageSpendChart";
import TopProductsChart from "./Charts/TopProduct";

const ChartComponent = () => {
  const [type, setType] = useState(1);
  const [time, setTime] = useState("daily");
  return (
    <div className="rounded-sm border border-stroke shadow mt-4 px-8 py-6">
      <h4 className=" text-xl font-semibold text-black ">Analysis</h4>
      <div className="flex gap-2 mt-4 justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setType(1)}
            className={`px-4 py-2 rounded-md ${
              type === 1 ? "bg-primary text-white" : "bg-white text-black"
            } border border-stroke`}
          >
            Income Generated
          </button>
          <button
            onClick={() => setType(2)}
            className={`px-4 py-2 rounded-md ${
              type === 2 ? "bg-primary text-white" : "bg-white text-black"
            } border border-stroke`}
          >
            Products Performance
          </button>
          <button
            onClick={() => setType(3)}
            className={`px-4 py-2 rounded-md ${
              type === 3 ? "bg-primary text-white" : "bg-white text-black"
            } border border-stroke`}
          >
            Average Spend
          </button>
        </div>
        <div>
          {type === 1 && (
            <div className="relative h-10 w-72 min-w-[200px]">
              <select
                defaultValue={"daily"}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select the time
              </label>
            </div>
          )}
        </div>
      </div>
      <div className="h-96 mt-4 border-t">
        {type === 1 && (
          <div className="h-96 w-full flex justify-center">
            {time == "daily" ? (
              <SalesChart
                labels={dailySaleData.labels}
                data={dailySaleData.values}
                title="Daily Income Generated"
                color="152,107,84"
              />
            ) : time == "monthly" ? (
              <SalesChart
                labels={monthlySalesData.labels}
                data={monthlySalesData.values}
                title="Monthly Income Generated"
                color="152,107,84"
              />
            ) : (
              <SalesChart
                labels={yearlySalesData.labels}
                data={yearlySalesData.values}
                title="Yearly Income Generated"
                color="152,107,84"
              />
            )}
          </div>
        )}
        {type === 2 && (
          <div className="h-96 w-full flex justify-center">
            <TopProductsChart
              labels={topPerformingProductsData.labels}
              data={topPerformingProductsData.sales}
              title="Top Performing Products"
              backgroundColor={topPerformingProductsData.backgroundColor}
              borderColor={topPerformingProductsData.borderColor}
            />
          </div>
        )}
        {type === 3 && (
          <div className="h-96 w-full flex justify-center">
            <AverageSpendChart
              labels={averageSpendData.labels}
              data={averageSpendData.spend}
              title="Average Spend per Customer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartComponent;

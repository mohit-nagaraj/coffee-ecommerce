import SalesChart from "@/components/Charts/SalesChart";
import TopProductsChart from "@/components/Charts/TopProduct";
import {
  dailySaleData,
  monthlySalesData,
  yearlySalesData,
  topPerformingProductsData,
  bottomPerformingProductsData
} from "@/util/dummy";

const Analytics: React.FC = () => {
  return (
    <div className="p-4 pt-20">
      <h1 className="font-semibold text-xl text-center">Sales Analytics</h1>
      <div className="flex flex-col gap-8">
        <div className="p-4 pt-2 flex flex-wrap justify-center items-center gap-4">
          <div className="border-2 border-black/30 h-fit w-full lg:w-[450px] p-4 rounded-xl flex justify-center items-center md:w-fit">
            <SalesChart
              labels={dailySaleData.labels}
              data={dailySaleData.values}
              title="Daily Income Generated"
              color="75, 192, 192"
            />
          </div>
          <div className="border-2 border-black/30 h-fit w-full lg:w-[450px] p-4 rounded-xl flex justify-center items-center md:w-fit">
            <SalesChart
              labels={monthlySalesData.labels}
              data={monthlySalesData.values}
              title="Monthly Income Generated"
              color="54, 162, 235"
            />
          </div>
          <div className="border-2 border-black/30 h-fit w-full lg:w-[450px] p-4 rounded-xl flex justify-center items-center md:w-fit">
            <SalesChart
              labels={yearlySalesData.labels}
              data={yearlySalesData.values}
              title="Yearly Income Generated"
              color="255, 206, 86"
            />
          </div>
        </div>
        <div className="flex flex-col w-full h-fit justify-center items-center gap-2">
          <h1 className="font-semibold text-xl text-center">
            Products Performance
          </h1>
          <div className="flex flex-wrap gap-4 w-full justify-center items-center">
            <div className="border-2 border-black/30 h-fit w-full lg:w-[450px] p-4 rounded-xl flex justify-center items-center md:w-fit">
              <TopProductsChart
                labels={topPerformingProductsData.labels}
                data={topPerformingProductsData.sales}
                title="Top Performing Products"
                backgroundColor={topPerformingProductsData.backgroundColor}
                borderColor={topPerformingProductsData.borderColor}
              />
            </div>
            <div className="border-2 border-black/30 h-fit w-full lg:w-[450px] p-4 rounded-xl flex justify-center items-center md:w-fit">
              <TopProductsChart
                labels={bottomPerformingProductsData.labels}
                data={bottomPerformingProductsData.sales}
                title="Bottom Performing Products"
                backgroundColor={bottomPerformingProductsData.backgroundColor}
                borderColor={bottomPerformingProductsData.borderColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

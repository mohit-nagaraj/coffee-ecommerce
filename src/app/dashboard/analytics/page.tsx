import AverageSpendChart from "@/components/Charts/AverageSpendChart";
import SalesChart from "@/components/Charts/SalesChart";
import TopProductsChart from "@/components/Charts/TopProduct";
import ECommerce from "@/components/Ecomerce";
import Footer from "@/components/Footer";
import {
  dailySaleData,
  monthlySalesData,
  yearlySalesData,
  topPerformingProductsData,
  bottomPerformingProductsData,
  averageSpendData,
} from "@/util/dummy";

const Analytics: React.FC = () => {
  return (
    <>
    <title>CoffeeBlend Analytics</title>
      <main className="pt-20">
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <ECommerce />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Analytics;

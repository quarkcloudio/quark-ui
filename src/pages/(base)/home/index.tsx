import CardData from './modules/CardData';
import LineChart from './modules/LineChart';
import PieChart from './modules/PieChart';

const Home = () => {
  return (
    <ASpace
      className="w-full"
      direction="vertical"
      size={[16, 16]}
    >
      <CardData />

      <ARow gutter={[16, 16]}>
        <ACol
          lg={14}
          span={24}
        >
          <LineChart />
        </ACol>
        <ACol
          lg={10}
          span={24}
        >
          <PieChart />
        </ACol>
      </ARow>
    </ASpace>
  );
};

export default Home;

import Action from '@/components/Action';
import { Line } from '@/components/Chart';
import Col from '@/components/Col';
import Container from '@/components/Container';
import Descriptions from '@/components/Descriptions';
import Divider from '@/components/Divider';
import Drawer from '@/components/Drawer';
import Dropdown from '@/components/Dropdown';
import { Form, Field } from '@/components/Form';
import Layout from '@/components/Layout';
import List from '@/components/List';
import Login from '@/components/Login';
import Menu from '@/components/Menu';
import Modal from '@/components/Modal';
import Page from '@/components/Page';
import PageContainer from '@/components/PageContainer';
import Paragraph from '@/components/Paragraph';
import Row from '@/components/Row';
import Statistic from '@/components/Statistic';
import StatisticCard from '@/components/StatisticCard';
import Table from '@/components/Table';
import Tabs from '@/components/Tabs';
import Text from '@/components/Text';
import Title from '@/components/Title';
import Typography from '@/components/Typography';
import View from '@/components/View';
import When from '@/components/When';
import { DefaultFooter } from '@ant-design/pro-components';

const fieldName =
  'textField|passwordField|textAreaField|inputNumberField|\
iconField|idField|hiddenField|checkboxField|radioField|imageField|\
fileField|switchField|selectField|treeField|cascaderField|\
dateField|weekField|monthField|quarterField|yearField|datetimeField|\
dateRangeField|datetimeRangeField|timeField|timeRangeField|displayField|\
editorField|searchField|mapField|geofenceField|listField|groupField|selects|\
treeSelectField|spaceField|compactField|fieldsetField|dependencyField|';

const components = [
  { name: 'page', component: <Page /> },
  { name: 'login', component: <Login /> },
  { name: 'layout', component: <Layout /> },
  { name: 'pageContainer', component: <PageContainer /> },
  { name: 'row', component: <Row /> },
  { name: 'col', component: <Col /> },
  { name: 'container', component: <Container /> },
  { name: 'statistic', component: <Statistic /> },
  { name: 'descriptions', component: <Descriptions /> },
  { name: 'divider', component: <Divider /> },
  { name: 'typography', component: <Typography /> },
  { name: 'paragraph', component: <Paragraph /> },
  { name: 'title', component: <Title /> },
  { name: 'text', component: <Text /> },
  { name: 'action', component: <Action /> },
  { name: 'drawer', component: <Drawer /> },
  { name: 'modal', component: <Modal /> },
  { name: 'line', component: <Line /> },
  { name: 'footer', component: <DefaultFooter /> },
  { name: 'dropdown', component: <Dropdown /> },
  { name: 'form', component: <Form /> },
  { name: 'list', component: <List /> },
  { name: 'menu', component: <Menu /> },
  { name: 'statisticCard', component: <StatisticCard /> },
  { name: 'table', component: <Table /> },
  { name: 'tabs', component: <Tabs /> },
  { name: 'view', component: <View /> },
  { name: 'when', component: <When /> },
  { name: fieldName, component: <Field /> },
];

export default components;

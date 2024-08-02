import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Button, Table, Select } from 'antd';
import MakeNewClient from './MakeNewClient';
import { ClientData } from '../types';

const { Header, Content, Footer, Sider } = Layout;

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Data',
    dataIndex: 'data',
    key: 'data',
  },
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
];

interface MainPageProps {
  Username: string;
  setLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainPage: React.FC<MainPageProps> = ({ Username, setLogout }) => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [showClients, setShowClients] = useState<boolean>(false);
  const [makeClient, setMakeClient] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('id');
  const [desc, setDesc] = useState<string>('asc');

  const fetchData = () => {
    fetch(`https://66a3f9b844aa637045830af6.mockapi.io/clients?sortBy=${sort}&order=${desc}`)
      .then((res) => res.json())
      .then((data) => {
        const transformedData: ClientData[] = data.map((client: ClientData) => ({
          id: client.id,
          name: client.name,
          data: client.data,
          number: client.number,
          country: client.country,
        }));
        setClients(transformedData);
      })
      .catch((error) => console.error('Error fetching clients:', error));
  };

  useEffect(() => {
    if (showClients) fetchData();
  }, [showClients, sort, desc]);

  const handleSort = (value: string) => {
    if (value === 'id' || value === 'data') {
      setDesc('desc');
    } else {
      setDesc('asc');
    }
    setSort(value);
  };

  return (
    <Layout hasSider>
      <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}>
        <div className="demo-logo-vertical" />
        <Button
          type="primary"
          icon={<UserOutlined />}
          onClick={() => { setShowClients(!showClients); setMakeClient(false); }}
          style={{ width: '100%', display: 'block', textAlign: 'center',  borderRadius:'0 0 0 0' , height:'64px', fontSize:'16px'}} // добавленные стили
        >
          Клиенты
        </Button>
      </Sider>

      <Layout style={{ marginLeft: 200 }}>
        <Header
          style={{
            padding: '0 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#704214',
            color: '#fff',
          }}
        >
          <h2 style={{ margin: 0, color: '#fff' }}>Welcome, {Username}!</h2>
          <Button type="primary" onClick={() => setLogout(false)}>
            Logout
          </Button>
        </Header>

        {showClients ? (
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, padding: '0 16px' }}>
              <Select
                defaultValue="Сортировать по"
                style={{ width: 120 }}
                onChange={handleSort}
                options={[
                  { value: 'name', label: 'Имени' },
                  { value: 'id', label: 'Номеру добавления' },
                  { value: 'data', label: 'Дате' },
                  { value: 'country', label: 'Странам'}
                ]}
              />
              <Button type="primary" onClick={() => setMakeClient(!makeClient)}>Создать клиента</Button>
            </div>
            {makeClient && <MakeNewClient newClientId={clients.length + 1} CloseForm={setMakeClient} fetchData={fetchData} />}

            <div style={{ padding: 24, textAlign: 'center' }}>
              <Table dataSource={clients} columns={columns} rowKey="id" />
            </div>
          </Content>
        ) : (
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <h1>Welcome to the main page!</h1>
          </Content>
        )}

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainPage;

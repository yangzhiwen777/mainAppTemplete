import { Person } from '@/interface';
import { Button, Space } from 'antd';

export const person: Person = {
  name: '老王',
  age: 66,
  address: '123',
  key: '1',
};

export const tabelColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '联系电话',
    dataIndex: 'tel',
    key: 'tel',
  },
  {
    title: '紧急联系人',
    dataIndex: 'parent',
    key: 'parent',
  },
  {
    title: '操作',
    dataIndex: 'options',
    key: 'options',
    render: (_: any, records: Person) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <a>查看</a>
          <a>编辑</a>
          <a>删除</a>
        </div>
      );
    },
  },
];

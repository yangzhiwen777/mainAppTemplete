import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

import { Person } from '@/interface/index' 

export interface IndexModelState {
  name: string;
  age: number;
  tabelList: Person[];
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
//   subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
    namespace: 'index',

    state: {
        name: '',
        age: 18,
        tabelList: [
          {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '3',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '4',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '5',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '6',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '7',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '8',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '9',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '10',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '11',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '12',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '13',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '14',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '15',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '16',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '17',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
          {
            key: '18',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
        ],
    },

    effects: {
        *query({ payload }, { call, put }) { },
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        // 启用 immer 之后
        // save(state, action) {
        //   state.name = action.payload;
        // },
    },
    // subscriptions: {
    //     setup: function (api: SubscriptionAPI, done: Function): void | Function {
    //         throw new Error('Function not implemented.');
    //     }
    // }
};

export default IndexModel;

import React, { useState, useEffect } from 'react';
import {
  Graph,
  ObjectExt,
  Shape,
  Cell,
  Model,
  Edge,
  Addon,
  Dom,
} from '@antv/x6';
const { innerHeight, innerWidth } = window;
import { Button, Input, Menu } from 'antd';
import type { MenuProps, MenuTheme } from 'antd';

const { Dnd } = Addon;
Graph.registerNode('my-react', {
  inherit: 'rect', // 继承自 Shape.Rect
  width: 300, // 默认宽度
  height: 40, // 默认高度
  attrs: {
    body: {
      rx: 10, // 圆角矩形
      ry: 10,
      strokeWidth: 1,
      fill: '#5755a1',
      stroke: '#5755a1',
    },
    label: {
      fill: '#fff',
      fontSize: 18,
      refX: 10, // x 轴偏移，类似 css 中的 margin-left
      textAnchor: 'left', // 左对齐
    },
  },
  ports: {
    groups: {
      // 输入链接桩群组定义
      in: {
        position: 'top',
        attrs: {
          circle: {
            r: 6,
            magnet: true,
            stroke: '#31d0c6',
            strokeWidth: 2,
            fill: '#fff',
          },
        },
      },
      // 输出链接桩群组定义
      out: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 6,
            magnet: true,
            stroke: '#31d0c6',
            strokeWidth: 2,
            fill: '#fff',
          },
        },
      },
    },
    items: [
      {
        id: 'port1',
        group: 'in',
      },
      {
        id: 'port2',
        group: 'in',
      },
      {
        id: 'port3',
        group: 'in',
      },
      {
        id: 'port4',
        group: 'out',
      },
      {
        id: 'port5',
        group: 'out',
      },
    ],
  },
});

// 拖拽矩形
Graph.registerNode('top-rect', {
  inherit: 'rect', // 继承自 Shape.Rect
  width: 150, // 默认宽度
  height: 40, // 默认高度
  attrs: {
    body: {
      rx: 10, // 圆角矩形
      ry: 10,
      strokeWidth: 2,
      fill: '#987765',
      stroke: '#5755a1',
    },
    label: {
      fill: '#fff',
      fontSize: 14,
      // refX: 10, // x 轴偏移，类似 css 中的 margin-left
      // textAnchor: 'left', // 左对齐
    },
  },
  ports: {
    groups: {
      // 输出链接桩群组定义
      out: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#31d',
            strokeWidth: 3,
            fill: '#fff',
          },
        },
      },
    },
    items: [
      {
        id: 'port5',
        group: 'out',
      },
    ],
  },
});

// 拖拽矩形
Graph.registerNode('drag-rect', {
  inherit: 'rect', // 继承自 Shape.Rect
  width: 150, // 默认宽度
  height: 40, // 默认高度
  attrs: {
    body: {
      rx: 10, // 圆角矩形
      ry: 10,
      strokeWidth: 2,
      fill: '#987765',
      stroke: '#5755a1',
    },
    label: {
      fill: '#fff',
      fontSize: 14,
      // refX: 10, // x 轴偏移，类似 css 中的 margin-left
      // textAnchor: 'left', // 左对齐
    },
  },
  ports: {
    groups: {
      // 输入链接桩群组定义
      in: {
        position: 'top',
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#31d0c6',
            strokeWidth: 3,
            fill: '#fff',
          },
        },
      },
      // 输出链接桩群组定义
      out: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#31d',
            strokeWidth: 3,
            fill: '#fff',
          },
        },
      },
    },
    // items: [
    //   {
    //     id: 'port1',
    //     group: 'in',
    //   },
    //   {
    //     id: 'port5',
    //     group: 'out',
    //   },
    // ],
  },
});

Graph.registerEdge(
  'dag-edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#abcdef',
        strokeWidth: 3,
        //   targetMarker: null,
        sourceMarker: {
          name: 'ellipse', // 椭圆
          rx: 3, // 椭圆箭头的 x 半径
          ry: 3, // 椭圆箭头的 y 半径
        },
        targetMarker: {
          // name: 'ellipse', // 椭圆
          // rx: 4, // 椭圆箭头的 x 半径
          // ry: 4, // 椭圆箭头的 y 半径
        },
      },
    },
  },
  true,
);

import {
  CheckOutlined,
  FormOutlined,
  EditOutlined,
  ScissorOutlined,
  RedoOutlined,
  RiseOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styles from './index.less';

const { Search } = Input;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('原目标', 'sub1', <MailOutlined />, [
    getItem('数据源', '1'),
    getItem('我的数据', '2'),
  ]),

  getItem('数据处理', 'sub2', <AppstoreOutlined />, [
    getItem('数据加工', '5'),
    getItem('数据滤重', '6'),
    getItem('数据过滤', '7'),
    getItem('数据关联', '8'),
    getItem('数据分组', '9'),
    getItem('数据排序', '10'),
    getItem('查询界限', '11'),
    getItem('数据联合', '12'),
    // getItem('Submenu', 'sub3', null, [
    //   getItem('Option 7', '7'),
    //   getItem('Option 8', '8'),
    // ]),
  ]),

  getItem('数据可视化', 'sub4', <SettingOutlined />, [
    getItem('列表', '13'),
    getItem('图形', '14'),
    // getItem('Option 11', '11'),
    // getItem('Option 12', '12'),
  ]),
];

const X6Test = () => {
  const [selectCell, setSelectCell] = useState({});
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const [current, setCurrent] = useState('1');
  const [currentCell, setCurrentCell] = useState();

  const [graphIncetance, setGraphIncetance] = useState<Graph>({} as Graph);
  const [dropDnd, setDropDnd] = useState<any>();

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  // 左侧菜单 切换选项栏
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  // 开始拖拽
  const startDrag = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rectData: any,
    type?: any,
  ) => {
    // console.log(e);

    // console.log(rectData);

    const target = e.currentTarget;
    const node = graphIncetance.createNode({
      x: 150,
      y: 60,
      // shape: type ? 'top-rect' : 'drag-rect',
      shape: 'drag-rect',
      label: rectData, // label 继承于基类的自定义选项
      ports: type
        ? [
            {
              id: 'port1',
              group: 'out',
            },
          ]
        : [
            {
              id: 'port1',
              group: 'in',
            },
            {
              id: 'port2',
              group: 'in',
            },
            {
              id: 'port3',
              group: 'out',
            },
            {
              id: 'port4',
              group: 'out',
            },
          ],
    });

    dropDnd.start(node, e.nativeEvent as any);
  };

  // 删除节点
  const deleteCell = () => {
    console.log(selectCell);
    selectCell.cell.remove();
  };

  // 撤销
  const undoHandle = () => {
    graphIncetance.undo();
  };

  // 返回
  const redoHandle = () => {
    graphIncetance.redo();
  };

  useEffect(() => {
    const graph = new Graph({
      container: document.getElementById('graphContainer') as HTMLElement,

      background: {
        color: '#fffbe6', // 设置画布背景颜色
      },

      grid: {
        size: 5, // 网格大小 10px
        visible: true, // 渲染网格背景
      },

      // 支持拖拽平移
      panning: {
        enabled: true,
        // modifiers: 'shift',  // 设置修饰键后需要按下修饰键并点击鼠标才能触发画布拖拽。
        /**
         *  graph.isPannable() // 画布是否可以平移
            graph.enablePanning() // 启用画布平移
            graph.disablePanning() // 禁止画布平移
            graph.togglePanning() // 切换画布平移状态
         */
      },

      // 配置 滚轮缩放
      //   mousewheel: {
      //     enabled: true,
      //     // modifiers: ['ctrl', 'meta'],
      //     guard(this: Graph, e: WheelEvent) {
      //       console.log(this);
      //       console.log(e);
      //       return true;
      //       // if (e.altKey) {
      //       //   // 当按下 alt 键时，忽略所有滚动事件
      //       //   return false;
      //       // }
      //       // return true;
      //     },
      //   },

      // 允许 链接到空白处
      connecting: {
        allowBlank: false,
        snap: true, // 自动吸附
        // allowMulti: 'withPort',
        // allowLoop: false,
        // highlight: true,
        allowNode: false,
        highlight: true,
        router: 'orth',
        connector: 'smooth',
        createEdge() {
          return graph.createEdge({
            shape: 'dag-edge',
            attrs: {
              line: {
                // strokeDasharray: '5 5',
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8,
                },
              },
            },
            // zIndex: 100,
          });
        },
      },

      // 拖拽 做成父子节点
      // embedding: {
      //   enabled: true,
      //   findParent({ node }) {
      //     // 当前节点信息
      //     // console.log(node);

      //     // 当前节点 大小及位置
      //     const bbox = node.getBBox();

      //     // 当前画布的所有节点
      //     // console.log(this.getNodes());

      //     return this.getNodes().filter((node) => {
      //       // 只有 data.parent 为 true 的节点才是父节点
      //       const data = node.getData<any>();
      //       // console.log(data);

      //       if (data && data.parent) {
      //         // // 父节点 大小及位置
      //         const targetBBox = node.getBBox();
      //         // console.log(targetBBox);

      //         return bbox.isIntersectWithRect(targetBBox);
      //       }
      //       return false;
      //     });
      //   },
      // },

      // 点击框选节点
      selecting: {
        enabled: true,
        multiple: true, // 支持多选
        // rubberband: true, // 启用框选
        showNodeSelectionBox: true, // 是否显示节点的选择框
        showEdgeSelectionBox: true,
      },

      // 子节点 在父节点内 拖拽不超过范围
      //   translating: {
      //     restrict(view) {
      //       console.log(view);

      //       const cell = view.cell;
      //       if (cell.isNode()) {
      //         console.log('进来了');

      //         const parent = cell.getParent();
      //         console.log(parent);

      //         if (parent) {
      //           return parent.getBBox();
      //         }
      //       }

      //       return null;
      //     },
      //   },

      // 剪切板
      clipboard: {
        enabled: true,
        useLocalStorage: true, // 持久化
      },

      // 撤销重做
      history: {
        enabled: true,
        beforeAddCommand(event: any, args: any) {
          console.log('beforeAddCommand');

          // console.log(event);
          // console.log(args);

          if (args.options) {
            // return args.options.ignore !== false
          }
        },
        afterAddCommand(event: any, args: any) {
          console.log('afterAddCommand');

          console.log(event);
          console.log(args);

          if (args.options) {
            // return args.options.ignore !== false
          }
        },
        executeCommand(this, cmd, revert: boolean, options) {
          console.log(
            '当命令被撤销或重做时被调用，revert 为 true 表示命令被撤销，否则表示命令被重做。          ',
          );

          console.log(this);
          console.log(cmd);
          console.log(revert);
          console.log(options);
        },
      },

      // 对齐线
      snapline: {
        enabled: true,
        sharp: true,
      },

      // // 滚动
      // scroller: {
      //   enabled: true,
      // },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },

      // 小地图
      // minimap: {
      //   enabled: true,
      //   container: document.getElementById('mini') as any,
      // },
    });

    const dnd = new Dnd({
      target: graph,
      scaled: false,
      animation: true,
      //   validateNode(droppingNode, options) {
      //     return droppingNode.shape === 'html'
      //       ? new Promise<boolean>((resolve) => {
      //           const { draggingNode, draggingGraph } = options;
      //           const view = draggingGraph.findView(draggingNode)!;
      //           const contentElem = view.findOne('foreignObject > body > div');
      //           Dom.addClass(contentElem, 'validating');
      //           setTimeout(() => {
      //             Dom.removeClass(contentElem, 'validating');
      //             resolve(true);
      //           }, 3000);
      //         })
      //       : true;
      //   },
    });

    // 选中节点或边触发的函数
    graph.on(
      'node:selected',
      (args: { cell: Cell; options: Model.SetOptions }) => {
        console.log(args);
        setSelectCell(args);
        setCurrentCell(args);
      },
    );

    // 节点添加
    graph.on(
      'node:added',
      (args: {
        cell: Cell;
        key: string; // 通过 key 来确定改变项
        current: any; // 当前值，类型根据 key 指代的类型确定
        previous: any; // 改变之前的值，类型根据 key 指代的类型确定
        options: any; // 透传的 options
      }) => {
        setCurrentCell(args);
      },
    );

    // 节点链接
    graph.on('edge:connected', ({ isNew, edge }) => {
      if (isNew) {
        // 对新创建的边进行插入数据库等持久化操作

        const source = edge.getSourceCell();
        const targe = edge.getTargetCell();
        console.log(source);
        console.log(edge);
        console.log(targe);
      }
    });

    setGraphIncetance(graph);
    setDropDnd(dnd);
  }, []);

  return (
    <div className={styles.x6Container}>
      {/* 标题 */}
      <div className={styles.header}>
        <h1>大标题</h1>
      </div>

      {/* 图区域 */}
      <div className={styles.graphContainer}>
        {/* 图顶部操作区 */}
        <div className={styles.graphHandle}>
          {[
            { icon: <CheckOutlined onClick={deleteCell} />, label: '删除' },
            { icon: <FormOutlined onClick={undoHandle} />, label: '撤销' },
            { icon: <EditOutlined onClick={redoHandle} />, label: '返回' },
            { icon: <ScissorOutlined onClick={deleteCell} />, label: '输出' },
            // <FormOutlined />,
            // <FormOutlined />,
            // <EditOutlined />,
            // <ScissorOutlined />,
            // <RedoOutlined />,
            // <RiseOutlined />,
          ].map((item, index) => {
            return (
              <div key={index}>
                {item.icon}
                {item.label}
              </div>
            );
          })}
        </div>

        {/* 图主体区 */}
        <div className={styles.mainContainer}>
          <div className={styles.left}>
            <div className={styles.leftSearch}>
              <Search placeholder="input search text" />
            </div>
            <div>
              <Menu
                onClick={onClick}
                defaultSelectedKeys={['yuanmubioashujuyuan']}
                defaultOpenKeys={['yuanmubioa']}
                mode="inline"
              >
                {/* 数据源 */}
                <Menu.SubMenu
                  key="yuanmubioa"
                  title="（原）目标"
                  icon={<SettingOutlined />}
                >
                  <Menu.Item
                    key="yuanmubioashujuyuan"
                    icon={<AppstoreOutlined />}
                    onMouseDown={(e) => {
                      startDrag(e, '数据源', 'top-rect');
                    }}
                  >
                    数据源
                  </Menu.Item>
                  <Menu.Item
                    datatype="123"
                    key="yuanmubioamydata"
                    onMouseDown={(e) => {
                      startDrag(e, '我的数据');
                    }}
                    icon={<AppstoreOutlined />}
                  >
                    我的数据
                  </Menu.Item>
                </Menu.SubMenu>

                {/* 数据处理 */}
                <Menu.SubMenu
                  key="shujuchuli"
                  title="数据处理"
                  icon={<SettingOutlined />}
                >
                  <Menu.Item
                    key="shujujiagong"
                    icon={<AppstoreOutlined />}
                    onMouseDown={(e) => {
                      startDrag(e, '数据加工');
                    }}
                  >
                    数据加工
                  </Menu.Item>
                  <Menu.Item
                    key="shujulvchong"
                    icon={<AppstoreOutlined />}
                    onMouseDown={(e) => {
                      startDrag(e, '数据滤重');
                    }}
                  >
                    数据滤重
                  </Menu.Item>
                  <Menu.Item
                    key="shujuguolv"
                    icon={<AppstoreOutlined />}
                    onMouseDown={(e) => {
                      startDrag(e, '数据过滤');
                    }}
                  >
                    数据过滤
                  </Menu.Item>
                  <Menu.Item
                    key="shujuguanlian"
                    icon={<AppstoreOutlined />}
                    onMouseDown={(e) => {
                      startDrag(e, '数据关联');
                    }}
                  >
                    数据关联
                  </Menu.Item>
                  <Menu.Item
                    key="shujufenzu"
                    icon={<AppstoreOutlined />}
                    onMouseDown={(e) => {
                      startDrag(e, '数据分组');
                    }}
                  >
                    数据分组
                  </Menu.Item>
                  <Menu.Item
                    key="shujupaixu"
                    icon={<AppstoreOutlined />}
                    onMouseDown={(e) => {
                      startDrag(e, '数据排序');
                    }}
                  >
                    数据排序
                  </Menu.Item>

                  <Menu.Item
                    key="chaxunjiexian"
                    icon={<AppstoreOutlined />}
                    onMouseDown={(e) => {
                      startDrag(e, '查询界限');
                    }}
                  >
                    查询界限
                  </Menu.Item>
                  <Menu.Item
                    key="shujulianhe"
                    icon={<AppstoreOutlined />}
                    onMouseDown={(e) => {
                      startDrag(e, '数据联合');
                    }}
                  >
                    数据联合
                  </Menu.Item>
                </Menu.SubMenu>

                {/* 数据展示方式 */}
                <Menu.SubMenu
                  key="keshihua"
                  title="数据可视化"
                  icon={<SettingOutlined />}
                >
                  <Menu.Item
                    key="keshihualiebiao"
                    icon={<AppstoreOutlined />}
                    onMouseDown={(e) => {
                      startDrag(e, '列表');
                    }}
                  >
                    列表
                  </Menu.Item>
                  <Menu.Item
                    key="keshihuatubiao"
                    onMouseDown={(e) => {
                      startDrag(e, '图表');
                    }}
                    icon={<AppstoreOutlined />}
                  >
                    图表
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
          </div>
          <div className={styles.center} id="graphContainer"></div>
          <div className={styles.right}>
            <h1>
              {currentCell && currentCell.cell.store.data.attrs.text.text}
            </h1>
          </div>
        </div>

        {/* 图底部 */}
        <div className={styles.graphFooter}>图底部</div>
      </div>
    </div>
  );
};
export default X6Test;

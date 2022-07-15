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
import { Button } from 'antd';

const { Dnd } = Addon;

const X6 = () => {
  Graph.registerEdge(
    'dag-edge',
    {
      inherit: 'edge',
      attrs: {
        line: {
          stroke: 'green',
          strokeWidth: 3,
          targetMarker: null,
        },
      },
    },
    true,
  );
  // 选中的节点
  const [selectedNode, setSelectData] = useState<Cell>({} as Cell);

  // 图实例
  // container: document.getElementById('container') as HTMLElement,
  const [graphIncetance, setGraphIncetance] = useState<Graph>({} as Graph);
  const [dropDnd, setDropDnd] = useState();
  const [data, setData] = useState({
    // 节点
    nodes: [
      {
        id: 'node1', // String，可选，节点的唯一标识
        x: 40, // Number，必选，节点位置的 x 值
        y: 40, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: 'hello', // String，节点标签
        attrs: {
          body: {
            fill: '#999999',
            stroke: '#000',
            // strokeDasharray: '10,2',
            rx: 10, // 圆角
          },
          label: {
            text: 'Hello',
            fill: '#333',
            fontSize: 13,
          },
        },
      },
      {
        id: 'node2', // String，节点的唯一标识
        shape: 'ellipse', // 使用 ellipse 渲染

        x: 160, // Number，必选，节点位置的 x 值
        y: 180, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: 'world', // String，节点标签
      },
    ],
    // 边
    edges: [
      {
        source: 'node1', // String，必须，起始节点 id
        target: 'node2', // String，必须，目标节点 id
        attrs: {
          line: {
            stroke: 'orange',
          },
        },
      },
    ],
  });

  // 复制节点
  const copyNode = () => {
    // console.log(graphIncetance);
    // console.log(selectedNode);
    const copyData = graphIncetance.copy([selectedNode], {
      deep: true,
      useLocalStorage: true,
    });
    console.log(copyData);
  };

  // 粘贴节点
  const pasteNode = () => {
    graphIncetance.paste();
  };

  // 剪切节点
  const cutNode = () => {
    graphIncetance.cut([selectedNode], { deep: true, useLocalStorage: true });
  };

  // 获取剪切板中的节点或边
  const getCutNode = () => {
    const data = graphIncetance.getCellsInClipboard();
    console.log(data);
  };

  // 撤销
  const preHandle = () => {
    graphIncetance.undo();
  };

  // 重置
  const reSetHandle = () => {
    graphIncetance.redo();
  };

  // 开始拖拽
  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e);

    const target = e.currentTarget;
    console.log(target);

    const type = target.getAttribute('data-type');
    const node =
      type === 'rect'
        ? graphIncetance.createNode({
            width: 100,
            height: 40,
            attrs: {
              label: {
                text: 'Rect',
                fill: '#6a6c8a',
              },
              body: {
                stroke: '#31d0c6',
                strokeWidth: 2,
              },
            },
          })
        : graphIncetance.createNode({
            width: 60,
            height: 60,
            shape: 'html',
            html: () => {
              const wrap = document.createElement('div');
              wrap.style.width = '100%';
              wrap.style.height = '100%';
              wrap.style.display = 'flex';
              wrap.style.alignItems = 'center';
              wrap.style.justifyContent = 'center';
              wrap.style.border = '2px solid rgb(49, 208, 198)';
              wrap.style.background = '#fff';
              wrap.style.borderRadius = '100%';
              wrap.innerText = 'Circle';
              return wrap;
            },
          });
    console.log(node);
    console.log(e.nativeEvent);

    dropDnd.start(node, e.nativeEvent as any);
  };

  // 导出
  const outJSON = () => {
    const data = graphIncetance.toJSON();
    console.log(data);
    graphIncetance.clearCells();
    setTimeout(() => {
      graphIncetance.fromJSON(data);
    }, 3000);
  };

  useEffect(() => {
    const graph = new Graph({
      container: document.getElementById('container') as HTMLElement,
      width: 1000,
      height: 800,

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
      mousewheel: {
        enabled: true,
        // modifiers: ['ctrl', 'meta'],
        guard(this: Graph, e: WheelEvent) {
          console.log(this);
          console.log(e);
          return true;
          // if (e.altKey) {
          //   // 当按下 alt 键时，忽略所有滚动事件
          //   return false;
          // }
          // return true;
        },
      },

      // 允许 链接到空白处
      connecting: {
        allowBlank: true,
        snap: true, // 自动吸附
        allowMulti: 'withPort',
        allowLoop: false,
        highlight: true,
        router: 'orth',
        connector: 'smooth',
        createEdge() {
          return graph.createEdge({
            shape: 'dag-edge',
            attrs: {
              line: {
                // strokeDasharray: '5 5',
              },
            },
            zIndex: 100,
          });
        },
      },

      // 拖拽 做成父子节点
      embedding: {
        enabled: true,
        findParent({ node }) {
          // 当前节点信息
          // console.log(node);

          // 当前节点 大小及位置
          const bbox = node.getBBox();

          // 当前画布的所有节点
          // console.log(this.getNodes());

          return this.getNodes().filter((node) => {
            // 只有 data.parent 为 true 的节点才是父节点
            const data = node.getData<any>();
            // console.log(data);

            if (data && data.parent) {
              // // 父节点 大小及位置
              const targetBBox = node.getBBox();
              // console.log(targetBBox);

              return bbox.isIntersectWithRect(targetBBox);
            }
            return false;
          });
        },
      },

      // 点击框选节点
      selecting: {
        enabled: true,
        multiple: true, // 支持多选
        // rubberband: true, // 启用框选
        showNodeSelectionBox: true, // 是否显示节点的选择框
        showEdgeSelectionBox: true,
      },

      // 子节点 在父节点内 拖拽不超过范围
      translating: {
        restrict(view) {
          console.log(view);

          const cell = view.cell;
          if (cell.isNode()) {
            console.log('进来了');

            const parent = cell.getParent();
            console.log(parent);

            if (parent) {
              return parent.getBBox();
            }
          }

          return null;
        },
      },

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
      getDragNode: (node) => node.clone({ keepId: true }),
      getDropNode: (node) => node.clone({ keepId: true }),
      validateNode(droppingNode, options) {
        console.log('woyaodiaoyog');
        console.log(droppingNode);
        console.log(options);

        return droppingNode.shape === 'html'
          ? new Promise<boolean>((resolve) => {
              const { draggingNode, draggingGraph } = options;
              const view = draggingGraph.findView(draggingNode)!;
              const contentElem = view.findOne('foreignObject > body > div');
              Dom.addClass(contentElem, 'validating');
              setTimeout(() => {
                Dom.removeClass(contentElem, 'validating');
                resolve(true);
              }, 3000);
            })
          : true;
      },
    });
    setDropDnd(dnd as any);
    // const dnd = new Addon.Dnd({ target: graph });

    // ============================================================================================================================================
    // ============================================================================================================================================

    // 图的监听事件
    // graph.on(
    //   'cell:selected',
    //   (args: { cell: Cell; options: Model.SetOptions }) => {
    //     console.log(args);

    //     // code here
    //   },
    // );

    // 添加一个节点的监听事件
    graph.on('node:added', ({ node }) => {
      const { x, y } = node.position();
      console.log('node:added', x, y);
    });

    // 节点被选中时触发。
    graph.on(
      'node:selected',
      (args: { cell: Cell; node: Node; options: Model.SetOptions }) => {
        console.log('节点被选中时触发', args);
        setSelectData(args.cell);
        // code here
      },
    );

    // 边被选中时触发。

    graph.on(
      'edge:selected',
      (args: { cell: Cell; edge: Edge; options: Model.SetOptions }) => {
        // code here
        console.log('边被选中时触发', args);
      },
    );

    // 节点被取消选中时触发。
    graph.on(
      'node:unselected',
      (args: { cell: Cell; node: Node; options: Model.SetOptions }) => {
        // code here
        console.log('节点被取消选中时触发。', args);
      },
    );

    //  边被取消选中时触发。
    graph.on(
      'edge:unselected',
      (args: { cell: Cell; edge: Edge; options: Model.SetOptions }) => {
        // code here
        console.log('边被取消选中时触发。', args);
      },
    );

    // 选中的节点/边发生改变(增删)时触发。
    graph.on(
      'selection:changed',
      (args: {
        added: Cell[]; // 新增被选中的节点/边
        removed: Cell[]; // 被取消选中的节点/边
        selected: Cell[]; // 被选中的节点/边
        options: Model.SetOptions;
      }) => {
        // code here
        console.log('选中的节点/边发生改变(增删)时触发。', args);
      },
    );

    // TODO:事件系统
    // ================================================================================================================================
    // ================================================================================================================================
    graph.on('node:click', ({ e, x, y, node, view }) => {
      console.log(e, x, y, node, view);
      view.cell.remove();
    });

    graph.on('edge:click', ({ e, x, y, node, view }) => {
      console.log(e, x, y, node, view);
      view.cell.remove();
    });

    // 边链接
    graph.on('edge:connected', (args) => {
      console.log('edge:connected', '边链接');

      console.log(args);

      if (args.isNew) {
        const source = edge.getSourceCell()
        console.log(source);
        
      }
    });

    // ================================================================================================================================
    // ================================================================================================================================
    graph.history.on('undo', (args) => {
      console.log('当命令被撤销时触发');
      console.log(args);

      // code here
    });

    graph.history.on('redo', (args) => {
      console.log('当命令被重做时触发。');
      console.log(args);

      // code here
    });

    // graph.history.on('redo', (args) => {
    //   console.log('当命令被撤销时触发');
    //   console.log(args);

    //   // code here
    // })

    graph.history.on('cancel', (args) => {
      // code here
      console.log('当命令被取消时触发');
      console.log(args);
    });

    graph.history.on('add', (args) => {
      console.log('当命令被添加到队列时触发');
      console.log(args);

      // code here
    });

    graph.history.on('clean', (args) => {
      console.log('当历史队列被清空时触发');
      console.log(args);

      // code here
    });

    graph.history.on('change', (args) => {
      console.log('当历史队列改变时触发');
      console.log(args);

      // code here
    });

    // 移动中 持续触发的函数
    graph.history.on('batch', (args) => {
      console.log('当接收到 batch 命令时触发');
      console.log(args);

      // code here
    });

    setGraphIncetance(graph);

    // graph.fromJSON(data);

    // console.log(graph.isPannable());

    // 缩放
    // graph.zoom(1)

    // 平移
    // graph.translate(80, 40)

    // 创建默认选项值
    Shape.Rect.config({
      width: 300,
      height: 400,
      attrs: {
        body: {
          fill: '#987',
          stroke: '#000',
          strokeWidth: 2,
          rx: 10, // 圆角
        },
        label: {
          fontSize: 15,
          fill: '#333',
        },
      },
      // 通过钩子将 label 应用到 'attrs/text/text' 属性上
      propHooks: {
        rx(metadata) {
          const { rx, ...others } = metadata;
          if (rx != null) {
            ObjectExt.setByPath(others, 'attrs/body/rx', rx);
          }
          return others;
        },
        ry(metadata) {
          const { ry, ...others } = metadata;
          if (ry != null) {
            ObjectExt.setByPath(others, 'attrs/body/ry', ry);
          }
          return others;
        },
      },
    });
    // const rect2 = graph.addNode({
    //   x: 100,
    //   y: 100,
    //   rx: 5,
    //   ry: 10,
    //   label: 'rect',
    // });

    const rect1 = new Shape.Rect({
      id: 'rect1',
      x: 1000,
      y: 100,
      label: 'rect',

      // 指定渲染元素的标签
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
    });

    // 创建矩形节点
    const rect = new Shape.Rect({
      id: 'node1',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      label: 'rect',
      zIndex: 2,

      // 指定渲染元素的标签
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      data: {
        name: '杨志文',
        age: 20,
      },
    });
    // console.log(rect);

    const circle = new Shape.Circle({
      id: 'node2',
      x: 280,
      y: 200,
      width: 60,
      height: 60,
      label: 'circle',
      zIndex: 2,
    });

    // console.log(circle);

    const edge = new Shape.Edge({
      id: 'edge1',
      source: rect,
      target: circle,

      // 线条样式
      attrs: {
        line: {
          sourceMarker: {
            tagName: 'path',
            d: 'M 20 -10 0 0 20 10 Z',
          },
          targetMarker: {
            tagName: 'path',
            fill: 'yellow', // 使用自定义填充色
            stroke: 'green', // 使用自定义边框色
            strokeWidth: 2,
            d: 'M 20 -10 0 0 20 10 Z',
          },
        },
        // line: {
        //   sourceMarker: {
        //     name: 'circle', // 椭圆
        //     rx: 5, // 椭圆箭头的 x 半径
        //     ry: 5, // 椭圆箭头的 y 半径
        //   },
        //   targetMarker: {
        //     name: 'ellipse', // 椭圆
        //     rx: 10, // 椭圆箭头的 x 半径
        //     ry: 6, // 椭圆箭头的 y 半径
        //   },
        //   stroke: 'green',
        // },
      },

      // 按顺序经过路径点
      // vertices: [
      //   { x: 100, y: 200 },
      //   { x: 300, y: 120 },
      // ],

      // 路由 router 将对 vertices 进一步处理，
      router: {
        name: 'orth',
        args: {},
      },

      // 链接器 connector 将路由 router 返回的点加工成渲染边需要
      connector: {
        name: 'smooth',
        args: {},
      },
      zIndex: 1,
      // visible: false,
    });

    const edge2 = new Shape.Edge({
      id: 'edge2',
      source: circle,
      target: rect1,
      zIndex: 1,
      // visible: false,
    });

    // graph.addEdge({
    //   source: rect2, // 源节点 ID
    //   target: { x: 1200, y: 120 }, // 目标点
    // });
    // graph.addNode(rect);
    // graph.addNode(rect1);
    // graph.addNode(rect2);
    // graph.addNode(circle);
    // graph.addEdge(edge);
    // graph.addEdge(edge2);

    // =====================================================================================================================
    // =====================================================================================================================

    // 群组

    const parent = graph.addNode({
      id: '3',
      x: 380,
      y: 40,
      width: 320,
      height: 240,
      zIndex: 1,
      label: 'Parent\n(try to move me)',
      data: {
        parent: true,
      },
    });

    const child = graph.addNode({
      id: '1',
      x: 120,
      y: 80,
      width: 120,
      height: 60,
      zIndex: 10,
      label: 'Child\n(embedded)',
      attrs: {
        body: {
          fill: 'green',
        },
        label: {
          fill: '#fff',
          fontSize: 13,
        },
      },
    });

    const child2 = graph.addNode({
      id: '2',

      x: 140,
      y: 200,
      width: 200,
      height: 60,
      zIndex: 10,
      label: 'child22222\n(embedded)',
      attrs: {
        body: {
          fill: 'yellow',
        },
        label: {
          fill: '#fff',
          fontSize: 13,
        },
      },
    });
    // console.log(child);

    // console.log(parent);

    // parent.addChild(child)
    // parent.addChild(child2)
    // graph.addEdge({
    //   source:child,
    //   target:child2,
    //   vertices: [
    //     { x: 120, y: 60 },
    //     { x: 200, y: 100 },
    //   ],
    // })

    // ============================================================================================================================
    // ============================================================================================================================
    // 链接桩
    graph.addNode({
      x: 60,
      y: 60,
      width: 160,
      height: 80,
      label: 'Rect With Ports',
      ports: [
        {
          id: 'port1',
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
        {
          id: 'port2',
          attrs: {
            circle: {
              r: 6,
              // magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff',
            },
          },
        },
        {
          id: 'port3',
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
      ],
    });

    // 链接桩 群组写法
    graph.addNode({
      x: 60,
      y: 60,
      width: 160,
      height: 80,
      label: 'Rect With Ports',
      ports: {
        groups: {
          group1: {
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
            group: 'group1', // 指定分组名称
          },
          {
            id: 'port2',
            group: 'group1', // 指定分组名称
          },
          {
            id: 'port3',
            group: 'group1', // 指定分组名称
          },
        ],
      },
    });

    // label
    graph.addNode({
      x: 60,
      y: 60,
      width: 160,
      height: 80,
      label: 'Rect With Ports',
      ports: {
        groups: {
          group1: {
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
        },
        items: [
          {
            id: 'port1',
            group: 'group1',
            attrs: {
              text: {
                // 标签选择器
                text: 'port1', // 标签文本
              },
            },
          },
          {
            id: 'port2',
            group: 'group1',
            attrs: {
              text: {
                // 标签选择器
                text: 'port2', // 标签文本
              },
            },
          },
          {
            id: 'port3',
            group: 'group1',
            attrs: {
              text: {
                // 标签选择器
                text: 'port2', // 标签文本
              },
            },
          },
        ],
      },
    });

    graph.addNode({
      x: 60,
      y: 60,
      width: 180,
      height: 60,
      label: 'In Ports & Out Ports',
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

    console.log('是否开启剪切', graph.isClipboardEnabled());
    console.log('是否开启撤销重做', graph.isHistoryEnabled());
  }, []);

  return (
    <div>
      <div style={{ height: 100, backgroundColor: '#973' }}>
        <h1>操作区</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={copyNode}>复制</Button>
          <Button onClick={pasteNode}>粘贴</Button>
          <Button onClick={cutNode}>剪切</Button>
          <Button onClick={getCutNode}>获取剪切板中的节点/边。</Button>
          <Button onClick={preHandle}>撤销</Button>
          <Button onClick={reSetHandle}>重做</Button>
          <Button onClick={outJSON}>序列化</Button>
        </div>
      </div>
      {/* <div id="mini" style={{ height: 200 }}></div> */}
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: 200,
            height: 800,
            backgroundColor: 'aliceblue',
            paddingTop: 50,
          }}
        >
          <div
            data-type="rect"
            style={{
              height: '40px',
              border: '2px solid #31d0c6',
              textAlign: 'center',
              lineHeight: '40px',
              // margin: 16,
              cursor: 'move',
            }}
            onMouseDown={startDrag}
          >
            Rect123
          </div>

          <div
            data-type="circle"
            className="dnd-circle"
            style={{
              width: '80px',
              height: '80px',
              border: '2px solid #31d0c6',
              textAlign: 'center',
              lineHeight: '40px',
              // margin: 16,
              cursor: 'move',
            }}
            onMouseDown={startDrag}
          >
            Circle456
          </div>
        </div>
        <div id="container"></div>
      </div>
    </div>
  );
};
export default X6;

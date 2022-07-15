import React, { useState, useEffect } from 'react';

interface Person {
  name: string;
  age: number;
}

interface Props {
  name: string;
  age: number;
  hobby: string[];
  six?: string;
}

interface PersonInfoProps {
  name: string;
  age: number;
  hobby: string[];
  six?: string;
  friend?: PersonInfoProps;
}

interface PersonInfoState {
  address: string;
  tel: number;
}

const Header: React.FC<Props> = (props) => {
  const { name, age, six = '男', hobby = [] } = props;
  const [xiaoming, setXiaoming] = useState<Person>();
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div>
      <h2>{name}</h2>
      <h2>{age}</h2>
      <h2>{six}</h2>
      {hobby.map((item, index) => {
        return <h2 key={index}>{item}</h2>;
      })}
      <h1>{xiaoming?.name}</h1>
      <h1>{isShow ? '也有' : 'wu'}</h1>
    </div>
  );
};

class PersonInfo extends React.Component<PersonInfoProps, PersonInfoState> {
  constructor(props: PersonInfoProps) {
    super(props);
    this.state = {
      address: 'qwertyuio',
      tel: 1234,
    };
  }
  render() {
    const { name, six, hobby, age } = this.props;
    const { address, tel } = this.state;

    return (
      <div>
        <h1>PersonInfo组件</h1>
        <h1>{name}</h1>
        <h1>{six}</h1>
        <h1>{hobby}</h1>
        <h1>{age}</h1>
        <h1>{address}</h1>
        <h1>{tel}</h1>
      </div>
    );
  }
}

const Login = () => {
  return (
    <div>
      <h2>登录页</h2>
      <Header name="老王" age={58} six="猛男" hobby={['苹果', '香蕉']}></Header>
      <PersonInfo
        name="qwer"
        age={100}
        hobby={['qwe', 'ooo']}
        friend={{ name: '刘华强', age: 40, hobby: ['枪'] }}
      ></PersonInfo>
    </div>
  );
};
export default Login;

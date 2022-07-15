import React from 'react';
import { Button } from 'antd';

type ButtonType = 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
type ButtonSize = 'large' | 'middle' | 'small';

interface Props {
  children: string;
  type?: ButtonType;
  size?: ButtonSize;
}

const CustomButton: React.FC<Props> = (props) => {
  const { children, type = 'primary', size = 'middle' } = props;

  return (
    <Button size={size} type={type}>
      {children}
    </Button>
  );
};

export default CustomButton;

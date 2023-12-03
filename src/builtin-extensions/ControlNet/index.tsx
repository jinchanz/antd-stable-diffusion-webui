import { Tabs } from "antd"

import ControlNetUnitPane from "./ControlNetUnit"
import { ControlNetUnit } from "@/builtin-extensions/ControlNet/types";

export { config } from './config';

export interface ControlNetPaneProps {
  size: number;
  data: unknown[],
  onChange: (index: number, data: ControlNetUnit) => void;
}

export function TabTitle({ title, enable }) {

  return <div style={ enable ? { fontWeight: 'bolder', color: '#ff00cc' } : {}}>
    {title}
  </div>;
}

function getCurrentControlType(cn) {
  return cn?.controlType && cn?.controlType !== 'All' ? `[${cn?.controlType}]` : '';
}

function generateControlNetUnitList(data, size, onChange) {
  return data?.map((item, index) => {
    const itemObj = typeof item === 'string' ? JSON.parse(item) : item;

    return {
      key: `cn${index}`,
      label: <TabTitle title={`ControlNet Unit ${index} ${getCurrentControlType(itemObj)}`} enable={itemObj?.enabled} />,
      children: <ControlNetUnitPane index={0} data={itemObj} onChange={onChange} />
    }
  });
}

export function ControlNetPane(props: ControlNetPaneProps) {

  const { size, onChange, data } = props;
  const cnList = generateControlNetUnitList(data, size, onChange);

  return <div>
    <Tabs 
      type="card"
      items={cnList}  
    />
  </div>
}
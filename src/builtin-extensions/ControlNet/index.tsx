import { Tabs } from "antd"

import ControlNetUnitPane from "./ControlNetUnit"
import { ControlNetUnit } from "@/builtin-extensions/ControlNet/types";
import { FC } from "react";
import { ExtensionOption } from "@/types/config/extension";
import { Tab } from "@/configs/ui";

export interface ControlNetPaneProps {
  options: Record<string, ExtensionOption>
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
  const cnList: Tab[] = [];
  if (!data?.length) {
    data = [];
  }
  
  for (let i = 0; i < size; i++) {
    const itemObj = data?.[i] || {};
    data[i] = itemObj;
    cnList[i] = {
      key: `cn${i}`,
      label: <TabTitle title={`ControlNet Unit ${i} ${getCurrentControlType(itemObj)}`} enable={itemObj?.enabled} />,
      children: <ControlNetUnitPane index={i} data={itemObj} onChange={(index, value) => {
        data[index] = value;
        onChange(data);
      }} />
    }
  }
  return cnList;
}

export const ControlNetPane: FC = (props: ControlNetPaneProps) => {

  const { options, onChange, data } = props;
  const { control_net_unit_count } = options;
  const { value: size } = control_net_unit_count;
  const cnList = generateControlNetUnitList(data, size, onChange);

  return <div>
    <Tabs 
      type="card"
      items={cnList}  
    />
  </div>
}
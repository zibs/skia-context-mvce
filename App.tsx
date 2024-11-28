import React, { PropsWithChildren, useState } from "react";
import { Canvas,  Circle, Group, Text } from "@shopify/react-native-skia";
import { Button } from "react-native";

const MyContext = React.createContext<number>(0);

type ContextProviderProps = PropsWithChildren & {
  value: number;
};
const ContextProvider = (props: ContextProviderProps) => {
  return <MyContext.Provider value={props.value}>
    {props.children}
  </MyContext.Provider>
}

const useContextProvider = () => {
  return React.useContext(MyContext);
}

const Inner = () => {
  const value = useContextProvider()
  const width = value;
  const height = value;
  const r = width * 0.33;

  return (
    <Canvas style={{ width, height }}>
      <ContextProvider value={value}>
        <Group blendMode="multiply">
          <Circle cx={r} cy={r} r={r} color="cyan" />
          <Circle cx={value - r} cy={r} r={r} color="green" />
          <Circle cx={value / 2} cy={value - r} r={r} color="yellow" />
        </Group>
      </ContextProvider>
    </Canvas>
  );
}
const App = () => {
  const [value, setValue] = useState(256)
  return (
    <ContextProvider value={value}>
      <Inner />
      <Button title="Change Value" onPress={() => setValue(value + 10)} />
    </ContextProvider>
  );
};
export default App;
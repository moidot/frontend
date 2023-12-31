import { createContext, useContext, useReducer } from 'react';

interface FunnelContextProps {
  children: React.ReactNode[];
  current: React.ReactNode;
  data: object | null;
  setChildren: (value: React.ReactNode[]) => void;
  setCurrent: (value: React.ReactNode) => void;
  setData: (value: object) => void;
  setDefault: () => void;
}

const initialFunnelContext: FunnelContextProps = {
  children: [],
  current: null,
  data: null,
  setChildren: () => {},
  setCurrent: () => {},
  setData: () => {},
  setDefault: () => {},
};

const FunnelContext = createContext(initialFunnelContext);

FunnelContext.displayName = 'FunnelContext';

export const useFunnelContext = () => {
  const context = useContext(FunnelContext);

  if (!context) {
    throw new Error('FunnelContext must be used in <FunnelContetProvider />');
  }

  return context;
};

type PickFromFunnelContextProps<T extends keyof FunnelContextProps> = Pick<FunnelContextProps, T>[T];

type FunnelActionType =
  | {
      type: 'SETCHILDREN';
      value: PickFromFunnelContextProps<'children'>;
    }
  | {
      type: 'SETCURRENT';
      value: PickFromFunnelContextProps<'current'>;
    }
  | {
      type: 'SETDATA';
      value: PickFromFunnelContextProps<'data'>;
    }
  | {
      type: 'RESETALL';
    };

const reducer = (state: FunnelContextProps, action: FunnelActionType): FunnelContextProps => {
  switch (action.type) {
    case 'SETCHILDREN':
      return {
        ...state,
        children: action.value,
      };
    case 'SETCURRENT':
      return {
        ...state,
        current: action.value,
      };
    case 'SETDATA':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.value,
        },
      };

    case 'RESETALL':
      return initialFunnelContext;
    default:
      return state;
  }
};

export const FunnelContetProvider = ({
  children,
}: {
  children: PickFromFunnelContextProps<'children'>;
  value?: unknown;
}) => {
  const [state, dispatch] = useReducer(reducer, initialFunnelContext);

  return (
    <FunnelContext.Provider
      value={{
        ...state,
        setChildren: (value: PickFromFunnelContextProps<'children'>) => dispatch({ type: 'SETCHILDREN', value }),
        setCurrent: (value: PickFromFunnelContextProps<'current'>) => dispatch({ type: 'SETCURRENT', value }),
        setData: (value: PickFromFunnelContextProps<'data'>) => dispatch({ type: 'SETDATA', value }),
        setDefault: () => dispatch({ type: 'RESETALL' }),
      }}>
      {children}
    </FunnelContext.Provider>
  );
};

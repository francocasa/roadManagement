import { createContext, useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

// Crear el contexto
const CounterContext = createContext();

// Crear un Provider que envuelva a los componentes
export const CounterProvider = ({ children }) => {
  // Cargar el carrito desde el localStorage
  useEffect(() => {}, []);

  const store = useMemo(() => ({}), []);

  return (
    <CounterContext.Provider value={store}>{children}</CounterContext.Provider>
  );
};

// CustomHook - Consumer
export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter debe ser usado dentro de un CounterProvider");
  }
  return context;
};

// Validación de PropTypes
CounterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Exporta solo el CounterProvider
export default CounterProvider;

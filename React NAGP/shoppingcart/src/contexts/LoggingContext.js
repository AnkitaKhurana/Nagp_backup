import React from 'react'

const LoggingContext = React.createContext(false);

export const LoggingProvider = LoggingContext.Provider;
export const LoggingConsumer = LoggingContext.Consumer;

export default LoggingContext;
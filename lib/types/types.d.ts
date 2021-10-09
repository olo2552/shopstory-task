export declare type ResponsiveBreakpoint<T> = (T | null);
export declare type ResponsiveOutput<T> = ResponsiveBreakpoint<T>[] | ResponsiveBreakpoint<T>;
export declare type ResponsiveBreakpoints<T> = NonNullable<ResponsiveOutput<T>>;

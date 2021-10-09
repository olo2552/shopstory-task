export type ResponsiveBreakpoint<T> = (T | null);
export type ResponsiveOutput<T> = ResponsiveBreakpoint<T>[] | ResponsiveBreakpoint<T>;
export type ResponsiveBreakpoints<T> = NonNullable<ResponsiveOutput<T>>

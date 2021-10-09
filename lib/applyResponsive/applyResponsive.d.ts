import { ResponsiveBreakpoints, ResponsiveOutput } from "../types/types";
export declare const applyResponsive: <T extends (...args: any[]) => any>(appliedFunction: T) => (...responsiveBreakpoints: ResponsiveBreakpoints<Parameters<T>>[]) => ResponsiveOutput<ReturnType<T>>;

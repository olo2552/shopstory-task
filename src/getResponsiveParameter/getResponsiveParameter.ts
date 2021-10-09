import {isNil} from "../utils/isNil";
import {ResponsiveBreakpoint, ResponsiveBreakpoints} from "../types/types";

const getFirstScalarToTheRight = <T>(breakpoints: ResponsiveBreakpoints<T>, index: number): ResponsiveBreakpoint<T> => {
    if (!Array.isArray(breakpoints)) {
        return breakpoints;
    }

    for(let i = index; i<breakpoints.length; i++) {
        if (!isNil(breakpoints[i])) {
            return breakpoints[i];
        }
    }

    return null;
}

const getFirstScalarToTheLeft = <T>(breakpoints: ResponsiveBreakpoints<T>, index: number): ResponsiveBreakpoint<T> => {
    if (!Array.isArray(breakpoints)) {
        return breakpoints;
    }

    for(let i = index; i>=0; i--) {
        if (!isNil(breakpoints[i])) {
            return breakpoints[i];
        }
    }

    return null;
}

export const getResponsiveParameter = <T>(breakpoints: ResponsiveBreakpoints<T>, index: number): ResponsiveBreakpoint<T> => {
    if (!Array.isArray(breakpoints)) {
        return breakpoints;
    }

    if (!isNil(breakpoints[index])) {
        return breakpoints[index];
    }

    const firstScalarToTheRight = getFirstScalarToTheRight(breakpoints, index);
    return !isNil(firstScalarToTheRight)
      ? firstScalarToTheRight
      : getFirstScalarToTheLeft(breakpoints, index);
}

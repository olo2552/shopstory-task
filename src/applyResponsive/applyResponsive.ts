import {range} from "../utils/range";
import {normalizeResponsiveOutput} from "../normalizeResponsiveOutput/normalizeResponsiveOutput";
import {getResponsiveParameter} from "../getResponsiveParameter/getResponsiveParameter";
import {ResponsiveBreakpoints, ResponsiveOutput} from "../types/types";
import {isNil} from "../utils/isNil";

const getScalarsForColumn = <T>(responsiveBreakpointsForAllParameters:ResponsiveBreakpoints<T>[], columnIndex: number): unknown[] => {
  return responsiveBreakpointsForAllParameters.map((row) => getResponsiveParameter(row, columnIndex));
}

export const applyResponsive = <T extends (...args: any[]) => any>(appliedFunction: T) =>
  (...responsiveBreakpoints: ResponsiveBreakpoints<Parameters<T>>[]): ResponsiveOutput<ReturnType<T>> => {
    const longestRowLength = responsiveBreakpoints.map(responsiveBreakpoint => {
      return responsiveBreakpoint?.length || 1;
    })
      .reduce<number>((longestRowLength, currentRow) => {
        return currentRow > longestRowLength
          ? currentRow
          : longestRowLength
      }, 1);

    const denormalizedOutput = range(longestRowLength).map<ReturnType<T>>((index) => {
      if (isNil(responsiveBreakpoints)) {
        return null;
      }
      const parametersToApply = getScalarsForColumn(responsiveBreakpoints, index);
      return appliedFunction(...parametersToApply);
    });

    return normalizeResponsiveOutput(denormalizedOutput);
  };

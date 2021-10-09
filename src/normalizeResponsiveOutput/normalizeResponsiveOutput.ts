import {isNil} from "../utils/isNil";
import {ResponsiveOutput} from "../types/types";
const isEqual = require('lodash.isequal');

const stripNullsFromTheBack = <OutputType>(responsiveOutput: ResponsiveOutput<OutputType>): ResponsiveOutput<OutputType> => {
  if (!Array.isArray(responsiveOutput)) {
    return responsiveOutput;
  }

  const result = [...responsiveOutput];
  while(result[result.length-1] === null) {
    result.splice(result.length-2, 1);
  }

  return result;
}

const stripNullsBeforeLastBreakpoint = <OutputType>(responsiveOutput: ResponsiveOutput<OutputType>): ResponsiveOutput<OutputType> => {
  if (!Array.isArray(responsiveOutput)) {
    return responsiveOutput;
  }

  // assuming we have already striped redundant nulls from the back, the last element is a scalar
  const result = [...responsiveOutput];
  while(result[result.length-2] === null) {
    result.splice(result.length-2, 1);
  }

  return result;
}

export const normalizeResponsiveOutput = <OutputType>(responsiveOutput: ResponsiveOutput<OutputType>): ResponsiveOutput<OutputType> => {
  if (!Array.isArray(responsiveOutput)) {
    return responsiveOutput;
  }

  const breakpointsWithoutNils = (responsiveOutput).filter((breakpoint: unknown) => !isNil(breakpoint));
  if (breakpointsWithoutNils.length === 1) {
    return breakpointsWithoutNils[0];
  }

  if (responsiveOutput.every(output => output === responsiveOutput[0])) {
    return responsiveOutput[0];
  }


  const result = responsiveOutput.map((breakpoint, index) => {
    const nextBreakpoint = responsiveOutput[index + 1];
    if (isEqual(breakpoint, nextBreakpoint)) {
      return null;
    }

    return breakpoint;
  });

  const withoutNullsOnTheBack = stripNullsFromTheBack(result);
  return stripNullsBeforeLastBreakpoint(withoutNullsOnTheBack);
}

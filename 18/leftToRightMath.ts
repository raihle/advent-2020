const SUBEXPRESSION_REGEX = /\((?<expression>[^\(\)]+)\)/;
const OPERATOR_REGEX = /\b\d+ [+*] \d+\b/;
const PLUS_REGEX = /\b\d+ \+ \d+\b/;

export const evaluateExpression = function (
  line,
  plusBeforeMultiplication = false
) {
  let remainingLine = line;
  let subExpressionMatch;
  while ((subExpressionMatch = SUBEXPRESSION_REGEX.exec(remainingLine))) {
    const subExpression = subExpressionMatch.groups.expression;
    remainingLine = remainingLine.replace(
      subExpressionMatch[0],
      evaluateExpression(subExpression, plusBeforeMultiplication)
    );
  }

  if (plusBeforeMultiplication) {
    while ((subExpressionMatch = PLUS_REGEX.exec(remainingLine))) {
      const subExpression = subExpressionMatch[0];
      remainingLine = remainingLine.replace(subExpression, eval(subExpression));
    }
  }

  while ((subExpressionMatch = OPERATOR_REGEX.exec(remainingLine))) {
    const subExpression = subExpressionMatch[0];
    remainingLine = remainingLine.replace(subExpression, eval(subExpression));
  }

  return parseInt(remainingLine);
};

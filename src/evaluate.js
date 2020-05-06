const { environment } = require('./standard-library');
const last = (collection) => collection[collection.length - 1];

const getIdentifier = (name) => {
  const val = environment[name];
  if (val) return val;
  else throw new ReferenceError(`Did you forgot to define "${name}"?`);
};

const evaluate = (node) => {
  if (node.type === 'VariableDeclaration') return define(node);
  else if (node.value) return node.value;
  else if (node.type === 'CallExpression') return apply(node);
  else if (node.type === 'Identifier') return getIdentifier(node.name);
};

const define = (node) => {
  environment[node.identifier.name] = node.assignment.value;
};

const apply = (node) => {
  const fn = environment[node.name];
  const args = node.arguments.map(evaluate);
  if (typeof fn !== 'function')
    throw new TypeError(`Not a keyword we allow ${fn}`);
  return fn(...args);
};

module.exports = { evaluate };
